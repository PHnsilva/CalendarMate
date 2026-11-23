# Documentação do SG Pequenos Reparos

O produto administra serviços de pequenos reparos. **CalendarMate** continua como nome técnico para preservar Git, URLs e integrações existentes.

| Necessidade | Documento |
| --- | --- |
| Escopo, casos de uso, requisitos e aceite | [Produto](product.md) |
| Fronteiras, reutilização, dados e critérios de extração | [Evolução dos módulos](architecture/service-extraction.md) |
| Decisão vigente de arquitetura | [ADR 0002](architecture/adr/0002-reusable-capabilities.md) |
| Entregas, dependências e Kanban | [Plano de entregas](delivery.md) |
| Testes, disponibilidade, custos e reversão | [Operação](operations.md) |
| Evidências por revisão | [Registro técnico](work-log.md) |
| Execução por componente | [Backend](../backend/README.md), [frontend](../frontend/README.md) |

## Documentos anteriores

O [estado de junho](architecture/current-state.md), o [alvo estrutural](architecture/target-state.md), as [fronteiras](architecture/module-boundaries.md), o [plano de migração](architecture/migration-plan.md), o [design system](architecture/design-system.md) e o [ADR 0001](architecture/adr/0001-incremental-modular-refactor.md) são referências técnicas preservadas. Contagens, caminhos e fases desses documentos não comprovam o estado atual. O inventário de novembro e o ADR 0002 complementam a decisão inicial.

## Referência de organização

A estrutura adapta os critérios do [guia da Base de Projetos](https://github.com/PHnsilva/base-de-projetos/blob/main/docs/iniciar-projeto.md), do [guia de Project](https://github.com/PHnsilva/base-de-projetos/blob/main/docs/github-project.md) e de [backend e serviços](https://github.com/PHnsilva/base-de-projetos/blob/main/arquitetura/backend-servicos.md): problema → requisito → decisão → issue → teste → revisão. Não há cópia de código ou mudança da [licença do sistema](../LICENSE.md).
