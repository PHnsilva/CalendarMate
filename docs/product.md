# Escopo e comportamento preservado

Base: código `90d0fa9`, inspecionado em 22/11/2026. A presença de uma implementação não confirma que a integração está habilitada em produção.

## Atores e fronteira

Cliente solicita, confirma, consulta e cancela serviços. Prestador administra os agendamentos atribuídos. OWNER administra prestadores, agenda, disponibilidade, histórico e consultas financeiras. Provedores externos entregam mensagens, calendário, persistência, endereços e rotas; não são donos das regras do serviço.

O núcleo inclui catálogo/cidades atendidas, duração, antecedência, ocupação e bloqueios, escala, atribuição, regras de cancelamento e autorização por workspace. A etapa atual organiza e reduz acoplamento sem alterar esses comportamentos. Novos recursos, canais de pagamento, autenticação universal ou bancos separados ficam fora desta entrega.

## Rastreabilidade

| Caso de uso | Requisito | Critério de aceite preservado | Evidência automatizada existente |
| --- | --- | --- | --- |
| UC01 Consultar configuração e horários | RF01 Preservar regras locais e duração | Mesma janela, cidade, intervalos e conflitos; erros de data permanecem compatíveis | `GetAvailableSlotsUseCaseTest`, `AvailabilityBlockServiceTest` |
| UC02 Solicitar e confirmar serviço | RF02 Validar solicitação e OTP | Código correto confirma; código inválido, expirado e reenvio respeitam a política; modo dummy continua local | `ServicoServiceTest`, `VerificationServiceTest`, `VerificationUseCasesTest` |
| UC03 Consultar e cancelar por telefone | RF03 Preservar privacidade e pertencimento | DTO público limitado; cancelamento idempotente, aviso mínimo e limite de tentativas | `PublicBookingFlowTest`, `PublicBookingRateLimiterTest` |
| UC04 Recuperar acesso | RF04 Preservar confirmação de recuperação | Recuperação não contorna OTP nem expõe sessão administrativa | `RecoveryServiceTest` |
| UC05 Entrar como OWNER/prestador | RF05 Preservar autorização | Prestador só acessa agenda atribuída; histórico/financeiro/operações globais continuam restritos | `AdminAuthServiceTest`, `AdminControllerAuthorizationTest` |
| UC06 Administrar agenda/bloqueios | RF06 Manter consistência de ocupação e atribuição | Bloqueios e cancelamentos continuam compatíveis; persistência não depende de um novo serviço | `AvailabilityBlockServiceTest`, testes de agenda/admin no frontend |
| UC07 Consultar endereço e rota | RF07 Preservar prioridade e fallback | Geoapify tem prioridade quando configurado; coordenadas válidas evitam geocodificação; legado usa endereço | `RoutesServiceTest`, `AddressAutocompleteServiceTest`, `AddressAutocompleteControllerTest` |
| UC08 Consultar financeiro | RF08 Preservar leitura e flags | Integração desligada mantém restrição/fallback atual; não introduzir transferências | `BankingConfigTest`, testes de importação OFX no frontend |

Os testes Java estão em `backend/src/test/java/br/com/calendarmate`; os testes React em `frontend/src/**/*.test.*`. Os casos acima descrevem contratos de regressão, sem afirmar cobertura completa de concorrência ou de provedores reais.

## Qualidade e restrições

| ID | Requisito | Aceite da evolução |
| --- | --- | --- |
| RNF01 Compatibilidade | Preservar endpoints, DTOs, flags e deploy atual | Cada PR declara contratos afetados e reversão; nenhuma migração destrutiva |
| RNF02 Segurança | Preservar papéis, sessões e isolamento dos dados | Testes de autorização antes de mover fronteiras; logs sem dados pessoais |
| RNF03 Custo | Nenhuma cobrança adicional | Sem novos serviços; testes locais/dummy por padrão e cotas oficiais verificadas |
| RNF04 Operação | Detectar indisponibilidade sem efeitos de negócio | Verificação limitada, timeout, resultado por dependência; Supabase não inferido pelo bootstrap |
| RNF05 Manutenção | Um resultado verificável por issue/PR | Domínio independente de SDKs para novos recortes reutilizáveis; sem limpeza em massa |
| RNF06 Evidência | Separar implementação, revisão e aceite | SHA, comando e resultado registrados; aceitação e publicação dependem de Pedro |
