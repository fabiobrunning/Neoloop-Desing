# Product Requirements Document (PRD)
## ImageMagic Bot - Edição de Imagens com IA

**Versão:** 1.0 (MVP)
**Status:** Aprovado
**Data:** 2025-01-27
**Proprietário do Produto:** Fabio Brunning

---

## 1. Visão do Produto

### Declaração de Visão
**ImageMagic Bot** é um assistente de edição automática de imagens que integra múltiplos motores de IA (OpenAI e Gemini) em uma experiência conversacional via Telegram, permitindo editar imagens complexas com comandos em linguagem natural.

### Problema a Resolver
- ⏱️ **Tempo**: Edição manual de imagens é demorada
- 💰 **Custo**: Requer ferramentas caras (Photoshop, etc)
- 🔧 **Complexidade**: Usuários não-técnicos têm dificuldade em editar imagens
- ⚙️ **Integração**: Fluxos de trabalho empresariais precisam de automação de edição

### Solução Proposta
Bot no Telegram que processa imagens enviadas com prompts em linguagem natural, usando dois motores de IA para máxima qualidade:
- **OpenAI DALL-E**: Edição com alta fidelidade à imagem original
- **Gemini 2.5 Flash**: Análise e geração de conteúdo visual

---

## 2. Público-Alvo

### Segmento Principal: Empresarial/B2B

| Persona | Descrição | Caso de Uso |
|---------|-----------|-----------|
| **Gestor de Marketing** | Responsável por conteúdo visual | Editar rapidamente imagens para campanhas |
| **Designer Autônomo** | Profissional em agências | Acelerar workflow de design |
| **Equipe de Produto** | Cria mockups e protótipos | Gerar variações de interfaces |
| **Content Creator** | Produz conteúdo em escala | Processar lotes de imagens |

### Métricas de Sucesso por Persona
- **Tempo economizado**: 60-70% redução em tempo de edição
- **Taxa de reuso**: Capacidade de aplicar prompts em múltiplas imagens
- **Qualidade**: Edições profissionais na primeira tentativa

---

## 3. Funcionalidades MVP

### 3.1 Fluxo Principal de Edição

```
[Usuário envia foto + prompt]
    ↓
[Bot processa com 2 engines em paralelo]
    ├─ Pipeline OpenAI: Edição com fidelidade
    └─ Pipeline Gemini: Análise + Geração
    ↓
[Retorna imagens editadas]
    ↓
[Usuário recebe resultado]
```

### 3.2 Funcionalidades Core

#### F1. Recebimento de Imagens via Telegram
- Aceita múltiplos formatos (JPG, PNG)
- Captura prompt do usuário (caption da imagem)
- Suporta bot em grupos privados

**Critérios de Aceitação:**
- [ ] Bot responde a imagens enviadas em DM
- [ ] Extrai caption corretamente
- [ ] Valida tamanho máximo de imagem (50MB)

#### F2. Pipeline OpenAI - Edição com Alta Fidelidade
- Envia imagem + prompt para API OpenAI `/images/edits`
- Parâmetros: tamanho 1024x1024, qualidade alta
- Preserva elementos da imagem original

**Critérios de Aceitação:**
- [ ] Requisição formatada corretamente (multipart-form-data)
- [ ] Retorno convertido em imagem (JPEG)
- [ ] Timeout: máx 30s por requisição
- [ ] Fallback se OpenAI falhar

#### F3. Pipeline Gemini - Análise e Geração
- Envia imagem como base64 + prompt em JSON
- Usa modelo Gemini 2.5 Flash (mais rápido)
- Retorna análise + imagem gerada

**Critérios de Aceitação:**
- [ ] Encoding base64 correto
- [ ] Headers Content-Type apropriados
- [ ] Modelo correto: `gemini-2.5-flash-image-preview`
- [ ] Resposta extraída corretamente

#### F4. Entrega de Resultados
- Envia imagens processadas de volta ao usuário
- Formato: JPEG otimizado
- Mensagem de confirmação

**Critérios de Aceitação:**
- [ ] Imagens retornam com qualidade
- [ ] Resposta em menos de 60 segundos
- [ ] Metadata preservada (tamanho, resolução)

### 3.3 Configuração Técnica Suportada

| Componente | Configuração MVP |
|-----------|-----------------|
| **Trigger** | Telegram Bot (polling via webhook) |
| **Engines IA** | OpenAI (edição) + Gemini (geração) |
| **Orquestração** | n8n (workflow serverless) |
| **Formato saída** | JPEG 1024x1024 |
| **Autenticação** | Telegram Bot Token + API Keys |

---

## 4. Requisitos Técnicos

### 4.1 Infraestrutura
- **Plataforma**: n8n Cloud ou Self-hosted
- **APIs Externas**: Telegram, OpenAI, Google Gemini
- **Credenciais Necessárias**:
  - Telegram Bot Token (Confraria)
  - OpenAI API Key (sk-proj-*)
  - Google Gemini API Key (GooglePalmApi)

### 4.2 Integrações
```yaml
Telegram:
  version: Bot API 6.0+
  auth: telegramApi credential
  webhook: enabled

OpenAI:
  endpoint: https://api.openai.com/v1/images/edits
  model: gpt-image-1
  params:
    size: 1024x1024
    quality: high
    input_fidelity: high

Google Gemini:
  endpoint: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview
  method: generateContent
  content_type: application/json
```

### 4.3 Tratamento de Dados
- **Imagens**: Processadas em memória, não armazenadas
- **Prompts**: Associados ao chat_id do Telegram (auditável)
- **Retenção**: Nenhum histórico persistido (MVP)

### 4.4 Limites Operacionais
| Métrica | Limite MVP |
|---------|-----------|
| Tamanho máximo imagem | 50 MB |
| Resolução máxima | 4096x4096 |
| Timeout processamento | 60s |
| Rate limit | 10 req/min por usuário |
| Custo estimado | $0.20/edição (OpenAI + Gemini) |

---

## 5. Critérios de Aceitação Gerais

### Fluxo End-to-End
- [x] Usuário envia imagem + prompt via Telegram
- [x] Bot valida entrada (imagem, tamanho, formato)
- [x] OpenAI pipeline: edita imagem com fidelidade
- [x] Gemini pipeline: analisa e gera variação
- [x] Ambas pipelines rodam em paralelo
- [x] Bot retorna resultado em < 60 segundos
- [x] Imagens retornam em JPEG de alta qualidade
- [x] Usuário pode enviar múltiplas imagens em sequência

### Confiabilidade
- [x] Se OpenAI falhar, Gemini result é retornado
- [x] Se Gemini falhar, OpenAI result é retornado
- [x] Se ambos falharem, mensagem de erro clara
- [x] Bot recupera de timeouts gracefully
- [x] Logs registram todas as operações

### Segurança
- [x] API keys armazenadas em credenciais n8n
- [x] Nenhuma chave exposta em logs
- [x] Validação de tamanho de arquivo
- [x] Rate limiting por usuário (10 req/min)

---

## 6. Não Incluído no MVP

❌ Armazenamento de histórico de edições
❌ Edições consecutivas (versioning)
❌ Painel de administrador
❌ Análise de uso/analytics
❌ Suporte a tipos de arquivo além de imagens
❌ Webhook de confirmação
❌ Caching de resultados
❌ Multi-tenant (apenas Telegram pessoal)

---

## 7. Roadmap Futuro (Pós-MVP)

### v1.1 - Melhorias Operacionais
- [ ] Histórico de edições por usuário
- [ ] Salvamento de prompts favoritos
- [ ] Suporte a edições em batch (múltiplas imagens)
- [ ] Preview antes de processar

### v1.2 - Expansão de Funcionalidades
- [ ] Integração com Google Drive/Dropbox
- [ ] Suporte a vídeos (quadros-chave)
- [ ] Painel web de edições
- [ ] Templates de prompts pré-configurados

### v2.0 - Enterprise
- [ ] Multi-tenant (workspace)
- [ ] Auditoria e logs persistidos
- [ ] Controle de acesso (RBAC)
- [ ] Webhooks custom para integrações
- [ ] API pública para integração
- [ ] Suporte a modelos customizados

---

## 8. Métricas de Sucesso

### Adoção
- **KPI 1**: Número de usuários únicos/mês
- **KPI 2**: Imagens processadas/mês
- **KPI 3**: Tempo médio resposta < 45s

### Qualidade
- **KPI 4**: Taxa de sucesso (sem erros) > 95%
- **KPI 5**: Taxa de reuso de prompts > 30%
- **KPI 6**: NPS (Net Promoter Score) > 50

### Custo-Benefício
- **KPI 7**: Custo por edição < $0.25
- **KPI 8**: Economia de tempo por usuário > 10h/mês
- **KPI 9**: ROI > 200% em 6 meses

---

## 9. Dependências e Riscos

### Dependências Externas
| Dependência | Risco | Mitigação |
|-----------|--------|-----------|
| OpenAI API Availability | Serviço indisponível | Fallback para Gemini |
| Gemini API Availability | Serviço indisponível | Fallback para OpenAI |
| Telegram Bot API | Rate limits | Implementar fila de requisições |
| Custo de APIs | Pode escalar | Monitoring de uso, rate limit |

### Riscos Técnicos
- **R1**: Timeout em processamento de imagens grandes
  - Mitigação: Validação de tamanho, compressão automática

- **R2**: Qualidade inconsistente entre engines
  - Mitigação: Testes com exemplos representativos

- **R3**: Custo de API cresce exponencialmente
  - Mitigação: Rate limiting, quotas por usuário

---

## 10. Glossário e Definições

- **Engine IA**: Modelo de machine learning (OpenAI/Gemini)
- **Pipeline**: Sequência de processamento (obtenção imagem → processamento → retorno)
- **Prompt**: Instrução em linguagem natural para a IA
- **Webhook**: Callback de Telegram para notificar bot de mensagens
- **Multipart-form-data**: Formato de envio de arquivos em HTTP
- **Base64**: Encoding de dados binários em texto

---

## 11. Aprovação

| Role | Nome | Data | Assinatura |
|------|------|------|-----------|
| Product Owner | Fabio Brunning | 2025-01-27 | ✅ |
| Technical Lead | - | - | ⏳ |
| Stakeholder | - | - | ⏳ |

---

## 12. Histórico de Versões

| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0 | 2025-01-27 | Criação inicial - MVP |

---

## 📎 Anexos

### A. Fluxo de Processamento (ASCII Diagram)
```
┌────────────────────────────────────────────────┐
│    Usuário envia imagem + caption no Telegram  │
└─────────────────────┬──────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────────┐
        │  Telegram Trigger (Webhook) │
        └──────┬──────────────────────┘
               │
               ├─────────────────────┬──────────────────────┐
               ▼                     ▼                      ▼
        ┌───────────────┐   ┌──────────────┐   ┌─────────────────┐
        │  Get File     │   │  Get File    │   │ Prepare Data    │
        │  (Photo)      │   │  (Photo)     │   │ (2 streams)     │
        └───────┬───────┘   └──────┬───────┘   └────────┬────────┘
                │                  │                     │
        ┌───────▼──────────┐       │            ┌────────▼────────┐
        │ Prepare Data     │       │            │ Prepare Data    │
        │ (Convert JPEG)   │       │            │ (Base64 Gemini) │
        └───────┬──────────┘       │            └────────┬────────┘
                │                  │                     │
        ┌───────▼──────────────┐   └──────┬──────────────▼───┐
        │  OpenAI Image Edit   │          │  Gemini 2.5       │
        │  /images/edits       │          │  /generateContent │
        │  (fidelity + quality)│          │                   │
        └───────┬──────────────┘          └──────┬────────────┘
                │                                │
        ┌───────▼──────────────┐   ┌────────────▼───────────┐
        │ Convert to Image     │   │ Convert to Image       │
        │ (JPEG Output)        │   │ (JPEG Output)          │
        └───────┬──────────────┘   └────────┬───────────────┘
                │                           │
                └───────────┬───────────────┘
                            │
                    ┌───────▼────────┐
                    │ Retorna para   │
                    │ Usuário via TG │
                    └────────────────┘
```

### B. Exemplos de Prompts Validados
```
✅ "Adicione um filtro no tom petro branco"
✅ "Transforme em estilo cartoon"
✅ "Remova o fundo e coloque degradado azul"
✅ "Aplique efeito noir em preto e branco"
✅ "Mude a cor do texto para dourado"
```

---

**Documento Oficial**
Classified as: `software` | Template: `prd-tmpl.yaml`
Location: `docs/01-REQUIREMENTS/image-magic-bot-prd.md`
