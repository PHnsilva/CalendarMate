import test from 'node:test';
import assert from 'node:assert/strict';
import { runSmoke } from './smoke.mjs';

test('no configuration makes no requests; required Supabase cannot silently pass', async () => {
  const request = () => { throw new Error('Must not make network requests'); };
  assert.deepEqual((await runSmoke({}, request)).map(r => r.result), ['SKIP', 'SKIP']);
  assert.equal((await runSmoke({}, request, true))[1].result, 'FAIL');
});

test('API probes avoid booking, OTP and availability operations', async () => {
  const calls = [];
  const results = await runSmoke({ CM_API_BASE_URL: 'https://api.example.test' }, async (url, options) => {
    calls.push([new URL(url).pathname, options.method ?? 'GET']);
    assert.equal(options.redirect, 'error');
    return url.endsWith('bootstrap')
      ? Response.json({ timezone: 'America/Sao_Paulo', booking: { slotMinutes: 60 } })
      : new Response(null, { status: 401 });
  });
  assert.deepEqual(calls, [['/api/public/bootstrap', 'GET'], ['/api/servicos/admin', 'GET']]);
  assert.deepEqual(results.slice(0, 2).map(r => r.result), ['PASS', 'PASS']);
});

test('Supabase uses bounded HEAD and keeps secret keys out of Bearer and results', async () => {
  const key = 'sb_secret_example';
  const results = await runSmoke({ CM_SUPABASE_URL: 'https://db.example.test', CM_SUPABASE_KEY: key,
    CM_SUPABASE_PROBE_TABLE: 'health_probe' }, async (url, options) => {
    assert.equal(options.method, 'HEAD');
    assert.equal(new URL(url).searchParams.get('limit'), '1');
    assert.equal(options.headers.apikey, key);
    assert.equal(options.headers.Authorization, undefined);
    assert.equal(options.redirect, 'error');
    return new Response(null, { status: 200 });
  }, true);
  assert.equal(results[1].result, 'PASS');
  assert.equal(JSON.stringify(results).includes(key), false);
});

test('legacy JWT uses Bearer, network failure is redacted, HTTP denial is a failure', async () => {
  const env = { CM_SUPABASE_URL: 'https://db.example.test', CM_SUPABASE_KEY: 'eyJ.private',
    CM_SUPABASE_PROBE_TABLE: 'health_probe' };
  const results = await runSmoke(env, async (_, options) => {
    assert.equal(options.headers.Authorization, 'Bearer eyJ.private');
    throw new Error('secret eyJ.private');
  });
  assert.equal(results[1].reason, 'NETWORK_OR_RESPONSE');
  assert.equal(JSON.stringify(results).includes('eyJ.private'), false);
  assert.equal((await runSmoke(env, async () => new Response(null, { status: 403 })))[1].result, 'FAIL');
});

test('malformed destination or table is rejected before credentials are sent', async () => {
  const request = () => { throw new Error('Must not send credentials'); };
  const results = await runSmoke({ CM_SUPABASE_URL: 'https://user:password@db.example.test',
    CM_SUPABASE_KEY: 'secret', CM_SUPABASE_PROBE_TABLE: 'health_probe' }, request);
  assert.equal(results[1].reason, 'INVALID_CONFIG');
  const badTable = await runSmoke({ CM_SUPABASE_URL: 'https://db.example.test', CM_SUPABASE_KEY: 'secret',
    CM_SUPABASE_PROBE_TABLE: '../admin' }, request);
  assert.equal(badTable[1].reason, 'INVALID_CONFIG');
});
