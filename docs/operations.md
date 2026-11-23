# Verificação e operação

## Ambientes e estado conhecido

Inspeção de 22/11/2026: Render `CalendarMate`, raiz `backend`, branch `master`, plano **Starter** já existente, deploy automático desligado e previews desligados. Deploy `dep-dalkdbqd0e5s73fn3mjg` consta `live` no SHA `90d0fa9`. Isso não prova saúde de todas as dependências. Bootstrap respondeu 200 e agenda administrativa sem sessão respondeu 401. Nenhuma configuração de produção foi alterada.

Frontend é implantado na Vercel. O histórico GitHub registra produção no mesmo SHA, mas o alias/domínio atual e as flags do bundle não foram confirmados. Testes locais não comprovam cadastro/OTP/cancelamento em produção. Não se deve usar dados reais ou disparar mensagens para completar testes automáticos.

## Comandos locais

Node 22.12+ e JDK 17. Instalação: `npm ci` em `frontend`; Gradle usa o wrapper em `backend`. Não é preciso Docker nem credencial real para as suítes unitárias.

```powershell
cd frontend
npm test -- --reporter=dot
npm run build
npm run lint
cd ../backend
.\gradlew.bat test --console=plain
```

Para o recorte de rotas: `.\gradlew.bat test --tests '*RoutesServiceTest' --tests '*GeoCoordinatesTest' --console=plain`. Saídas detalhadas ficam em logs locais ignorados; o registro versionado guarda contagens e falhas relevantes.

## Smoke somente leitura

`node tools/smoke.mjs` não faz rede sem `CM_API_BASE_URL`. Com a URL explicitamente configurada, consulta apenas bootstrap e rejeição de agenda admin sem sessão. Não consulta disponibilidade: `GetAvailableSlotsUseCase.execute` executa limpeza de pendências e, portanto, um GET não é necessariamente livre de efeitos.

Para verificar Supabase, configurar também `CM_SUPABASE_URL`, `CM_SUPABASE_KEY` e `CM_SUPABASE_PROBE_TABLE` em armazenamento seguro/ambiente. A chave deve ter somente a leitura necessária; preferir tabela dedicada sem dados pessoais, já existente e autorizada. O script usa HEAD, `select=*`, `limit=1`, sem gravar registros e sem imprimir corpo, chave ou URL. A criação de tabela/RLS/chave é uma alteração separada. `--require-supabase` faz falta de configuração resultar em falha. Nenhum segredo deve ser colocado na automação, issue ou Git.

Um 200 no bootstrap **não** consulta Supabase. Um HEAD bem-sucedido comprova acesso REST à tabela naquele instante; não comprova todas as stores, RLS de clientes, autenticação ou escrita. Timeout, erro HTTP e configuração ausente devem permanecer resultados distintos. Sem acesso seguro a essa configuração, a verificação de banco fica pendente e não há keepalive efetivo configurado.

## Custos e disponibilidade

| Recurso | Política desta etapa |
| --- | --- |
| Testes locais | Sem chamada real de SMS, banco, mapas ou calendário; nenhuma nova assinatura |
| Supabase | [Free pausa após uma semana de inatividade](https://supabase.com/pricing). Plano real e cotas deste projeto não confirmados. Duas consultas semanais podem gerar atividade, mas não garantem ausência de pausa; observar consumo e resultado |
| Render | Plano Starter existente é pago; nenhuma ampliação ou serviço novo. Verificações pequenas não autorizam consumo adicional faturável |
| Vercel | Plano/cotas não inspecionados; previews das branches desta entrega são desabilitados por identificador em `frontend/vercel.json`, conforme [documentação oficial](https://vercel.com/docs/project-configuration/git-configuration#git.deploymentenabled) |
| GitHub | Repositório público; [runners padrão públicos são gratuitos](https://docs.github.com/en/billing/concepts/product-billing/github-actions). Nenhum novo workflow/cache/artefato hospedado é necessário nesta etapa |
| Ferramentas | [Temurin é gratuito, GPLv2 com Classpath Exception](https://adoptium.net/docs/faq#is-eclipse-temurin-free-to-use); sem custo de licença adicional |

Não há promessa de disponibilidade contínua em um plano gratuito. Rodadas de desenvolvimento usam o plano do Codex existente e consomem sua cota; testes determinísticos e consulta por SHA reduzem o uso, sem garantir mínimo absoluto de tokens. Mudança de plano, publicação de serviço ou limite pago exige decisão específica.

## Revisão e reversão

Cada issue produz branch/PR próprios. Validar o contrato antigo e o novo no mesmo ambiente dummy. Não integrar diretamente na master. A primeira extração não muda esquema, endpoint nem configuração dos provedores; reversão corresponde a reverter o commit da issue. Reversão de código não desfaz efeitos externos ou dados de uma publicação futura. Qualquer rollout posterior deve identificar versão ativa, configuração, backup aplicável e critérios de retorno antes de ser autorizado.
