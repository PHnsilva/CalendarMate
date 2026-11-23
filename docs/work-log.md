# Registro de validação

## 22/11/2026 — Linha de base e organização

- Base: `90d0fa9584c2454870d02da2ad179d49986edf9c`, origin/master. Cópia local inicial vazia, sem alterações de terceiros.
- Conta GitHub conferida: PHnsilva. PR #2 de READMEs preservado. Referências de organização consultadas na Base de Projetos.
- Render: workspace confirmado pelo proprietário; serviço CalendarMate, Starter, autodeploy/previews desligados, deploy existente `live` na mesma base. Nenhum deploy executado.
- Consultas públicas: `/api/public/bootstrap` retornou 200 JSON; `/api/servicos/admin` sem sessão retornou 401 JSON. Sem consulta de clientes, envio de OTP ou escrita.
- Frontend: `npm ci --no-audit --no-fund`; `npm test -- --reporter=dot`: 46 arquivos e 148 testes aprovados. Build/lint e backend constam na atualização posterior deste registro.
- Supabase: acesso/plano/cotas não confirmados; nenhuma consulta direta nem manutenção de atividade comprovada. Smoke do banco depende de configuração segura.
- Organização #3 em preparação para revisão. Extração #4 planejada como mudança independente e pequena. Nenhuma issue aceita ou encerrada.
- Frontend: `npm run build` e `npm run lint` aprovados. Nenhuma alteração no lockfile.
- Backend: `gradlew.bat test --console=plain --no-daemon` compilou produção e falhou em `compileTestJava`: `AddressAutocompleteServiceTest` usa `UriComponents.decode()`, inexistente na versão resolvida. Correção isolada em #5; nenhum resultado de testes backend aprovado nesta linha de base.
- Smoke: cinco testes locais aprovados; execução pública retornou PASS/200 no bootstrap, PASS/401 no admin, SKIP/MISSING_CONFIG no Supabase. Nenhuma consulta de disponibilidade (limpa pendências).
