# Product Requirements Document (PRD)
## Edit & Publish Agent - Agente de Edição com Publicação no Instagram

**Versão:** 1.0 (MVP)
**Status:** Design
**Data:** 2025-01-27
**Proprietário do Produto:** Fabio Brunning

---

## 1. Visão do Produto

### Declaração de Visão
**Edit & Publish Agent** é um assistente inteligente no Telegram que gerencia o ciclo completo de criação de conteúdo: edição de imagens com aprovação interativa, geração automática de legendas com IA, e publicação direta no Instagram ou salvamento local — tudo em uma conversa fluida.

### Problema a Resolver
Criar conteúdo visual para Instagram é complexo:
- ⏱️ **Tempo**: Edição manual + escrita de legenda + publicação = 3+ horas
- 🔄 **Retrabalho**: Usuário aprova edição, mas não gosta da legenda
- 🛠️ **Fragmentação**: Múltiplas ferramentas (Photoshop, ChatGPT, Instagram)
- 📱 **Integração**: Falta workflow unificado

### Solução Proposta
Agente Telegram que orquestra:
1. **Edição de imagem** com IA (OpenAI + Gemini) + preview
2. **Aprovação interativa** do usuário (Aceitar / Tentar novamente)
3. **Geração de legenda** automática (Claude Sonnet)
4. **Publicação integrada** (Instagram via Meta Graph API OU salvamento local)
5. **Histórico e controle** (Google Sheets de auditoria)

---

## 2. Público-Alvo

### Segmento Principal: Criadores de Conteúdo Empresarial

| Persona | Descrição | Caso de Uso |
|---------|-----------|-----------|
| **Content Creator da Marca** | Responsável por postar no Instagram | Criar posts aprovados em minutos |
| **Gerente de Marketing** | Coordena conteúdo visual | Gerenciar múltiplos posts em paralelo |
| **Designer Freelancer** | Trabalha com múltiplos clientes | Automatizar workflow repetitivo |
| **Empreendedor Solopreneur** | Cuida de tudo sozinho | Economizar tempo em edição + legenda |

### Valor Proposto por Persona
- **Tempo economizado**: 60-70% em workflow editorial
- **Qualidade consistente**: IA gera legendas seguindo padrão da marca
- **Controle total**: Aprova cada edição antes de publicar
- **Sem deixar Telegram**: Todo workflow em um app

---

## 3. Fluxo Principal de Interação

### User Journey Completo

```
┌─────────────────────────────────────────────────────────┐
│ USUÁRIO INICIA CONVERSAÇÃO NO TELEGRAM                 │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────┐
    │ 1️⃣  ENVIA IMAGEM + PROMPT    │
    │                              │
    │ "Edite para tom ouro"        │
    │ [imagem anexada]             │
    └──────────────┬───────────────┘
                   │
                   ▼
    ┌──────────────────────────────────────┐
    │ 2️⃣  BOT PROCESSA EDIÇÃO (PARALELO)  │
    │                                      │
    │ OpenAI: Edita com fidelidade        │
    │ Gemini: Analisa + variação          │
    │ Tempo: ~45 segundos                 │
    └──────────────┬──────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────┐
    │ 3️⃣  MOSTRA PREVIEW               │
    │                                  │
    │ "Aqui está sua edição:"          │
    │ [imagem editada]                 │
    │                                  │
    │ [✅ Aprovar] [🔄 Tentar novamente]│
    └──────────────┬────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    Usuário aprova      Tenta novamente
        │                     │
        │              "Deixar mais vibrante"
        │              (volta ao passo 2)
        │                     │
        │          ┌──────────┘
        │          │
        ▼          ▼
    ┌──────────────────────────────────────┐
    │ 4️⃣  GERA LEGENDA AUTOMÁTICA         │
    │                                      │
    │ Claude Sonnet cria legenda           │
    │ Limite: 700 caracteres              │
    │ Estilo: Compatível com a imagem     │
    │ Tempo: ~20 segundos                 │
    └──────────────┬──────────────────────┘
                   │
                   ▼
    ┌──────────────────────────────────────┐
    │ 5️⃣  MOSTRA LEGENDA + OPÇÕES          │
    │                                      │
    │ "Legenda gerada:"                   │
    │ "[Texto da legenda...]"             │
    │                                      │
    │ [📸 Postar no Instagram]            │
    │ [💾 Salvar Localmente]              │
    │ [✏️ Editar Legenda]                 │
    └──────────────┬──────────────────────┘
                   │
    ┌──────────────┼──────────────┬──────────┐
    │              │              │          │
Postar IG   Editar Legenda   Salvar Local
    │              │              │          │
    ▼              ▼              ▼          ▼
┌────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐
│Publica │  │Aguarda   │  │Salva em  │  │Pronto! │
│no IG   │  │input     │  │Cloudinary│  │        │
│        │  │do user   │  │&GSheets  │  │        │
└────┬───┘  │          │  └────┬─────┘  └────┬───┘
     │      └──────────┘       │             │
     ▼                         ▼             ▼
┌──────────────────────────────────────────────┐
│ 6️⃣  CONFIRMAÇÃO FINAL                       │
│                                             │
│ ✅ Post publicado no Instagram              │
│ ✅ Dados registrados no Google Sheets       │
│ ✅ Histórico mantido para análise           │
└──────────────────────────────────────────────┘
```

---

## 4. Funcionalidades MVP

### F1. Recebimento de Imagem + Prompt via Telegram

**Descrição:** Usuário envia imagem com caption descrevendo edição desejada.

**Especificação:**
- Aceita JPG, PNG (máx 50 MB)
- Extrai caption como prompt de edição
- Valida formato e tamanho
- Armazena chat_id para registro

**Critérios de Aceitação:**
- [ ] Bot aguarda imagem + caption
- [ ] Extrai prompt da caption corretamente
- [ ] Rejeita imagens > 50 MB com mensagem clara
- [ ] Cria registro de auditoria com timestamp

---

### F2. Edição Paralela (OpenAI + Gemini)

**Descrição:** Processa edição em duas engines simultaneamente para máxima qualidade.

**Pipeline A - OpenAI Edição (fidelidade alta):**
```
Imagem + Prompt → OpenAI /images/edits → JPEG 1024x1024
Params: quality=high, input_fidelity=high
```

**Pipeline B - Gemini Geração:**
```
Imagem (base64) + Prompt → Gemini 2.5 Flash → Imagem gerada
Params: MIME type: image/jpeg
```

**Critérios de Aceitação:**
- [ ] Ambas requisições rodam em paralelo (não sequencial)
- [ ] Timeout máximo: 45 segundos
- [ ] Fallback automático se uma falhar
- [ ] Retorna melhor resultado (definido pelo usuário)

---

### F3. Preview com Aprovação Interativa

**Descrição:** Mostra resultado editado e aguarda decisão do usuário.

**Fluxo:**
1. Bot envia: "Aqui está sua edição:"
2. Mostra imagem editada
3. Oferece botões inline:
   - ✅ **Aprovar** → Próximo passo (legenda)
   - 🔄 **Tentar Novamente** → Usuário envia novo prompt
   - ❌ **Cancelar** → Finaliza fluxo

**Comportamento "Tentar Novamente":**
- Usuário pode enviar novo prompt (ex: "Deixar mais claro")
- Bot reprocessa com novo prompt
- Oferece aprovação novamente
- Permite até 3 tentativas antes de avisar

**Critérios de Aceitação:**
- [ ] Botões inline funcionam corretamente
- [ ] Novo prompt reprocessa edição
- [ ] Usuário pode fazer até 3 tentativas
- [ ] Limite de 4ª tentativa → "Salvar esta edição ou cancelar?"

---

### F4. Geração de Legenda com Claude Sonnet

**Descrição:** Cria legenda profissional automaticamente baseada na imagem editada.

**Especificação:**
```
Input: Frase/tema + Imagem editada + Contexto da marca
Output: Legenda até 700 caracteres

Regras:
- Novo ponto de vista (não repetir frase original)
- Linguagem clara e pessoal
- Call to action implícito
- Sem emojis, sem formatação extra
- Máximo 700 caracteres
```

**Prompt do Sistema:**
```
Crie uma legenda com no máximo 700 caracteres para
um post no Instagram baseado nesta imagem.

NÃO repita ou parafrase o que já está escrito.
Complemente trazendo perspectiva diferente.

Estrutura:
1. Novo ponto de vista (2 frases)
2. Conexão prática (situação real)
3. Call to action (reflexão/ação)

Estilo: Conversa pessoal, linguagem clara,
sem jargões, sem emojis.
```

**Critérios de Aceitação:**
- [ ] Legenda gerada em < 20 segundos
- [ ] Máximo 700 caracteres respeitado
- [ ] Não repete conteúdo da imagem
- [ ] Oferece opção de editar manualmente se quiser

---

### F5. Escolha de Destino (Instagram OU Local)

**Descrição:** Usuário escolhe onde publicar o conteúdo final.

**Opção A - Postar no Instagram:**
```
Workflow:
1. Envia imagem ao Cloudinary (armazenamento)
2. Cria container de mídia (Meta Graph API)
3. Publica com legenda
4. Registra URL do post no Google Sheets

Tempo total: ~10 segundos (após upload Cloudinary)
```

**Opção B - Salvar Localmente:**
```
Workflow:
1. Envia imagem ao Cloudinary
2. Registra link no Google Sheets
3. Oferece link ao usuário
4. Status: "Pronto para publicar manualmente"

Tempo total: ~5 segundos
```

**Critérios de Aceitação:**
- [ ] Instagram: Post publicado com legenda e imagem
- [ ] Local: Link fornecido ao usuário
- [ ] Google Sheets: Registro de ambos casos
- [ ] Mensagem de confirmação clara
- [ ] Sem erros de autenticação

---

### F6. Histórico e Auditoria (Google Sheets)

**Descrição:** Mantém registro de todas as edições e publicações.

**Colunas do Sheets:**
```
| Data | ChatID | Tema | Prompt Original | Tentativas |
| Legenda | Destino | URL Instagram | Status | Custo API |
```

**Atualizações:**
- Após cada edição aprovada
- Após cada publicação
- Com timestamp de cada ação
- Custo estimado de APIs (tracking)

**Critérios de Aceitação:**
- [ ] Toda edição registrada
- [ ] Data/hora precisa
- [ ] Chat ID para rastreamento
- [ ] Legenda salva para análise

---

## 5. Fluxos de Erro e Recuperação

### Cenário 1: OpenAI falha
```
Resultado esperado:
- Tenta Gemini
- Se Gemini sucesso → mostra resultado Gemini
- Se ambos falham → "Desculpe, erro na edição.
  Tente novamente em 2 min."
```

### Cenário 2: Usuário não aprova após 3 tentativas
```
Resultado esperado:
- Bot oferece: Usar última edição OU cancelar
- Se cancelar → não avança para legenda
- Registra no Sheets: "Cancelado após 3 tentativas"
```

### Cenário 3: Falha ao publicar no Instagram
```
Resultado esperado:
- Oferece: "Salvar para publicar depois"
- Gera link do Cloudinary
- Oferece tentar publicar novamente
- Log de erro para debug
```

### Cenário 4: Legenda > 700 caracteres
```
Resultado esperado:
- Claude corta automaticamente
- Oferece edição manual ao usuário
- "Clique para editar a legenda"
```

---

## 6. Arquitetura Técnica

### Stack
```
Frontend: Telegram Bot (n8n)
Processamento: n8n Workflows
APIs:
  - Telegram Bot API
  - OpenAI /images/edits
  - Google Gemini 2.5 Flash
  - Anthropic Claude Sonnet
  - Meta Graph API (Instagram)
  - Cloudinary (CDN/Storage)
  - Google Sheets (Auditoria)
```

### Nodes Principais do n8n
```
1. Telegram Trigger → aguarda mensagem com imagem
2. Get File (TG) → baixa imagem
3. Prepare Data (paralelo) → formata para OpenAI + Gemini
4. OpenAI /images/edits → edição com fidelidade
5. Gemini 2.5 Flash → análise/geração
6. Convert to Image → normaliza saída
7. Telegram Send → mostra preview
8. Wait for Approval → aguarda botão do usuário
9. Claude Sonnet → gera legenda
10. Cloudinary Upload → armazena imagem
11. Meta Graph API → publica no Instagram (opcional)
12. Google Sheets Append → registra auditoria
```

### Limites Operacionais

| Métrica | Limite |
|---------|--------|
| Tamanho máximo imagem | 50 MB |
| Resoluções suportadas | Até 4096x4096 |
| Timeout edição | 45 segundos |
| Timeout legenda | 20 segundos |
| Tentativas de edição | 3 (4ª oferece "usar esta") |
| Caracteres legenda | 700 máximo |
| Rate limit Telegram | 30 msg/min |
| Custo estimado/post | $0.40 (APIs) |

---

## 7. Não Incluído no MVP

❌ Agendamento de publicação (sempre imediato)
❌ Múltiplas imagens em um post
❌ Carrossel no Instagram (apenas post único)
❌ Stories + Reels (apenas Feed)
❌ Análise de engagement
❌ Banco de templates de legenda
❌ Interface web de dashboard
❌ Multi-usuário (1 account por bot)

---

## 8. Roadmap Futuro

### v1.1 - Melhorias de UX
- [ ] Editar legenda sugerida antes de publicar
- [ ] Ofertar múltiplas variações de legenda (3 opções)
- [ ] Preview de como ficará no Instagram
- [ ] Histórico de edições (últimas 5)

### v1.2 - Expansão
- [ ] Suporte a múltiplas imagens (carrossel)
- [ ] Agendamento de publicação (data/hora)
- [ ] Templates de legenda (categoria)
- [ ] Integração com TikTok/YouTube
- [ ] Análise de performance pós-publicação

### v2.0 - Enterprise
- [ ] Multi-account (gerenciar múltiplas contas)
- [ ] Workflow de aprovação (editor → gerente → publica)
- [ ] Dashboard de performance
- [ ] Integração com ferramentas de análise
- [ ] API pública para parceiros

---

## 9. Métricas de Sucesso

### Adoção
- **KPI 1**: Posts criados por mês (alvo: 50+)
- **KPI 2**: Taxa de aprovação na primeira tentativa (alvo: 80%)
- **KPI 3**: Publicações vs. salvamentos locais (alvo: 70% IG)

### Eficiência
- **KPI 4**: Tempo médio workflow (alvo: < 2 min)
- **KPI 5**: Taxa de sucesso (sem erros) (alvo: 99%)
- **KPI 6**: Taxa de rejeição após edição (alvo: < 10%)

### Qualidade
- **KPI 7**: NPS legenda (alvo: > 7/10)
- **KPI 8**: Reusabilidade de legendas (alvo: 30% com ajustes)
- **KPI 9**: Engagement pós-publicação (rastreamento futuro)

---

## 10. Requisitos de Integração

### Credenciais Necessárias
```yaml
Telegram:
  bot_token: "YOUR_BOT_TOKEN"
  chat_id: "USER_CHAT_ID"

OpenAI:
  api_key: "sk-proj-..."
  model: "gpt-image-1" (para /images/edits)

Google Gemini:
  api_key: "YOUR_GEMINI_KEY"
  model: "gemini-2.5-flash-image-preview"

Anthropic:
  api_key: "YOUR_CLAUDE_KEY"
  model: "claude-sonnet-4-20250514"

Meta (Instagram):
  access_token: "IGAAKsKBXIKo5BZA..."
  business_account_id: "17841476448013577"
  ig_user_id: "17841476448013577"

Cloudinary:
  cloud_name: "dnbuuphek"
  upload_preset: "n8n_image_uploads"

Google Sheets:
  sheet_id: "1cheSAfdJbjjjFhFkBaY9kkoS2SrLnBZmx8rQ-WqB5Ns"
  worksheet: "Auditoria"
```

### Permissões Necessárias
```
Telegram: read_messages, send_messages, read_files
OpenAI: create images via edit endpoint
Gemini: generate images
Anthropic: text generation
Meta: instagram_content_publish, instagram_basic
Cloudinary: upload, get secure_url
Google Sheets: append rows, read rows
```

---

## 11. Segurança e Conformidade

### Dados Sensíveis
- API keys armazenados em credenciais n8n (criptografadas)
- Imagens não persistidas (apenas durante processamento)
- Nenhuma imagem armazenada localmente
- URLs do Cloudinary com expiração (futuro)

### Auditoria
- Cada operação registrada no Google Sheets
- Timestamp de todas as ações
- Chat ID para rastreamento de usuário
- Logs de erro para debugging

### Compliance
- GDPR: Sem dados pessoais armazenados
- Instagram ToS: Publicação respeitando diretrizes
- Cloudinary: CDN confiável com backups

---

## 12. Exemplos de Uso

### Exemplo 1: Edição + Publicação (Happy Path)
```
👤 Usuário: [envia imagem + "Deixar mais brilho"]
🤖 Bot: Processando edição...
        [mostra imagem editada]
        [✅ Aprovar] [🔄 Tentar Novamente]

👤 Usuário: [clica ✅ Aprovar]
🤖 Bot: Gerando legenda...
        "Transforme sua visão em realidade..."
        [📸 Postar no Instagram]
        [💾 Salvar Localmente]

👤 Usuário: [clica 📸 Postar no Instagram]
🤖 Bot: ✅ Post publicado!
        https://instagram.com/p/XXXXX

        Registrado em: Google Sheets
        Data: 27/01/2025 14:32:15
```

### Exemplo 2: Múltiplas Tentativas
```
👤 Usuário: [envia imagem + "Tom mais quente"]
🤖 Bot: [mostra primeira edição]
        [✅ Aprovar] [🔄 Tentar Novamente]

👤 Usuário: [clica 🔄] e envia "Ainda mais quente, tipo ouro"
🤖 Bot: Reprocessando...
        [mostra segunda versão]

👤 Usuário: [clica 🔄] e envia "Perfeito!"
🤖 Bot: [terceira versão]
        [✅ Aprovar] [🔄 Tentar Novamente]

👤 Usuário: [clica ✅]
🤖 Bot: Continuando com legenda...
        (registra: "3 tentativas de edição")
```

---

## 13. Glossário

- **Pipeline**: Fluxo de processamento (edição + conversão)
- **Preview**: Visualização da imagem antes de aprovar
- **Fallback**: Alternativa automática (Gemini se OpenAI falha)
- **Prompt**: Instrução em linguagem natural para IA
- **Legenda**: Caption do Instagram (máx 2.200 caracteres)
- **Meta Graph API**: API oficial do Instagram para publicação
- **Cloudinary**: Serviço de CDN e armazenamento de imagens

---

## 14. Aprovação

| Role | Nome | Data | Status |
|------|------|------|--------|
| Product Owner | Fabio Brunning | 2025-01-27 | ⏳ Aprovação Pendente |
| Technical Lead | - | - | ⏳ |
| Stakeholder | - | - | ⏳ |

---

## 15. Histórico de Versões

| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0 | 2025-01-27 | Criação inicial - MVP com edição + aprovação + publicação |

---

## 📎 Anexos

### A. Fluxo Detalhado de Estados

```
STATE MACHINE - Edit & Publish Agent

[START]
  ↓
[WAITING_FOR_IMAGE]
  ← Usuário envia imagem + prompt
  ↓
[PROCESSING_EDIT] (paralelo: OpenAI + Gemini)
  ↓
[SHOWING_PREVIEW]
  ├─→ Usuário clica [✅ Aprovar] → [GENERATING_CAPTION]
  ├─→ Usuário clica [🔄 Tentar] → [WAITING_FOR_NEW_PROMPT]
  │                                 ↑ (max 3 vezes)
  │                                 └─→ volta [PROCESSING_EDIT]
  └─→ Usuário clica [❌ Cancelar] → [END]

[GENERATING_CAPTION]
  ↓
[SHOWING_OPTIONS]
  ├─→ [📸 Postar Instagram] → [UPLOADING_CLOUDINARY]
  │                            ↓
  │                        [PUBLISHING_IG]
  │                            ↓
  │                        [RECORDING_AUDIT]
  │                            ↓
  │                        [CONFIRMATION_SUCCESS]
  │                            ↓
  │                        [END]
  │
  ├─→ [💾 Salvar Local] → [UPLOADING_CLOUDINARY]
  │                        ↓
  │                    [RECORDING_AUDIT]
  │                        ↓
  │                    [CONFIRMATION_SAVED]
  │                        ↓
  │                    [END]
  │
  └─→ [✏️ Editar Legenda] → [WAITING_FOR_EDIT]
                             ↓ (usuário edita)
                        [CONFIRMATION_CUSTOM]
                             ↓
                        [UPLOADING_CLOUDINARY]
                             ↓ (idem acima)
```

### B. Exemplo de Registro no Google Sheets

```
| Data | Hora | ChatID | Prompt | Tentativas |
| Legenda | Destino | URL | Status | Custo |

| 27/01/2025 | 14:23 | 123456 | "Deixar mais claro" | 2 |
| "Transforme sua visão..." | Instagram |
| https://instagram.com/p/XXXXX | SUCCESS | $0.42 |

| 27/01/2025 | 14:45 | 123456 | "Tom mais quente" | 3 |
| "A jornada começa com..." | Local |
| https://res.cloudinary.com/... | SAVED | $0.40 |
```

### C. Arquitetura n8n Simplificada

```
Telegram Trigger
    ↓
Get Image File
    ├─→ [PARALELO] ├─→ OpenAI /images/edits
    │               └─→ Gemini 2.5 Flash
    ↓
Convert to Image (normalizar saída)
    ↓
Wait Button: [✅ Aprovar] [🔄 Tentar]
    ↓
IF Aprovar:
    ↓
Claude Sonnet (gerar legenda)
    ↓
Wait Button: [📸 IG] [💾 Local] [✏️ Editar]
    ↓
Cloudinary Upload
    ↓
IF Instagram:
    └─→ Meta Graph API Publish
    └─→ Google Sheets Append
    └─→ Telegram Send (confirmation)

IF Local:
    └─→ Google Sheets Append
    └─→ Telegram Send (link)
```

---

**Documento Final - MVP Completo**
Classified as: `software` | Template: `prd-tmpl.yaml`
Location: `docs/01-REQUIREMENTS/edit-publish-agent-prd.md`
