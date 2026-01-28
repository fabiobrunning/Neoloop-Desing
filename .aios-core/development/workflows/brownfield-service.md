# Brownfield Service Architecture Workflow

**ID:** brownfield-service
**Agent:** @architect (Aria)
**Domain:** Backend Architecture
**Type:** Brownfield (Existing Project)

---

## Overview

Este workflow guia a criação de arquitetura para um serviço backend em um projeto existente (brownfield), considerando:
- Codebase existente
- Decisões arquiteturais anteriores
- Restrições técnicas e de negócio
- Integração com sistemas legados

---

## Prerequisites

- [ ] Projeto existente com código-base
- [ ] Acesso ao repositório e documentação existente
- [ ] Entendimento dos requisitos do novo serviço
- [ ] Contexto de negócio e restrições

---

## Workflow Steps

### Phase 1: Discovery & Context (Descoberta)

**Objetivo:** Entender o projeto existente e requisitos do novo serviço

#### Step 1.1: Analyze Existing Project
```yaml
elicit: true
prompt: |
  Vou analisar a estrutura atual do projeto. Por favor, responda:

  1. Qual é o nome/propósito do serviço que deseja criar?
  2. Qual é o objetivo principal deste serviço?
  3. Quais são os principais casos de uso?
  4. Existem integrações com outros sistemas? Quais?

  (Aguardando suas respostas...)
```

#### Step 1.2: Scan Codebase Structure
```yaml
actions:
  - Analisar estrutura de diretórios existente
  - Identificar stack tecnológica atual
  - Mapear dependências e bibliotecas
  - Identificar padrões arquiteturais existentes
tools:
  - Glob (varrer estrutura de pastas)
  - Read (ler package.json, configs, README)
  - Grep (buscar padrões de código)
```

#### Step 1.3: Identify Constraints
```yaml
elicit: true
prompt: |
  Com base na análise, identifiquei:
  - Stack tecnológica: [lista]
  - Padrões arquiteturais: [lista]

  Por favor, confirme ou adicione restrições:

  1. Há restrições de tecnologia? (deve usar X, não pode usar Y)
  2. Há restrições de infraestrutura? (deploy, database, cloud)
  3. Há restrições de performance? (latência, throughput)
  4. Há restrições de segurança? (compliance, autenticação)
  5. Há restrições de custo/orçamento?

  (Aguardando confirmação...)
```

---

### Phase 2: Architecture Design (Projeto)

**Objetivo:** Projetar a arquitetura do serviço considerando o contexto brownfield

#### Step 2.1: Service Boundaries & Responsibilities
```yaml
elicit: true
prompt: |
  Vou definir os limites e responsabilidades do serviço:

  1. **Domínio:** Qual é o domínio de negócio deste serviço?
  2. **Responsabilidades:** O que este serviço FAZ?
  3. **Responsabilidades:** O que este serviço NÃO FAZ (delega)?
  4. **Dependências:** De quais outros serviços/APIs depende?
  5. **Consumidores:** Quem vai consumir este serviço?

  Propostas:
  [Apresentar proposta baseada nas respostas anteriores]

  Confirma ou ajusta?
```

#### Step 2.2: Technology Stack Selection
```yaml
actions:
  - Avaliar compatibilidade com stack existente
  - Propor tecnologias para o novo serviço
  - Justificar escolhas técnicas
elicit: true
prompt: |
  Baseado na stack existente e requisitos, proponho:

  **Backend Framework:** [proposta] - Razão: [justificativa]
  **Database:** [proposta] - Razão: [justificativa]
  **API Style:** [REST/GraphQL/tRPC/gRPC] - Razão: [justificativa]
  **Authentication:** [proposta] - Razão: [justificativa]
  **Caching:** [proposta] - Razão: [justificativa]

  Aprova ou prefere alternativas?
```

#### Step 2.3: API Design
```yaml
actions:
  - Definir endpoints/operations principais
  - Definir request/response schemas
  - Definir error handling strategy
  - Definir rate limiting & security
template: api-design-template.md
output: docs/03-ARCHITECTURE/api-design.md
```

#### Step 2.4: Data Architecture
```yaml
delegate: "@data-engineer"
note: |
  Para schema de database, migrations, e otimizações,
  delegar para @data-engineer (Dara).

  @architect mantém responsabilidade por:
  - Escolha de tecnologia de database (Postgres, MySQL, MongoDB, etc.)
  - Padrões de acesso a dados (repositories, ORMs)
  - Estratégia de caching
```

#### Step 2.5: Integration Patterns
```yaml
elicit: true
prompt: |
  Como este serviço se integra com sistemas existentes?

  1. **Event-Driven?** Publica/consome eventos?
  2. **REST APIs?** Expõe/consome REST APIs?
  3. **Message Queues?** Usa filas (RabbitMQ, SQS, etc)?
  4. **Webhooks?** Notifica outros sistemas?
  5. **Background Jobs?** Processa tarefas assíncronas?

  Padrões propostos:
  [Apresentar padrões de integração recomendados]
```

---

### Phase 3: Cross-Cutting Concerns (Aspectos Transversais)

**Objetivo:** Definir logging, monitoring, security, performance

#### Step 3.1: Observability
```yaml
actions:
  - Definir estratégia de logging
  - Definir métricas e monitoring
  - Definir tracing (distributed tracing)
  - Definir alerting
tools_suggested:
  - Logging: Winston, Pino, Bunyan
  - Monitoring: Prometheus, DataDog, New Relic
  - Tracing: OpenTelemetry, Jaeger
```

#### Step 3.2: Security Architecture
```yaml
actions:
  - Autenticação (JWT, OAuth, sessions)
  - Autorização (RBAC, ABAC, RLS)
  - Input validation & sanitization
  - Rate limiting & DDoS protection
  - Secrets management
  - Encryption (in transit, at rest)
```

#### Step 3.3: Performance Optimization
```yaml
actions:
  - Caching strategy (Redis, in-memory)
  - Database query optimization (indexes, queries)
  - API pagination & filtering
  - Code splitting & lazy loading (se frontend)
  - CDN & asset optimization
```

---

### Phase 4: Documentation & Handoff (Documentação)

**Objetivo:** Documentar arquitetura e preparar para implementação

#### Step 4.1: Generate Architecture Document
```yaml
template: brownfield-architecture-tmpl.yaml
output: docs/03-ARCHITECTURE/service-[nome]-architecture.md
sections:
  - Overview
  - Service Boundaries
  - Technology Stack
  - API Design
  - Data Architecture
  - Integration Patterns
  - Security
  - Performance
  - Deployment Strategy
  - Monitoring & Observability
```

#### Step 4.2: Create Architecture Diagrams
```yaml
tools:
  - Mermaid (diagramas em texto)
  - Excalidraw (diagramas visuais)
diagrams:
  - System Context Diagram
  - Service Architecture Diagram
  - Data Flow Diagram
  - Deployment Diagram
output: docs/03-ARCHITECTURE/diagrams/
```

#### Step 4.3: Architecture Decision Records (ADRs)
```yaml
actions:
  - Criar ADRs para decisões principais
  - Justificar escolhas técnicas
  - Documentar trade-offs
output: docs/03-ARCHITECTURE/decisions/
format: NNN-titulo-decisao.md
```

#### Step 4.4: Handoff Checklist
```yaml
checklist:
  - [ ] Documento de arquitetura completo
  - [ ] Diagramas criados
  - [ ] ADRs documentados
  - [ ] API design definido
  - [ ] Database schema delegado a @data-engineer
  - [ ] Security checklist validado
  - [ ] Performance checklist validado
  - [ ] Pronto para handoff a @dev
```

---

## Outputs

### Generated Files
```
docs/03-ARCHITECTURE/
├── service-[nome]-architecture.md
├── api-design.md
├── diagrams/
│   ├── system-context.mermaid
│   ├── service-architecture.mermaid
│   ├── data-flow.mermaid
│   └── deployment.mermaid
└── decisions/
    ├── 001-escolha-framework.md
    ├── 002-escolha-database.md
    └── 003-padroes-integracao.md
```

---

## Success Criteria

- [ ] Arquitetura alinhada com projeto existente
- [ ] Stack tecnológica compatível e justificada
- [ ] API design completo e consistente
- [ ] Integrações mapeadas e documentadas
- [ ] Segurança e performance consideradas
- [ ] Documentação completa e clara
- [ ] ADRs criados para decisões importantes
- [ ] @dev pode começar implementação

---

## Next Steps

Após completar este workflow:
1. Handoff para **@data-engineer** (schema design)
2. Handoff para **@dev** (implementação)
3. Agendar **@qa** (testes e validação)

---

**Workflow Owner:** @architect (Aria)
**Last Updated:** 2026-01-27
