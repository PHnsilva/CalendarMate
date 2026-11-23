# ADR 0002 — Núcleo modular com capacidades reutilizáveis

Data: 22/11/2026. Estado: direção de evolução definida; alterações concretas sujeitas a revisão por PR.

## Contexto

O [ADR 0001](0001-incremental-modular-refactor.md) escolheu um monólito modular e descartou microserviços naquele recorte. O sistema em execução reúne integrações que podem servir outros produtos. Separá-las por quantidade de APIs introduziria latência, mais deploys, segredos e falhas sem demonstrar benefício.

## Decisão

Preservar um núcleo modular do SG Pequenos Reparos, mantendo agenda, disponibilidade e autorização de negócio juntas. Preparar rotas, entrega de mensagens e conectores de extrato como capacidades reutilizáveis, primeiro dentro do processo. Extração de serviço independente é condicional aos critérios do [inventário](../service-extraction.md), em decisão posterior.

Esta decisão substitui a exclusão permanente de microserviços do ADR 0001 por uma avaliação caso a caso. Mantém refatoração incremental, compatibilidade, testes de caracterização e extração por caso de uso. Os demais princípios do ADR 0001 continuam aplicáveis.

CalendarMate permanece como identificador técnico. Renomear o repositório não melhora fronteiras e exigiria auditar deploy, URLs, OAuth, documentação e consumidores.

## Alternativas e consequências

Manter todos os detalhes nos serviços atuais reduz trabalho imediato, mas preserva acoplamento. Distribuir todos os módulos agora aumenta custo e risco. A solução incremental admite legado e novos pacotes temporariamente, exige adaptadores explícitos e permite reverter cada pequeno recorte sem migração de dados. Nenhum novo serviço de hospedagem ou alteração em produção integra esta decisão.
