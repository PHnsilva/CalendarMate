import { pathToFileURL } from 'node:url';

function baseUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash
      || (url.pathname !== '/' && url.pathname !== '')) {
    throw new Error('INVALID_CONFIG');
  }
  return url.origin;
}

// Only explicit destinations are contacted. Results never include response data or credentials.
export async function runSmoke(env = process.env, request = fetch, requireSupabase = false) {
  const results = [];
  async function check(name, url, options, accepted, validate) {
    try {
      const response = await request(url, {
        ...options, redirect: 'error', signal: AbortSignal.timeout(15000),
      });
      const ok = accepted.includes(response.status)
        && (!validate || await validate(response));
      results.push({ check: name, result: ok ? 'PASS' : 'FAIL', status: response.status });
    } catch (error) {
      results.push({ check: name, result: 'FAIL', reason:
        error?.name === 'TimeoutError' || error?.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_OR_RESPONSE' });
    }
  }

  if (env.CM_API_BASE_URL) {
    try {
      const base = baseUrl(env.CM_API_BASE_URL);
      await check('bootstrap', `${base}/api/public/bootstrap`, {}, [200], async response => {
        const body = await response.json();
        return body.timezone === 'America/Sao_Paulo' && body.booking?.slotMinutes > 0;
      });
      await check('admin-without-session', `${base}/api/servicos/admin`, {}, [401, 403]);
    } catch {
      results.push({ check: 'api', result: 'FAIL', reason: 'INVALID_CONFIG' });
    }
  } else {
    results.push({ check: 'api', result: 'SKIP', reason: 'MISSING_CONFIG' });
  }

  const { CM_SUPABASE_URL: sbUrl, CM_SUPABASE_KEY: key, CM_SUPABASE_PROBE_TABLE: table } = env;
  if (sbUrl && key && table) {
    try {
      const base = baseUrl(sbUrl);
      if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(table)) throw new Error('INVALID_CONFIG');
      const headers = { apikey: key, 'Accept-Profile': 'public' };
      if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`;
      await check('supabase-read', `${base}/rest/v1/${table}?select=*&limit=1`,
        { method: 'HEAD', headers }, [200, 206]);
    } catch {
      results.push({ check: 'supabase-read', result: 'FAIL', reason: 'INVALID_CONFIG' });
    }
  } else {
    results.push({ check: 'supabase-read', result: requireSupabase ? 'FAIL' : 'SKIP', reason: 'MISSING_CONFIG' });
  }
  return results;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const results = await runSmoke(process.env, fetch, process.argv.includes('--require-supabase'));
  console.log(JSON.stringify({ checks: results }));
  if (results.some(result => result.result === 'FAIL')) process.exitCode = 1;
}
