# AIOS Core - Neoloop Design System

Estrutura AIOS instalada para suportar workflows de desenvolvimento, arquitetura e gestão de projeto.

## Estrutura

```
.aios-core/
└── development/
    ├── workflows/          # Workflows multi-etapa
    │   └── brownfield-service.md
    ├── tasks/              # Tasks individuais
    ├── templates/          # Templates de documentos
    │   ├── brownfield-architecture-tmpl.yaml
    │   └── api-design-template.md
    ├── checklists/         # Checklists de validação
    ├── data/               # Dados e knowledge base
    ├── utils/              # Utilitários e scripts
    └── scripts/            # Scripts de automação
```

## Workflows Disponíveis

### brownfield-service
Workflow completo para arquitetar um serviço backend em projeto existente (brownfield).

**Uso:**
```
@architect *workflow brownfield-service
```

**Fases:**
1. **Discovery & Context:** Análise do projeto existente
2. **Architecture Design:** Projeto da arquitetura do serviço
3. **Cross-Cutting Concerns:** Logging, monitoring, security, performance
4. **Documentation & Handoff:** Documentação e preparação para dev

## Templates Disponíveis

### brownfield-architecture-tmpl.yaml
Template completo para documentação de arquitetura de serviços brownfield.

**Seções:**
- Overview & Service Boundaries
- Technology Stack
- API Design
- Data Architecture
- Integration Patterns
- Security & Performance
- Observability & Deployment

### api-design-template.md
Template para documentação de design de APIs.

**Inclui:**
- Endpoints
- Authentication
- Error handling
- Rate limiting
- Pagination

## Como Usar

1. **Ativar agent apropriado:**
   ```
   @architect (para arquitetura)
   @dev (para desenvolvimento)
   @pm (para gestão de produto)
   ```

2. **Executar workflow:**
   ```
   *workflow brownfield-service
   ```

3. **Seguir as etapas interativas** respondendo às perguntas do workflow

4. **Documentação gerada em:**
   ```
   docs/03-ARCHITECTURE/
   ```

## Expansão Futura

Esta estrutura pode ser expandida com:
- Mais workflows (greenfield-service, frontend-architecture, etc.)
- Mais templates (PRD, story, etc.)
- Tasks individuais reutilizáveis
- Checklists de validação
- Knowledge base e dados de referência

---

**Instalado em:** 2026-01-27
**Projeto:** Neoloop Design System
**Agente:** @architect (Aria)
