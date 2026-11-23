# Entregas e revisão

[Kanban do SG Pequenos Reparos](https://github.com/users/PHnsilva/projects/15) · [Issues](https://github.com/PHnsilva/CalendarMate/issues) · [PRs](https://github.com/PHnsilva/CalendarMate/pulls)

O fluxo é Backlog → Ready → In progress → In review → Done. Ready exige escopo, aceite e dependências conhecidos. In review exige commit e evidência. Done depende do aceite de Pedro; um teste verde ou PR aberto não conclui a issue. Limite de trabalho: uma pequena entrega de código em andamento.

| Ordem | Entrega | Dependência | Aceite |
| --- | --- | --- | --- |
| 1 | [#3 Organização e arquitetura](https://github.com/PHnsilva/CalendarMate/issues/3) | Estado real e Base de Projetos | Inventário, requisitos, custos e rotina rastreáveis |
| 1a | [#5 Compilação de testes](https://github.com/PHnsilva/CalendarMate/issues/5) | Base atual | Corrigir fixture incompatível antes de validar backend |
| 2 | [#4 Política de coordenadas](https://github.com/PHnsilva/CalendarMate/issues/4) | Contrato atual de rotas; documentação #3 | Domínio puro e regressão de origem/destino |
| 3 | [#6 Monitoramento Supabase somente leitura](https://github.com/PHnsilva/CalendarMate/issues/6) | Acesso correto, plano/cotas, tabela e chave com privilégio mínimo | Consulta limitada comprovada, falha distinta de ausência de configuração |
| 4 | [#7 Porta e modelos de rota independentes](https://github.com/PHnsilva/CalendarMate/issues/7) | #4 e #5 | Sem DTO REST/Calendar na capacidade; mesmos provedores e erros |
| 5 | [#8 Entrega/quota de mensagens](https://github.com/PHnsilva/CalendarMate/issues/8) | Caracterização do estado real e política de quota | Nenhum envio real em testes, duplicação e reinício considerados |
| 6 | [#9 Financeiro e dependências antigas](https://github.com/PHnsilva/CalendarMate/issues/9) | Uso real, contratos e licença | Lista verificável de manter/atualizar/desativar; nenhuma exclusão presumida |

As entregas futuras precisam de issue própria antes da implementação. Não há cronograma de extração completa nem compromisso de criar um serviço por módulo. O PR #2 de revisão dos READMEs permanece independente; conflitos de documentação devem preservar as correções válidas de ambos.

## Rotina econômica

Quartas e domingos, 04h30 de America/Sao_Paulo. A rotina começa pelos fluxos menores e por diferenças desde o SHA registrado, usa verificações determinísticas, testes focados e uma entrega reversível. Falhas novas recebem prioridade sobre modularização. A suíte completa é apropriada na primeira linha de base, em mudanças compartilhadas e antes da revisão final; resultados já válidos não precisam ser repetidos sem motivo. A agenda não substitui monitoramento contínuo nem garante que o host local execute quando estiver desligado.
