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

## 22/11/2026 — Correção da compilação (#5)

- `AddressAutocompleteServiceTest` passou a decodificar somente o parâmetro consultado com `UriUtils.decode(..., UTF_8)`, como já ocorre no teste de rotas. Asserções e código de produção preservados.
- Uma tentativa local encontrou bloqueio de arquivos do OneDrive ao substituir classes de teste. Foi usado init script local com `allprojects { buildDir = 'C:/DevCache/CalendarMate/backend-build' }`; não há mudança de build versionada nem exclusão de arquivos.
- Validação aprovada: JDK Temurin 17, Gradle wrapper 8.5; `gradlew.bat -I C:\DevCache\CalendarMate\build-location.gradle test --console=plain --no-daemon`. A suíte compilou e executou sem falhas; contagens constam no PR da correção. Logs completos permanecem fora do Git.
- Base documental: PR #10, commit `ad2aa46`. PR de correção empilhado sobre essa branch para herdar a proteção contra previews Vercel. Ordem de integração: documentação → correção → política de coordenadas. Sem integração ou deploy executado.

## 22/11/2026 — Política geográfica (#4)

- Base técnica: correção #5, PR #11, commit `c18db34`; documentação #3/PR #10 é dependência transitiva. Alteração na branch `codex/4-coordenadas-rotas`.
- Política existente extraída para `routing/domain/GeoCoordinates`, somente JDK. `RoutesService` preserva mensagens, fluxo de autorização, leitura do evento, fallback por endereço e escolha dos provedores. Nenhum endpoint, DTO ou esquema alterado.
- Testes focados: `gradlew.bat -I C:\DevCache\CalendarMate\build-location.gradle test --tests '*RoutesServiceTest' --tests '*GeoCoordinatesTest' --console=plain --no-daemon` aprovado. Cobrem limites inclusivos, valores ausentes, fora de faixa, NaN/infinito, origem rejeitada antes do provedor, coordenadas salvas e fallback por endereço legado.
- O recorte completo de rotas permanece em #7: ainda há dependência de DTO REST e Google Calendar. Não foi criado serviço/repositório novo.
- Verificação final: `gradlew.bat -I C:\DevCache\CalendarMate\build-location.gradle test bootJar --console=plain --no-daemon` aprovado: 27 classes, 168 testes, zero falhas/erros/ignorados e JAR executável gerado. O frontend não mudou desde seus 148 testes, build e lint aprovados; não houve repetição desnecessária.
- Links relativos dos novos documentos conferidos, sem destinos ausentes; `git diff --check` aprovado com `core.whitespace=cr-at-eol` para os arquivos Windows. `origin/master` permaneceu em `90d0fa9` ao final da validação.
- Rotina local deste chat ativa às quartas e domingos, 04h30 de America/Sao_Paulo; configuração relida após criação. Supabase continua sem prova de atividade, sob #6. Project 15 contém issues #3–#9, PRs e dependências nativas; entregas produzidas permanecem In review, sem aceite automático.
