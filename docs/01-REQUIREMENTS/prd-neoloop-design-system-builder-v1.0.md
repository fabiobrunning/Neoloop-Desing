# PRD - Neoloop Design System Builder v1.0

## 📋 Informações do Documento

| Campo | Valor |
|-------|-------|
| **Produto** | Neoloop Design System Builder |
| **Versão** | 1.0.0 (Revisão Completa) |
| **Data** | 2026-01-24 |
| **Autor** | Fabio Brunning |
| **Revisor** | Aria (Architect Agent) |
| **Status** | 🟢 Aprovado para Desenvolvimento |
| **Tipo** | Aplicação Web SPA (Single Page Application) |
| **Repositório** | https://github.com/fabiobrunning/Neoloop-Design |
| **Changelog** | Corrigido erros ortográficos, adicionados módulos essenciais, especificações técnicas completas |

---

## 🎯 Visão Geral do Produto

### Problema

Criar um design system do zero é um processo demorado e complexo que exige:
- Escolher paletas de cores consistentes
- Definir hierarquia tipográfica e espaçamento
- Selecionar bibliotecas de ícones
- Configurar gráficos e visualizações
- Definir componentes básicos de UI
- Documentar todas as decisões
- Exportar em formato reutilizável

Atualmente, designers e desenvolvedores precisam usar múltiplas ferramentas separadas (Figma, Adobe Color, Google Fonts, bibliotecas de ícones, etc.) e depois integrar tudo manualmente, o que é ineficiente e propenso a erros.

### Solução

**Neoloop Design System Builder** é uma plataforma web profissional e integrada que permite arquitetar design systems completos de forma visual e interativa em um único lugar. O usuário seleciona:

#### Design Tokens (Foundation)
1. **Cores** - Paletas organizadas em 7 colunas temáticas
2. **Tipografia** - Famílias de fontes com variantes
3. **Espaçamento** - Escala de spacing (4px base)
4. **Elevações** - Sistema de shadows
5. **Border Radius** - Escalas de arredondamento
6. **Breakpoints** - Pontos de quebra responsivos

#### Componentes Visuais
7. **Ícones** - Bibliotecas com estilos (outline, solid, bold)
8. **Ícones Sociais** - Logos de plataformas sociais
9. **Gráficos** - Charts (pie, line, bar, area)
10. **Backgrounds** - Estilos de fundo

#### Componentes UI
11. **Buttons** - Estilos de botões
12. **Cards** - Containers de conteúdo
13. **Forms** - Inputs e controles
14. **Checkbox/Toggle** - Seletores on/off
15. **Login** - Templates de autenticação
16. **Sidebar** - Modelos de navegação

#### Efeitos e Comportamentos
17. **Animações** - Efeitos de cursor, loading, transições

Ao final, o sistema exporta toda a configuração em um **arquivo JSON** pronto para ser usado em projetos ou importado em ferramentas de design.

### Proposta de Valor

**Para Designers:**
- ⚡ Acelera criação de design systems de dias para **minutos**
- 🎨 Biblioteca curada de cores, fontes e componentes profissionais
- 📦 Exportação em formato padronizado (JSON + CSS)
- 👁️ Preview visual em tempo real das escolhas
- 🔄 Reutilização via import de configurações salvas

**Para Desenvolvedores:**
- 🔧 Integração fácil com JSON exportado
- 📚 Design tokens prontos como CSS variables
- 🚀 Reduz tempo de setup de projetos
- ♻️ Reutilização entre projetos
- 📐 Grid system e breakpoints definidos

**Para Empresas:**
- 💰 Reduz custos de criação de design systems
- 📐 Padronização visual entre produtos
- ⏱️ Time-to-market mais rápido
- 🎯 Consistência de marca

---

## 👥 Personas e Usuários-Alvo

### Persona 1: Designer de Produto (Primária)

**Perfil:**
- **Nome:** Carolina, 28 anos
- **Cargo:** Product Designer
- **Experiência:** 3-5 anos em design de interfaces
- **Ferramentas:** Figma, Adobe XD, Sketch

**Objetivos:**
- Criar design systems rapidamente para novos projetos
- Manter consistência visual entre produtos
- Exportar decisões de design para documentação
- Testar diferentes combinações de cores e tipografia

**Dores:**
- Demora muito tempo para montar design system do zero
- Difícil escolher cores que funcionem bem juntas
- Precisa consultar múltiplas fontes para ícones
- Falta de preview integrado das escolhas

**Como o produto ajuda:**
- Interface visual intuitiva para seleção rápida
- Cores pré-curadas e organizadas por tom
- Preview em tempo real
- Exportação JSON para Figma/documentação

### Persona 2: Desenvolvedor Frontend (Secundária)

**Perfil:**
- **Nome:** Rafael, 32 anos
- **Cargo:** Frontend Developer
- **Experiência:** 5+ anos com React/TypeScript
- **Ferramentas:** VS Code, React, Tailwind CSS

**Objetivos:**
- Implementar design systems rapidamente
- Ter design tokens CSS prontos para usar
- Integrar com bibliotecas existentes
- Reutilizar configurações entre projetos

**Dores:**
- Design handoff incompleto ou inconsistente
- Precisa traduzir manualmente Figma para código
- Falta de padronização de componentes
- Retrabalho ao mudar decisões de design

**Como o produto ajuda:**
- Exportação em JSON + CSS variables
- Design tokens prontos para produção
- Mapeamento direto entre UI e configuração
- Reutilização via import de JSON

### Persona 3: Gerente de Produto (Terciária)

**Perfil:**
- **Nome:** Marcela, 35 anos
- **Cargo:** Product Manager
- **Experiência:** 7+ anos em gestão de produtos digitais

**Objetivos:**
- Acelerar time-to-market de novos produtos
- Garantir consistência de marca
- Reduzir custos de design/desenvolvimento
- Facilitar handoff design-dev

**Dores:**
- Criação de design systems demora demais
- Falta de alinhamento entre design e dev
- Custos altos de ferramentas separadas
- Difícil manter padrões entre produtos

**Como o produto ajuda:**
- Reduz tempo de criação drasticamente
- Padronização automática
- Ferramenta única integrada
- Facilita colaboração entre times

---

## 🎯 Objetivos do Produto

### Objetivos de Negócio

| Objetivo | Métrica | Meta (6 meses) | Como Medir |
|----------|---------|----------------|------------|
| Adoção | Crescimento MoM | 20% mensal | Google Analytics |
| Engajamento | Média DS/usuário | 5 design systems | Database tracking |
| Retenção | D7 Retention | 40%+ | Cohort analysis |
| Conversão | Taxa de export completo | 60%+ | Funnel tracking |
| Performance | Time to First Export | < 10 minutos | Event tracking |
| Qualidade | NPS (Net Promoter Score) | > 50 | Surveys |

### Objetivos de Usuário

**Designers:**
- ✅ Criar design system completo em menos de 10 minutos
- ✅ Experimentar múltiplas combinações visualmente
- ✅ Exportar e importar configurações
- ✅ Usar templates pré-prontos como base

**Desenvolvedores:**
- ✅ Importar JSON e ter tokens CSS prontos
- ✅ Integrar com React/TypeScript facilmente
- ✅ Reutilizar configurações entre projetos
- ✅ Ter documentação clara de uso

**Empresas:**
- ✅ Reduzir custos de criação de design systems
- ✅ Padronizar identidade visual
- ✅ Acelerar entrega de produtos

---

## ✨ Funcionalidades Principais

### Módulo 1: Design Tokens - Cores 🎨

**Descrição:**
Interface visual para selecionar cores de uma paleta pré-curada e organizada.

**Requisitos Funcionais:**

**RF-001:** Sistema deve exibir paleta de cores organizadas em 7 colunas temáticas
- Coluna 1: Tons de vermelho/rosa (10 cores)
- Coluna 2: Tons de laranja/amarelo (10 cores)
- Coluna 3: Tons de verde (10 cores)
- Coluna 4: Tons de teal/ciano (10 cores)
- Coluna 5: Tons de azul/índigo (10 cores)
- Coluna 6: Tons de roxo/violeta (10 cores)
- Coluna 7: Tons de branco, cinzas ao preto (10 cores)

**RF-002:** Cada cor deve ter:
- Nome descritivo (ex: "Coral", "Hortelã", "Cobalto")
- Código hexadecimal (ex: #FF453A)
- Identificador único (ex: c1-4)
- Agrupamento por tom/coluna
- **NOVO:** Indicador de contraste WCAG AA (4.5:1 mínimo)

**RF-003:** Usuário pode selecionar múltiplas cores clicando sobre elas

**RF-004:** Cores selecionadas devem ter indicação visual clara:
- RF-004.1: Checkmark sobre item selecionado
- RF-004.2: Borda destacada (3px, cor primária)
- RF-004.3: Badge com número de itens selecionados
- RF-004.4: Animação suave de seleção (150ms)
- RF-004.5: Contador no header do módulo "X cores selecionadas"

**RF-005:** Usuário pode desselecionar cores clicando novamente

**RF-006:** Sistema deve manter estado de seleção entre navegação de abas

**RF-007:** **NOVO:** Exportar cores como CSS variables:
```css
--color-primary: #FF453A;
--color-secondary: #32ADE6;
/* ... */
```

**Critérios de Aceitação:**
- [ ] 70 cores disponíveis (7 colunas × 10 cores)
- [ ] Seleção/desseleção funciona corretamente
- [ ] Indicação visual clara de selecionadas
- [ ] Estado persiste ao navegar entre módulos
- [ ] Contador de seleções atualiza em tempo real
- [ ] Exporta CSS variables corretas

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 2: Design Tokens - Tipografia 📝

**Descrição:**
Interface para escolher famílias de fontes e suas variantes.

**Requisitos Funcionais:**

**RF-010:** Sistema deve oferecer 8 famílias de fontes:
1. Neue Einstellung
2. Playfair Display (serif elegante)
3. Roboto Mono (monospace)
4. PT Sans (sans-serif legível)
5. Barlow (sans-serif condensado)
6. Sarala (sans-serif arredondado)
7. Monda (sans-serif geométrico)
8. Jura

**RF-011:** Cada fonte deve ter 5 variantes disponíveis:
- Light (peso 300)
- Regular (peso 400)
- Medium (peso 500)
- Bold (peso 700)
- Italic (estilo itálico)

**RF-012:** Usuário pode selecionar uma ou mais famílias de fontes

**RF-013:** Para cada família, usuário pode selecionar quais variantes deseja incluir

**RF-014:** Preview visual deve mostrar cada fonte em seu estilo real com a palavra "Neoloop"

**RF-015:** Sistema deve carregar fontes do Google Fonts dinamicamente:
- **RF-015.1:** Estratégia: Link tag no `<head>` com preload
- **RF-015.2:** Fallback: System fonts (Arial, Georgia, Courier)
- **RF-015.3:** CDN: Google Fonts CDN (com self-hosting como opção v1.1)
- **RF-015.4:** Subsets: latin, latin-ext
- **RF-015.5:** Otimização: `font-display: swap` para evitar FOIT
- **RF-015.6:** GDPR: Aviso ao usuário sobre conexão ao Google

**RF-016:** **NOVO:** Exportar escala tipográfica:
```css
--font-family-primary: 'Neue Einstellung', Arial, sans-serif;
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

**Critérios de Aceitação:**
- [ ] 8 famílias de fontes disponíveis
- [ ] 5 variantes por família funcionam
- [ ] Preview renderiza fonte correta do Google Fonts
- [ ] Fallback funciona se Google Fonts falha
- [ ] Usuário pode selecionar múltiplas famílias e variantes
- [ ] Estado persiste entre navegação
- [ ] Exporta CSS com escala tipográfica

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 3: Design Tokens - Espaçamento 📏

**NOVO MÓDULO** (já implementado em código, faltava no PRD)

**Descrição:**
Sistema de espaçamento baseado em múltiplos de 4px para consistência visual.

**Requisitos Funcionais:**

**RF-020:** Sistema deve exibir escala de espaçamento pré-definida:
- Base: 4px
- Escala: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128px

**RF-021:** Usuário visualiza cada valor com preview visual (box demonstrativo)

**RF-022:** Exportar como CSS variables:
```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
--spacing-32: 8rem;     /* 128px */
```

**Prioridade:** 🔴 Alta (Design Token essencial)

---

### Módulo 4: Design Tokens - Elevações (Shadows) ☁️

**NOVO MÓDULO** (já implementado em código, faltava no PRD)

**Descrição:**
Sistema de sombras para criar hierarquia visual e depth.

**Requisitos Funcionais:**

**RF-030:** Sistema deve oferecer 7 níveis de elevação:
- xs: Muito sutil
- sm: Leve
- md: Médio (padrão)
- lg: Grande
- xl: Extra grande
- 2xl: Máximo
- inner: Sombra interna

**RF-031:** Preview visual de cada elevação (card com sombra aplicada)

**RF-032:** Exportar como CSS variables:
```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
```

**Prioridade:** 🔴 Alta (Design Token essencial)

---

### Módulo 5: Design Tokens - Border Radius 🔘

**NOVO MÓDULO** (já implementado em código, faltava no PRD)

**Descrição:**
Escala de arredondamento de bordas para componentes.

**Requisitos Funcionais:**

**RF-040:** Sistema deve oferecer 8 valores de radius:
- none: 0
- sm: 4px
- md: 6px (padrão)
- lg: 8px
- xl: 12px
- 2xl: 16px
- 3xl: 24px
- full: 9999px (círculo)

**RF-041:** Preview visual de cada valor (quadrado com radius aplicado)

**RF-042:** Exportar como CSS variables:
```css
--radius-none: 0;
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-full: 9999px;
```

**Prioridade:** 🔴 Alta (Design Token essencial)

---

### Módulo 6: Design Tokens - Breakpoints 📱

**NOVO MÓDULO** (já implementado em código, faltava no PRD)

**Descrição:**
Pontos de quebra para design responsivo.

**Requisitos Funcionais:**

**RF-050:** Sistema deve definir 5 breakpoints padrão:
- sm: 640px (mobile landscape)
- md: 768px (tablet)
- lg: 1024px (desktop)
- xl: 1280px (desktop large)
- 2xl: 1536px (desktop extra large)

**RF-051:** Exportar como CSS variables e media queries:
```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;

/* Media Queries Helpers */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
```

**Prioridade:** 🔴 Alta (Design Token essencial)

---

### Módulo 7: Ícones 🔷

**Descrição:**
Seletor de ícones de bibliotecas profissionais, organizados por categorias.

**Requisitos Funcionais:**

**RF-060:** Sistema deve usar 3 bibliotecas de ícones do Figma:
1. **10.000 Free Icons** (Open Source Icon set)
2. **6.000+ UI Icons** (Modern Interfaces)
3. **Iconly V3.0** (Free + Pro)

**RF-061:** Ícones devem ser organizados em 10 categorias mínimas:
- **Interface:** Home, Settings, Search, Menu, Help, Notification, Trash, Plus, Minus, Logout (10+)
- **Financeiro:** Wallet, Coins, Card, Bank, TrendUp, TrendDown, Calculator, Dollar (8+)
- **Comunicação:** Email, Phone, Message, Chat, VideoCall (5+)
- **Mídia:** Play, Pause, Stop, Volume, Camera (5+)
- **Navegação:** Arrows, Home, Back, Forward (4+)
- **Arquivo:** Document, Folder, Download, Upload (4+)
- **Edição:** Edit, Copy, Paste, Cut (4+)
- **Status:** Success, Error, Warning, Info (4+)
- **Tempo:** Clock, Calendar, Alarm (3+)
- **Usuário:** Profile, Users, Login, Logout (4+)

**RF-062:** Usuário pode filtrar ícones por categoria

**RF-063:** Usuário pode selecionar múltiplos ícones de diferentes categorias

**RF-064:** Cada ícone disponível em 3 estilos:
- **Outline:** Linha fina (stroke 1-2px)
- **Bold:** Linha grossa (stroke 3-4px)
- **Solid:** Preenchido

**RF-064.1:** **NOVO:** Especificar formato de ícones:
- **Fonte primária:** SVG exportados do Figma
- **Biblioteca código (opcional):** Lucide React 0.562.0
- **Processo:** Exportar SVG do Figma → Otimizar → Usar inline ou como React component

**RF-065:** Sistema deve exibir preview visual de cada ícone

**RF-066:** **NOVO:** Busca por nome de ícone

**RF-067:** Exportar ícones como:
```json
{
  "icons": {
    "interface": {
      "home": {
        "outline": "<svg>...</svg>",
        "bold": "<svg>...</svg>",
        "solid": "<svg>...</svg>"
      }
    }
  }
}
```

**Critérios de Aceitação:**
- [ ] 50+ ícones disponíveis (mínimo)
- [ ] 10 categorias organizadas
- [ ] 3 estilos funcionam corretamente
- [ ] Filtro por categoria funciona
- [ ] Busca por nome funciona
- [ ] Preview visual renderiza corretamente
- [ ] SVG exportado é otimizado (< 2KB cada)

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 8: Ícones Sociais (Logos) 📱

**Descrição:**
Seletor de ícones de redes sociais e métodos de pagamento com logos exatas das marcas.

**Requisitos Funcionais:**

**RF-070:** Sistema deve oferecer ícones de 25+ plataformas:

**Redes Sociais:**
- Facebook, Instagram, X (Twitter), LinkedIn, YouTube
- GitHub, TikTok, WhatsApp, Messenger, Twitch
- Spotify, Signal, Telegram, Tumblr, Discord
- Reddit, Figma, Threads, Pinterest, Snapchat
- Tinder

**Empresas/Brands:**
- Apple, Google

**Métodos de Pagamento:**
- Mastercard, Visa, American Express
- Apple Pay, Google Pay, PicPay, PayPal

**RF-071:** Cada ícone social deve ter 3 estilos:
- **Original:** Cores da marca oficial
- **Dark:** Versão monocromática escura
- **Light:** Versão monocromática clara/outline

**RF-072:** Usuário pode selecionar múltiplas plataformas

**RF-073:** Para cada plataforma, usuário escolhe qual estilo usar

**RF-074:** Preview deve mostrar ícone com cores corretas da marca

**RF-075:** Sistema deve incluir paths SVG de cada logo (fonte: Social Network Icons 2023 Community Figma)

**RF-076:** Logos devem ser **exatamente** como as marcas oficiais (branding accuracy)

**Critérios de Aceitação:**
- [ ] 25+ plataformas sociais e pagamento disponíveis
- [ ] 3 estilos funcionam corretamente para cada plataforma
- [ ] Cores da marca são precisas (ex: Facebook #1877F2, Instagram gradient)
- [ ] Usuário pode selecionar múltiplas plataformas e estilos
- [ ] Preview visual renderiza corretamente

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 9: Gráficos (Charts) 📊

**Descrição:**
Interface para escolher tipos de gráficos/charts para o design system.

**Requisitos Funcionais:**

**RF-080:** Sistema deve oferecer 4 tipos de gráficos baseados em Circle Charts e T Charts Communities:

1. **Pie Chart (Pizza):**
   - Hollow (oco/donut)
   - Simple (simples/completo)

2. **Line Chart (Linha):**
   - Simple (linha simples)
   - Area (área preenchida)

3. **Bar Chart (Barras):**
   - Vertical
   - Horizontal
   - Stacked (empilhado)

4. **Area Chart (Área):**
   - Simple
   - Stacked

**RF-081:** Usuário pode selecionar múltiplos tipos de gráficos

**RF-082:** Para cada tipo, usuário escolhe variação (vertical, horizontal, stacked, etc.)

**RF-083:** Preview deve mostrar exemplo visual de cada gráfico com dados demo

**RF-084:** Dados de exemplo devem ser significativos e visuais

**RF-085:** Gráficos devem usar biblioteca Recharts 3.7.0 (React)

**Critérios de Aceitação:**
- [ ] 4 tipos de gráficos disponíveis com variações
- [ ] Preview renderiza usando Recharts
- [ ] Gráficos são visualmente claros e bonitos
- [ ] Usuário pode selecionar múltiplos gráficos
- [ ] Estado persiste entre navegação
- [ ] Exporta configuração de cada gráfico

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 10: Backgrounds 🎨

**Descrição:**
Seletor de estilos de fundo/background para o design system.

**Requisitos Funcionais:**

**RF-090:** Sistema deve oferecer 6+ estilos de background baseados em Backstage e Black & White Communities:
- Sólido (cores sólidas)
- Gradiente linear
- Gradiente radial
- Pattern (padrões geométricos)
- Textura (texturas sutis)
- Glassmorphism (efeito vidro)

**RF-091:** Usuário pode selecionar múltiplos estilos

**RF-092:** Cada estilo deve ter preview visual realista

**RF-093:** Sistema deve ter classes CSS pré-definidas para cada estilo

**RF-094:** Preview deve mostrar exemplo em card/container

**Critérios de Aceitação:**
- [ ] 6+ estilos de background disponíveis
- [ ] Preview visual claro de cada estilo
- [ ] Usuário pode selecionar múltiplos estilos
- [ ] Classes CSS estão documentadas
- [ ] Estado persiste entre navegação
- [ ] Exporta CSS de backgrounds

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 11: Animações ✨

**Descrição:**
Animações para página, cursor do mouse, e carregamento de página ou funções.

**Requisitos Funcionais:**

**RF-100:** Sistema deve ter 3 categorias de animações:
1. **Cursor/Hover:** Efeitos ao passar mouse
2. **Loading:** Spinners, skeletons, progress bars
3. **Transições:** Fade, slide, scale, rotate

**RF-101:** Cada animação deve ter:
- Nome descritivo
- Descrição curta (uma frase)
- Preview animado
- Duração configurável

**RF-102:** Usuário pode selecionar múltiplas animações

**RF-103:** Exportar como CSS animations:
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn var(--transition-base) var(--transition-ease-in-out);
}
```

**Critérios de Aceitação:**
- [ ] 15+ animações disponíveis
- [ ] 3 categorias organizadas
- [ ] Preview animado funciona
- [ ] Duração configurável
- [ ] Exporta CSS animations

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 12: Checkbox/Toggle 🔘

**Descrição:**
Caixa de seleção On-OFF, sim ou não, botão ligado ou desligado.

**Requisitos Funcionais:**

**RF-110:** Sistema deve oferecer 5+ estilos de checkbox/toggle baseados em Tida Components:
- Checkbox padrão (quadrado)
- Checkbox com label inline
- Toggle switch (iOS-style)
- Radio button
- Checkbox com estados (checked, unchecked, indeterminate)

**RF-111:** Usuário pode selecionar múltiplos estilos

**RF-112:** Cada estilo deve ter preview visual E funcional (interativo)

**RF-113:** Sistema deve ter componentes React pré-definidos

**RF-114:** Preview deve mostrar estados: default, hover, focused, disabled

**Critérios de Aceitação:**
- [ ] 5+ estilos disponíveis
- [ ] Preview funcional (clicável)
- [ ] 4 estados visíveis (default, hover, focus, disabled)
- [ ] Componente React exportável
- [ ] Acessível (ARIA, keyboard navigation)

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 13: Login Templates 🔐

**Descrição:**
Biblioteca com modelos de área para login de sistemas.

**Requisitos Funcionais:**

**RF-120:** Sistema deve oferecer 8+ modelos de página de login baseados em "20 Screen Login & Register Mobile App Community":
- Login simples (email + senha)
- Login com social (Google, Facebook, Apple)
- Login com foto de perfil
- Login com ilustração
- Login dark mode
- Login com background gradient
- Tela de registro
- Recuperação de senha

**RF-121:** Usuário pode escolher **um** modelo de página de login por projeto

**RF-122:** Preview deve mostrar exemplo realista (não apenas wireframe)

**RF-123:** Preview deve adaptar cores do design system selecionado

**RF-124:** Exportar como:
- Screenshot de referência
- HTML/CSS base
- React component (opcional v1.1)

**Critérios de Aceitação:**
- [ ] 8+ templates disponíveis
- [ ] Preview fotorrealista
- [ ] Cores adaptam ao design system
- [ ] Exporta screenshot + HTML base
- [ ] Responsivo (mobile-first)

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 14: Sidebar (Navegação) 📂

**Descrição:**
Biblioteca com modelos de sidebar (menu lateral).

**Requisitos Funcionais:**

**RF-130:** Sistema deve oferecer 6+ modelos de sidebar baseados em "Sidebar Community":
- Sidebar expandida (ícone + texto)
- Sidebar colapsada (somente ícones)
- Sidebar com submenu
- Sidebar com avatar
- Sidebar dark mode
- Sidebar com search
- Bottom navigation (mobile)

**RF-131:** Cada modelo tem **duas variações**:
- Completa: ícone + função/label
- Curta: somente ícones

**RF-132:** Usuário pode escolher **um** modelo por projeto

**RF-133:** Preview deve mostrar:
- Estado expandido e colapsado
- Interação (hover, active)
- Submenu (se aplicável)

**RF-134:** Preview deve adaptar cores do design system

**Critérios de Aceitação:**
- [ ] 6+ modelos disponíveis
- [ ] 2 variações (expandida/colapsada) por modelo
- [ ] Preview interativo (expandir/colapsar)
- [ ] Cores adaptam ao design system
- [ ] Exporta HTML/CSS base

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 15: Buttons **NOVO** 🔲

**Descrição:**
Estilos de botões fundamentais para qualquer UI.

**Requisitos Funcionais:**

**RF-140:** Sistema deve oferecer 6 variantes de botão:
- Primary (ação principal)
- Secondary (ação secundária)
- Outline (borda apenas)
- Ghost (transparente)
- Danger (ações destrutivas)
- Link (texto estilizado)

**RF-141:** Cada variante em 3 tamanhos:
- Small (32px altura)
- Medium (40px altura)
- Large (48px altura)

**RF-142:** Estados obrigatórios:
- Default
- Hover
- Focused
- Disabled
- Loading (com spinner)

**RF-143:** Preview interativo mostrando todos os estados

**RF-144:** Exportar como CSS + React component

**Prioridade:** 🔴 Alta (Componente essencial)

---

### Módulo 16: Cards **NOVO** 📄

**Descrição:**
Containers de conteúdo estruturados.

**Requisitos Funcionais:**

**RF-150:** Sistema deve oferecer 5 tipos de card:
- Basic (borda + padding)
- Elevated (com shadow)
- Outlined (borda destacada)
- Image card (imagem + conteúdo)
- Horizontal card (layout em linha)

**RF-151:** Configurações opcionais:
- Header (título + ações)
- Body (conteúdo principal)
- Footer (ações/meta informações)
- Hover effect

**RF-152:** Preview visual de cada tipo

**RF-153:** Exportar HTML/CSS estruturado

**Prioridade:** 🔴 Alta (Componente essencial)

---

### Módulo 17: Forms/Inputs **NOVO** 📝

**Descrição:**
Componentes de entrada de dados.

**Requisitos Funcionais:**

**RF-160:** Sistema deve oferecer 8 tipos de input:
- Text input (texto simples)
- Text area (múltiplas linhas)
- Select (dropdown)
- Multi-select
- Date picker
- File upload
- Search input
- Password input (com toggle visibilidade)

**RF-161:** Estados obrigatórios:
- Default
- Focused
- Error (com mensagem)
- Success (com mensagem)
- Disabled

**RF-162:** Elementos adicionais:
- Label (obrigatório para acessibilidade)
- Helper text
- Error message
- Character counter

**RF-163:** Preview interativo

**Prioridade:** 🔴 Alta (Componente essencial)

---

### Módulo 18: Exportação JSON 📦

**Descrição:**
Funcionalidade para exportar toda a configuração do design system em formato JSON estruturado.

**Requisitos Funcionais:**

**RF-170:** Sistema deve ter botão "Exportar JSON" sempre visível (toolbar superior)

**RF-171:** Exportação deve gerar estrutura JSON completa:

```json
{
  "neoloop": {
    "version": "1.0.0",
    "metadata": {
      "name": "My Design System",
      "created": "2026-01-24T10:30:00Z",
      "author": "",
      "description": ""
    },
    "tokens": {
      "colors": {
        "primary": "#FF453A",
        "secondary": "#32ADE6"
      },
      "typography": {
        "fontFamily": {
          "primary": "Neue Einstellung",
          "secondary": "Playfair Display"
        },
        "fontSize": {
          "xs": "0.75rem",
          "sm": "0.875rem",
          "base": "1rem"
        }
      },
      "spacing": {
        "0": "0",
        "1": "0.25rem",
        "2": "0.5rem"
      },
      "shadows": {
        "sm": "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)"
      },
      "radius": {
        "none": "0",
        "sm": "0.25rem",
        "md": "0.375rem"
      },
      "breakpoints": {
        "sm": "640px",
        "md": "768px",
        "lg": "1024px"
      }
    },
    "components": {
      "icons": {},
      "socialIcons": {},
      "charts": {},
      "backgrounds": {},
      "buttons": {},
      "cards": {},
      "forms": {}
    },
    "modules": {
      "animations": {},
      "checkbox": {},
      "login": {},
      "sidebar": {}
    }
  }
}
```

**RF-172:** Nome do arquivo: `neoloop-design-system-[timestamp].json`

**RF-173:** Sistema deve validar que pelo menos um elemento foi selecionado antes de exportar

**RF-174:** Feedback visual de sucesso após exportação (toast notification)

**RF-175:** JSON deve ser formatado (pretty-printed) para legibilidade

**RF-176:** **NOVO:** Exportar também como CSS:
- Arquivo `design-tokens.css` com todas as CSS variables
- Arquivo `design-system.json` com estrutura completa

**RF-177:** **NOVO:** Validação de schema JSON antes de export

**Critérios de Aceitação:**
- [ ] Botão de exportar está sempre acessível
- [ ] JSON gerado contém todas as seleções
- [ ] Estrutura do JSON segue schema definido
- [ ] Schema é validado antes do export
- [ ] Arquivo é baixado automaticamente
- [ ] Validação impede exportação vazia
- [ ] Feedback de sucesso é exibido
- [ ] CSS file também é exportado

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 19: Importação JSON **NOVO** 📥

**Descrição:**
Permite importar design system previamente salvo para continuar editando ou compartilhar entre times.

**Requisitos Funcionais:**

**RF-180:** Botão "Importar JSON" no toolbar

**RF-181:** Upload de arquivo JSON

**RF-182:** Validação de formato:
- Schema correto
- Versão compatível
- Campos obrigatórios presentes

**RF-183:** Preview antes de importar:
- Mostrar resumo do design system
- Número de elementos em cada módulo
- Autor e data de criação

**RF-184:** Opções de importação:
- **Sobrescrever:** Substitui sistema atual completamente
- **Mesclar:** Combina com seleções atuais (adiciona novos, mantém existentes)

**RF-185:** Feedback de erro se JSON inválido com detalhes específicos

**Critérios de Aceitação:**
- [ ] Upload funciona (drag & drop + file picker)
- [ ] Validação detecta JSON inválido
- [ ] Preview mostra resumo correto
- [ ] Sobrescrever funciona
- [ ] Mesclar funciona sem conflitos
- [ ] Erro mostra mensagem clara

**Prioridade:** 🟡 Alta (v1.1)

---

### Módulo 20: Navegação entre Módulos 🔀

**Descrição:**
Sistema de navegação para acessar diferentes módulos do builder.

**Requisitos Funcionais:**

**RF-190:** Navegação deve ser por **sidebar vertical à esquerda**

**RF-191:** Sidebar deve listar 17 módulos:
1. Cores (Design Tokens)
2. Tipografia (Design Tokens)
3. Espaçamento (Design Tokens)
4. Elevações (Design Tokens)
5. Border Radius (Design Tokens)
6. Breakpoints (Design Tokens)
7. Ícones
8. Ícones Sociais
9. Gráficos
10. Backgrounds
11. Animações
12. Checkbox/Toggle
13. Login Templates
14. Sidebar
15. Buttons
16. Cards
17. Forms/Inputs

**RF-192:** Cada módulo pode ter sub-menu (colapsar/expandir)

**RF-193:** Módulo ativo deve ter indicação visual clara:
- Background destacado
- Borda/linha à esquerda
- Ícone e texto em cor primária

**RF-194:** Estado de cada módulo deve persistir ao trocar de aba

**RF-195:** Navegação deve ser responsiva:
- Desktop (> 1024px): Sidebar expandida
- Tablet (768-1024px): Sidebar colapsável
- Mobile (< 768px): Bottom navigation OU hambúrguer menu

**RF-196:** Cada módulo deve ter header com:
- Ícone
- Título
- Descrição curta
- Contador de itens selecionados

**RF-197:** **NOVO:** Atalhos de teclado:
- `Tab` / `Shift+Tab`: Navegar entre módulos
- `1-9`: Atalho numérico para módulos principais

**Critérios de Aceitação:**
- [ ] Sidebar exibe 17 módulos
- [ ] Sub-menus expandem/colapsam
- [ ] Indicação visual clara do módulo ativo
- [ ] Estado persiste ao navegar
- [ ] Responsivo em 3 breakpoints
- [ ] Header de módulo completo
- [ ] Atalhos de teclado funcionam

**Prioridade:** 🔴 Alta (Core Feature)

---

### Módulo 21: Preview Global **NOVO** 👁️

**Descrição:**
Visualização consolidada de todo o design system em uma única página.

**Requisitos Funcionais:**

**RF-200:** Página "Preview All" acessível via botão no toolbar

**RF-201:** Exibir todos os módulos selecionados em seções:
- Design Tokens (cores, tipografia, espaçamento, shadows, radius)
- Componentes (ícones, charts, backgrounds)
- UI Components (buttons, cards, forms)
- Templates (login, sidebar)

**RF-202:** Seções colapsáveis para organização

**RF-203:** Exportar preview como:
- **PDF:** Documento completo do design system
- **PNG:** Screenshot de alta resolução
- **HTML:** Página standalone

**RF-204:** Compartilhar preview via link (v1.5 - requer backend)

**RF-205:** Modo apresentação (fullscreen, sem distrações)

**Critérios de Aceitação:**
- [ ] Todas as seleções aparecem no preview
- [ ] Seções organizadas e colapsáveis
- [ ] Export PDF funciona
- [ ] Export PNG funciona
- [ ] Export HTML funciona
- [ ] Modo fullscreen funciona

**Prioridade:** 🟡 Alta (v1.1)

---

### Módulo 22: Onboarding/Tutorial **NOVO** 🎓

**Descrição:**
Guia interativo para novos usuários aprenderem a usar o produto.

**Requisitos Funcionais:**

**RF-210:** Tour guiado ao abrir pela primeira vez (detectar via localStorage)

**RF-211:** 5 passos principais:
1. Bem-vindo ao Neoloop
2. Navegação: Conheça os módulos
3. Seleção: Como escolher elementos
4. Preview: Veja seu design system
5. Export: Salve seu trabalho

**RF-212:** Destacar funcionalidades com tooltips e overlays

**RF-213:** Exemplo pré-preenchido para exploração (template "Demo")

**RF-214:** Opção "Pular tutorial" sempre visível

**RF-215:** Replay do tutorial via menu "Ajuda"

**RF-216:** Progress bar mostrando passo atual (ex: "3/5")

**Critérios de Aceitação:**
- [ ] Tutorial aparece na primeira visita
- [ ] 5 passos completos e claros
- [ ] Destaque visual funciona
- [ ] Template demo carrega
- [ ] "Pular" funciona
- [ ] Replay funciona

**Prioridade:** 🟢 Média (v1.1)

---

### Módulo 23: Templates Pré-Prontos **NOVO** 📚

**Descrição:**
Galeria de design systems prontos como ponto de partida.

**Requisitos Funcionais:**

**RF-220:** Galeria com 5+ templates:
- **Material Design:** Inspirado no Google Material
- **iOS Style:** Estilo Apple Human Interface Guidelines
- **Minimalist:** Clean e minimalista
- **Corporate:** Profissional e sério
- **Vibrant:** Colorido e moderno

**RF-221:** Preview de cada template (screenshot + descrição)

**RF-222:** Importar template como base:
- Carrega todas as seleções do template
- Usuário pode modificar livremente
- Não afeta template original

**RF-223:** Salvar template customizado (v1.5 - requer backend)

**RF-224:** Tags/filtros: "Modern", "Colorful", "Professional", etc.

**Critérios de Aceitação:**
- [ ] 5+ templates disponíveis
- [ ] Preview fotorrealista
- [ ] Importar template funciona
- [ ] Templates bem projetados
- [ ] Filtros funcionam

**Prioridade:** 🟡 Alta (v1.1)

---

### Módulo 24: Persistência de Estado **NOVO** 💾

**Descrição:**
Auto-save e recuperação de sessões para evitar perda de trabalho.

**Requisitos Funcionais:**

**RF-230:** Auto-save no localStorage a cada 30 segundos

**RF-231:** Recuperar sessão automaticamente ao recarregar página

**RF-232:** Indicador visual de "Salvo" / "Salvando..." no toolbar

**RF-233:** Limpar sessão manualmente via menu

**RF-234:** Histórico de sessões (últimas 5):
- Nome da sessão (editable)
- Data/hora
- Thumbnail (miniatura do preview)

**RF-235:** Carregar sessão anterior via modal "Sessões Salvas"

**RF-236:** Confirmação antes de sobrescrever sessão atual

**Critérios de Aceitação:**
- [ ] Auto-save funciona a cada 30s
- [ ] Recupera ao reload sem perda
- [ ] Indicador de status funciona
- [ ] Limpar sessão funciona
- [ ] Histórico mostra 5 últimas
- [ ] Carregar sessão funciona
- [ ] Confirmação previne perda acidental

**Prioridade:** 🔴 Alta (Mudado de v2.0 para v1.0)

**Justificativa:** Perder trabalho é frustração crítica de UX, não pode ser premium.

---

### Módulo 25: Search & Keyboard Shortcuts **NOVO** ⌨️

**Descrição:**
Busca global e atalhos de teclado para produtividade.

**Requisitos Funcionais:**

**RF-240:** Busca global (atalho: `/`):
- Buscar cores por nome ou hex
- Buscar fontes por nome
- Buscar ícones por nome ou categoria
- Buscar componentes

**RF-241:** Resultados da busca exibem:
- Nome do item
- Categoria/módulo
- Preview visual (se aplicável)
- Ação: "Ir para módulo" ou "Selecionar"

**RF-242:** Atalhos de teclado:

| Atalho | Ação |
|--------|------|
| `/` | Abrir busca global |
| `?` | Abrir ajuda/atalhos |
| `Ctrl/Cmd + E` | Exportar JSON |
| `Ctrl/Cmd + I` | Importar JSON |
| `Ctrl/Cmd + Z` | Desfazer |
| `Ctrl/Cmd + Y` | Refazer |
| `Ctrl/Cmd + P` | Preview global |
| `Esc` | Fechar modal/busca |
| `Tab` / `Shift+Tab` | Navegar módulos |

**RF-243:** Modal de ajuda (`?`) listando todos os atalhos

**RF-244:** Highlight de atalhos em tooltips (ex: "Exportar (Ctrl+E)")

**Critérios de Aceitação:**
- [ ] Busca global funciona com `/`
- [ ] Busca em todos os módulos
- [ ] Resultados relevantes
- [ ] 9 atalhos de teclado funcionam
- [ ] Modal de ajuda completo
- [ ] Tooltips mostram atalhos

**Prioridade:** 🟢 Média (v1.1)

---

### Módulo 26: Undo/Redo **NOVO** ↩️

**Descrição:**
Histórico de ações para desfazer/refazer mudanças.

**Requisitos Funcionais:**

**RF-250:** Histórico de até 50 ações

**RF-251:** Ações rastreadas:
- Selecionar/desselecionar item
- Trocar de módulo
- Importar template
- Limpar seleções

**RF-252:** Atalhos: `Ctrl/Cmd + Z` (undo), `Ctrl/Cmd + Y` (redo)

**RF-253:** Indicação visual:
- Botões undo/redo no toolbar
- Disabled se não há ações para desfazer/refazer
- Tooltip mostra última ação (ex: "Desfazer: Seleção de cor")

**RF-254:** Limpar histórico ao importar novo design system

**Critérios de Aceitação:**
- [ ] Undo funciona (até 50 ações)
- [ ] Redo funciona
- [ ] Atalhos de teclado funcionam
- [ ] Botões desabilitam corretamente
- [ ] Tooltip mostra ação
- [ ] Histórico limpa ao importar

**Prioridade:** 🟢 Média (v1.1)

---

## 🏗️ Arquitetura Técnica

### Stack Tecnológico

**Frontend:**
- **Framework:** React 19.2.3
- **Language:** TypeScript 5.8.2
- **Build Tool:** Vite 6.2.0
- **State Management:** Context API + useReducer (v1.0), Zustand (v1.5+)
- **Ícones:** SVG do Figma + Lucide React 0.562.0 (híbrido)
- **Gráficos:** Recharts 3.7.0
- **AI Integration:** Google Gemini API (@google/genai 1.38.0) - v2.0

**Infraestrutura:**
- **Hospedagem:** Vercel (recomendado)
- **CI/CD:** GitHub Actions
- **Versionamento:** Git / GitHub
- **Analytics:** PostHog (open source, GDPR-friendly) - v1.1

### Estrutura de Arquivos

```
neoloop-design/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   └── ModuleContainer.tsx
│   │   ├── modules/
│   │   │   ├── ColorSelector.tsx
│   │   │   ├── TypographySelector.tsx
│   │   │   ├── SpacingTokens.tsx        # NOVO
│   │   │   ├── ShadowsTokens.tsx         # NOVO
│   │   │   ├── RadiusTokens.tsx          # NOVO
│   │   │   ├── BreakpointsTokens.tsx     # NOVO
│   │   │   ├── IconSelector.tsx
│   │   │   ├── SocialIconSelector.tsx
│   │   │   ├── ChartSelector.tsx
│   │   │   ├── BackgroundSelector.tsx
│   │   │   ├── AnimationSelector.tsx
│   │   │   ├── CheckboxSelector.tsx
│   │   │   ├── LoginTemplates.tsx
│   │   │   ├── SidebarTemplates.tsx
│   │   │   ├── ButtonSelector.tsx        # NOVO
│   │   │   ├── CardSelector.tsx          # NOVO
│   │   │   └── FormSelector.tsx          # NOVO
│   │   ├── shared/
│   │   │   ├── ModuleHeader.tsx
│   │   │   ├── SelectableGrid.tsx        # NOVO
│   │   │   ├── PreviewPanel.tsx          # NOVO
│   │   │   ├── SearchBar.tsx             # NOVO
│   │   │   └── ExportModal.tsx           # NOVO
│   │   ├── onboarding/
│   │   │   ├── Tutorial.tsx              # NOVO
│   │   │   └── WelcomeModal.tsx          # NOVO
│   │   └── templates/
│   │       └── TemplateGallery.tsx       # NOVO
│   ├── context/
│   │   ├── DesignSystemContext.tsx       # NOVO
│   │   └── DesignSystemProvider.tsx      # NOVO
│   ├── hooks/
│   │   ├── useAutoSave.ts                # NOVO
│   │   ├── useKeyboardShortcuts.ts       # NOVO
│   │   └── useUndoRedo.ts                # NOVO
│   ├── utils/
│   │   ├── exportJSON.ts
│   │   ├── importJSON.ts                 # NOVO
│   │   ├── validateSchema.ts             # NOVO
│   │   └── exportCSS.ts                  # NOVO
│   ├── types/
│   │   ├── design-system.ts
│   │   └── schema.ts                     # NOVO
│   ├── constants/
│   │   ├── colors.tsx
│   │   ├── typography.tsx
│   │   ├── spacing.ts                    # NOVO
│   │   ├── shadows.ts                    # NOVO
│   │   ├── radius.ts                     # NOVO
│   │   ├── breakpoints.ts                # NOVO
│   │   ├── icons.tsx
│   │   ├── social-icons.tsx
│   │   ├── charts.tsx
│   │   ├── backgrounds.tsx
│   │   ├── animations.tsx
│   │   ├── checkboxes.tsx
│   │   ├── loginTemplates.tsx
│   │   ├── sidebarTemplates.tsx
│   │   ├── buttons.tsx                   # NOVO
│   │   ├── cards.tsx                     # NOVO
│   │   └── forms.tsx                     # NOVO
│   ├── App.tsx
│   └── main.tsx
├── public/
│   ├── icons/                            # SVGs do Figma
│   ├── templates/                        # Templates screenshots
│   └── preview/                          # Preview images
├── docs/
│   ├── 01-REQUIREMENTS/
│   │   ├── prd-neoloop-design-system-builder-v1.0.md  # Este arquivo
│   │   └── analise-prd-pontos-melhoria.md
│   ├── 02-DESIGN/
│   ├── 03-ARCHITECTURE/
│   └── 04-IMPLEMENTATION/
├── .github/
│   └── workflows/
│       └── ci.yml                        # CI/CD Pipeline
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Tipos TypeScript

```typescript
// src/types/design-system.ts

export interface DesignSystemState {
  // Design Tokens
  colors: ColorItem[];
  typography: TypographySelection;
  spacing: SpacingTokens;          // NOVO
  shadows: ShadowTokens;            // NOVO
  radius: RadiusTokens;             // NOVO
  breakpoints: Breakpoints;         // NOVO

  // Visual Components
  icons: IconSelection;
  socialIcons: SocialIconSelection;
  charts: ChartSelection;
  backgrounds: BackgroundSelection;

  // UI Components
  buttons: ButtonSelection;         // NOVO
  cards: CardSelection;             // NOVO
  forms: FormSelection;             // NOVO

  // Modules
  animations: AnimationSelection;
  checkbox: CheckboxSelection;
  login: LoginSelection;
  sidebar: SidebarSelection;
}

export interface ColorItem {
  id: string;
  name: string;
  hex: string;
  tone: string;
  contrast?: number;                // NOVO: WCAG contrast ratio
}

export interface TypographySelection {
  families: {
    family: string;
    variants: string[];
  }[];
  scale: TypographyScale;           // NOVO
}

export interface TypographyScale {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface SpacingTokens {          // NOVO
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
  '6': string;
  '8': string;
  '10': string;
  '12': string;
  '16': string;
  '20': string;
  '24': string;
  '32': string;
}

export interface ShadowTokens {           // NOVO
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

export interface RadiusTokens {           // NOVO
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

export interface Breakpoints {            // NOVO
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// ... outros types
```

### Fluxo de Dados

```
User Interaction
      ↓
Event Handler (onClick, onChange)
      ↓
Context Action (dispatch)
      ↓
Reducer (update state)
      ↓
Auto-save (localStorage - 30s debounce)
      ↓
Re-render Components
      ↓
Update Preview
      ↓
Export JSON/CSS (on demand)
```

### State Management

**Arquitetura v1.0:**
```typescript
// Context API + useReducer
<DesignSystemProvider>
  <App />
</DesignSystemProvider>

// hooks/useDesignSystem.ts
const { state, dispatch } = useDesignSystem();

dispatch({
  type: 'SELECT_COLOR',
  payload: { id: 'c1-4', name: 'Coral', hex: '#FF453A' }
});
```

**Migração v1.5 (se necessário):**
- Zustand para state mais complexo
- Persist middleware para localStorage
- DevTools para debugging

---

## 🎨 Design e UX

### Princípios de Design

1. **Clareza Visual:** Interface limpa e organizada
2. **Feedback Imediato:** Preview em tempo real
3. **Eficiência:** Fluxo rápido (< 10 min para criar DS)
4. **Consistência:** Padrões visuais uniformes
5. **Acessibilidade:** Contraste WCAG AA, navegação por teclado

### Layout Principal

```
┌─────────────────────────────────────────────────────────┐
│  Toolbar: [Logo] [Import] [Export] [Preview] [Help]    │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ Sidebar  │  Module Content                             │
│ (Módulos)│  ┌─────────────────────────┐                │
│          │  │  Module Header          │                │
│ - Cores  │  │  "Cores - 5 selecionadas"│               │
│ - Tipo   │  └─────────────────────────┘                │
│ - Icons  │                                              │
│ - ...    │  [Grid de itens selecionáveis]             │
│          │                                              │
│          │  [Preview Panel - direita flutuante]       │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

### Responsividade

**Desktop (> 1024px):**
- Sidebar expandida (250px)
- Content área: 70%
- Preview panel: 30% (flutuante à direita)

**Tablet (768-1024px):**
- Sidebar colapsável (60px collapsed, 250px expanded)
- Content área: 100%
- Preview panel: Modal overlay

**Mobile (< 768px):**
- Bottom navigation (tabs principais)
- Content área: 100%
- Preview panel: Fullscreen modal
- Grid adaptável: 7 cols → 4 cols → 2 cols (cores)

### Cores da Interface

**Tema Principal:**
- Primary: #FFFFFF (branco)
- Secondary: #808080 (cinza médio)
- Cards: #595858 (cinza escuro)
- Accent: #FF453A (coral - ações primárias)
- Success: #32ADE6 (azul)
- Error: #FF3B30 (vermelho)

**Dark Mode (v1.5):**
- Background: #1A1A1A
- Cards: #2A2A2A
- Text: #FFFFFF

---

## 🚧 Riscos e Mitigações

### Riscos Técnicos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Google Fonts não carregam** | Média | Alto | Fallback para system fonts + preload + retry logic |
| **Bundle size > 500KB** | Alta | Alto | Code splitting por módulo, lazy loading, tree shaking, Vite optimization |
| **Performance ruim em mobile** | Média | Alto | Memoization (React.memo), virtualization para listas longas, otimizar re-renders |
| **localStorage quota exceeded** | Baixa | Médio | Compressão do JSON (LZ-string), limpar sessões antigas, IndexedDB como backup |
| **SVG ícones pesados** | Média | Médio | Otimizar SVGs (SVGO), lazy load ícones, CDN para assets |

### Riscos de Produto

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Usuários não entendem proposta** | Média | Alto | Tutorial interativo obrigatório, onboarding guiado, vídeos demo |
| **Falta de adoção inicial** | Média | Alto | Product Hunt launch, comunidades design (Dribbble, Behance), content marketing |
| **JSON exportado não é útil** | Baixa | Alto | Validar com usuários beta, templates de integração, documentação clara |
| **Competição de tools gratuitos** | Alta | Médio | Diferenciação: UX superior, templates prontos, all-in-one |

### Riscos de Negócio

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Custos de hospedagem** | Baixa | Baixo | Vercel free tier suficiente (100GB bandwidth), otimizar bundle |
| **Dependência Google Fonts** | Média | Médio | Self-hosting de fontes mais populares (v1.5) |
| **Dependência bibliotecas Figma** | Baixa | Médio | Exportar SVGs e hospedar localmente |

---

## 🔐 Segurança e Privacidade

### Requisitos de Segurança

**RS-001:** Sistema não deve armazenar dados pessoais do usuário (v1.0 é client-side apenas)

**RS-002:** JSON exportado deve ser gerado 100% client-side (não enviar para servidor)

**RS-003:** localStorage deve usar namespace isolado: `neoloop_ds_*`

**RS-004:** Não há autenticação na v1.0 (público e anônimo)

**RS-005:** Código deve seguir OWASP Top 10 guidelines:
- Sem eval() ou innerHTML inseguro
- Sanitização de inputs (se houver)
- CSP (Content Security Policy) headers
- HTTPS obrigatório em produção

**RS-006:** **NOVO:** Import JSON deve validar schema antes de processar (prevenir XSS via JSON malicioso)

### Privacidade

**RP-001:** Não coleta dados pessoais identificáveis

**RP-002:** Analytics (PostHog) deve ser:
- Anônimo (sem cookies de terceiros)
- IP anonimizado
- Opt-out disponível
- LGPD/GDPR compliant

**RP-003:** Google Fonts:
- Aviso ao usuário sobre conexão ao Google
- Opção de self-hosting (v1.5)

**RP-004:** JSON exportado permanece no dispositivo do usuário (download local)

---

## ♿ Acessibilidade

### Requisitos WCAG 2.1 AA

**RA-001:** Contraste de cores mínimo 4.5:1 para texto normal
- **NOVO:** Indicador de contraste ao selecionar cor no módulo de cores

**RA-002:** Contraste de cores mínimo 3:1 para elementos interativos (botões, borders)

**RA-003:** Navegação por teclado completa:
- Tab: Navegar entre elementos
- Enter/Space: Selecionar item
- Esc: Fechar modal
- Atalhos documentados no modal de ajuda (`?`)

**RA-004:** Screen reader friendly:
- ARIA labels em todos os botões e controles
- ARIA live regions para feedback dinâmico
- Estrutura semântica HTML (`<nav>`, `<main>`, `<section>`)

**RA-005:** Foco visível em elementos interativos:
- Outline de 3px sólido
- Cor de contraste alto
- Nunca usar `outline: none` sem substituição

**RA-006:** Textos alternativos:
- Alt text em ícones decorativos: `alt=""`
- ARIA labels em ícones funcionais
- Títulos descritivos em SVGs

**RA-007:** Sem informação transmitida apenas por cor:
- Cores selecionadas: checkmark + borda
- Estados de erro: ícone + cor vermelha + mensagem
- Estados de sucesso: ícone + cor verde + mensagem

**RA-008:** Zoom até 200% sem quebra de layout:
- Layout fluido
- Sem scroll horizontal
- Textos não sobrepõem

**RA-009:** **NOVO:** Modo de alto contraste (v1.5)

**RA-010:** **NOVO:** Preview com simulação de daltonismo (v1.5)

**RA-011:** **NOVO:** Tamanho mínimo de toque: 44x44px (mobile)

### Acessibilidade por Módulo

| Módulo | Requisitos Específicos |
|--------|------------------------|
| **Cores** | Indicador de contraste WCAG AA, preview com simulação de daltonismo (v1.5) |
| **Tipografia** | Tamanho mínimo 16px, line-height 1.5, letter-spacing adequado |
| **Ícones** | Alt text obrigatório, tamanho mínimo 24x24px, contraste com background |
| **Forms** | Labels sempre visíveis, error messages claros, estados focáveis |
| **Checkbox** | Área de toque 44x44px, mudança de estado anunciada |
| **Login/Sidebar** | Skip links, ARIA landmarks, navegação por teclado |

---

## 📚 Dependências e Integrações

### Dependências Críticas

| Dependência | Versão | Propósito | Alternativa |
|-------------|--------|-----------|-------------|
| **React** | 19.2.3 | Framework UI | Vue, Svelte |
| **TypeScript** | 5.8.2 | Type safety | JavaScript puro |
| **Vite** | 6.2.0 | Build tool | Webpack, Parcel |
| **Lucide React** | 0.562.0 | Biblioteca de ícones (suplementar) | Heroicons, Feather |
| **Recharts** | 3.7.0 | Gráficos/charts | Chart.js, Victory |
| **Google Fonts** | - | Web fonts | Self-hosted fonts (v1.5) |

### Bibliotecas de Ícones

**Estratégia Híbrida:**
- **Primária:** SVG exportados das 3 bibliotecas Figma (10.000 + 6.000 + Iconly)
- **Suplementar:** Lucide React para ícones de interface não encontrados no Figma

**Processo:**
1. Buscar ícone nas bibliotecas Figma
2. Se não encontrar, usar Lucide React
3. Exportar SVG do Figma → Otimizar com SVGO → Salvar em `/public/icons/`
4. Usar inline ou como React component

### Integrações Externas

| Serviço | Propósito | Status | Versão |
|---------|-----------|--------|--------|
| **Google Fonts API** | Carregar fontes web | ✅ v1.0 | CDN |
| **PostHog** | Analytics anônimo | 🔜 v1.1 | Self-hosted ou Cloud |
| **Google Gemini API** | AI suggestions | 🔜 v2.0 | - |
| **Figma Plugin API** | Exportar para Figma | 🔜 v2.0 | - |
| **GitHub API** | Salvar em repo | 🔜 v2.0 | - |

---

## 🧪 Testes e Qualidade

### Estratégia de Testes

**Testes Unitários (Vitest + React Testing Library):**
- Componentes React isolados
- Hooks customizados
- Funções utilitárias (export/import JSON, validação)
- Reducers de state management
- **Cobertura mínima:** 70%

**Casos de Teste Específicos:**

| Módulo | Testes Unitários | Testes Integração |
|--------|------------------|-------------------|
| **Cores** | Seleção/desseleção, validação hex | Estado persiste ao navegar |
| **Tipografia** | Carregar Google Fonts, fallback | Preview renderiza corretamente |
| **Ícones** | Filtro por categoria, render SVG | Lazy load de ícones |
| **Export** | Gerar JSON válido, schema validation | Download automático |
| **Import** | Validar JSON, detectar erros | Carregar estado corretamente |
| **Auto-save** | Debounce 30s, localStorage | Recuperar ao reload |
| **Undo/Redo** | 50 ações, atalhos | Estado consistente |

**Testes de Integração:**
- Fluxo completo: seleções → preview → export → import
- Navegação entre módulos com persistência
- Templates: importar → modificar → exportar
- Auto-save → reload → recuperar

**Testes E2E (Playwright):**
| Scenario | Passos |
|----------|--------|
| **Happy Path** | 1. Abrir app<br>2. Selecionar cores, fontes, ícones<br>3. Visualizar preview<br>4. Exportar JSON<br>5. Validar JSON baixado |
| **Import/Export** | 1. Exportar DS<br>2. Limpar seleções<br>3. Importar JSON<br>4. Verificar estado restaurado |
| **Auto-save** | 1. Fazer seleções<br>2. Aguardar 30s<br>3. Reload página<br>4. Verificar recuperação |
| **Template** | 1. Importar template "Material"<br>2. Modificar cores<br>3. Exportar<br>4. Validar mudanças |
| **Acessibilidade** | 1. Navegar só com teclado<br>2. Verificar ARIA labels<br>3. Testar com screen reader |

**Testes Manuais:**
- UX/UI em diferentes dispositivos (iPhone, Android, iPad, Desktop)
- Acessibilidade com NVDA/JAWS (screen readers)
- Performance em conexões lentas (3G throttling)
- Cross-browser (Chrome, Firefox, Safari, Edge)

### Checklist de Qualidade (Pre-Deploy)

**Antes do Deploy:**
- [ ] Todos os testes passam (unit, integration, E2E)
- [ ] Lint sem erros (ESLint)
- [ ] TypeScript sem erros (tsc --noEmit)
- [ ] Bundle size < 500KB (verificar com `npm run build`)
- [ ] Lighthouse score:
  - Performance > 90
  - Accessibility > 95
  - Best Practices > 90
  - SEO > 90
- [ ] Acessibilidade WCAG AA (verificar com axe DevTools)
- [ ] Cross-browser funcional (Chrome, Firefox, Safari, Edge)
- [ ] Responsivo testado (mobile 375px, tablet 768px, desktop 1440px)
- [ ] Auto-save funciona
- [ ] Import/Export JSON funciona
- [ ] Templates carregam corretamente
- [ ] Google Fonts carregam
- [ ] Preview visual correto

---

## 📦 Entrega e Deploy

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - name: Check bundle size
        run: |
          SIZE=$(du -sb dist | awk '{print $1}')
          if [ $SIZE -gt 512000 ]; then
            echo "Bundle size exceeds 500KB"
            exit 1
          fi

  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: [lint, typecheck, test, build]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}

  e2e:
    if: github.ref == 'refs/heads/develop'
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install
      - run: npm run test:e2e

  lighthouse:
    if: github.ref == 'refs/heads/develop'
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://neoloop-design-staging.vercel.app
          uploadArtifacts: true

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: [lint, typecheck, test, build]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
      - name: Notify team
        run: echo "Deployed to production!"
```

### Ambientes

| Ambiente | URL | Branch | Propósito | Auto-deploy |
|----------|-----|--------|-----------|-------------|
| **Local** | localhost:5173 | - | Desenvolvimento | Manual |
| **Staging** | staging.neoloop.design | develop | QA, testes | ✅ Auto |
| **Production** | neoloop.design | main | Usuários finais | ✅ Auto |

### Processo de Deploy

**Desenvolvimento:**
```bash
git checkout -b feature/nome-feature
# Desenvolver
npm run dev              # Local server
npm test                 # Rodar testes
npm run lint             # Verificar lint
npm run typecheck        # Verificar TypeScript
git commit -m "feat: descrição"
git push origin feature/nome-feature
# Pull Request → Code Review → Merge to develop
```

**Staging (automático após merge em develop):**
1. CI roda: lint, typecheck, test, build
2. Deploy automático em Vercel staging
3. E2E tests rodam contra staging
4. Lighthouse audit
5. QA manual

**Produção (merge develop → main):**
1. CI roda: lint, typecheck, test, build
2. Deploy automático em Vercel production
3. Smoke tests
4. Notificar time
5. Monitor errors (Sentry v1.5)

---

## 📈 Métricas de Sucesso

### KPIs Principais

| Métrica | Fórmula | Meta (6 meses) | Ferramenta |
|---------|---------|----------------|------------|
| **Monthly Active Users (MAU)** | Usuários únicos/mês | 1.000+ | PostHog |
| **Crescimento MoM** | (MAU_atual - MAU_anterior) / MAU_anterior | 20% | PostHog |
| **Average DS per User** | Total DS criados / Total usuários | 5 DS | Database |
| **D7 Retention** | Usuários que retornam em 7 dias / Novos usuários | 40% | Cohort analysis |
| **Conversion to Export** | Usuários que exportam / Total usuários | 60% | Funnel tracking |
| **Time to First Export** | Mediana de tempo até primeiro export | < 10 min | Event tracking |
| **NPS (Net Promoter Score)** | % Promotores - % Detratores | > 50 | Surveys |
| **Feature Adoption** | % usuários usando 5+ módulos | 70% | Event tracking |
| **Error Rate** | Erros JS / Total pageviews | < 1% | Sentry (v1.5) |
| **Page Load (P95)** | 95th percentile de load time | < 2s | Lighthouse |

### Eventos Rastreados

```typescript
// PostHog events
analytics.track('module_opened', {
  module: 'colors',
  timestamp: Date.now()
});

analytics.track('item_selected', {
  module: 'colors',
  item: 'c1-4',
  itemName: 'Coral'
});

analytics.track('template_imported', {
  template: 'material-design'
});

analytics.track('json_exported', {
  modulesUsed: 7,
  itemsSelected: 45,
  durationSeconds: 512
});

analytics.track('tutorial_completed', {
  step: 5
});
```

---

## 📊 Roadmap de Produto

### Fases de Desenvolvimento

| Fase | Versão | Features Principais | Timeline | Status |
|------|--------|---------------------|----------|--------|
| **Alpha** | 0.5.0 | 5 módulos core (Cores, Tipografia, Ícones, Charts, Export) | Semana 1-2 | 🔜 Planejado |
| **Beta** | 0.9.0 | 17 módulos completos + Import/Export | Semana 3-4 | 🔜 Planejado |
| **v1.0 MVP** | 1.0.0 | Produto completo + auto-save + testes + docs | Semana 5-6 | 🔜 Planejado |
| **v1.1 UX** | 1.1.0 | Templates, onboarding, preview global, undo/redo | Mês 2 | 🔜 Planejado |
| **v1.5 Growth** | 1.5.0 | Analytics, self-hosted fonts, dark mode, error tracking | Mês 3 | 🔜 Planejado |
| **v2.0 Premium** | 2.0.0 | Figma plugin, AI suggestions, collaboration, code generation | Mês 4-6 | 🔮 Futuro |

### Features por Versão

**v1.0 (MVP) - Semana 6**
- ✅ 17 módulos completos
- ✅ Export JSON + CSS
- ✅ Import JSON
- ✅ Auto-save (localStorage)
- ✅ Responsivo (mobile, tablet, desktop)
- ✅ Acessibilidade WCAG AA
- ✅ Testes (70% coverage)
- ✅ CI/CD pipeline
- ✅ Deploy Vercel

**v1.1 (UX Enhancements) - Mês 2**
- ✅ Tutorial interativo
- ✅ 5 templates pré-prontos
- ✅ Preview global
- ✅ Undo/Redo (50 ações)
- ✅ Keyboard shortcuts
- ✅ Search global
- ✅ Histórico de sessões (5 últimas)

**v1.5 (Growth & Polish) - Mês 3**
- ✅ Analytics (PostHog)
- ✅ Dark mode
- ✅ Self-hosted fonts (opcional)
- ✅ Error tracking (Sentry)
- ✅ Export PDF do preview
- ✅ Modo de alto contraste
- ✅ Simulação de daltonismo

**v2.0 (Premium) - Mês 4-6**
- 💎 Figma plugin (import/export)
- 💎 AI-powered suggestions (Gemini)
- 💎 Geração de código (React components)
- 💎 Colaboração em tempo real
- 💎 Histórico de versões
- 💎 Compartilhamento via link
- 💎 API access

---

## 🔍 Análise Competitiva

### Principais Concorrentes

| Produto | Preço | Features Principais | Pontos Fortes | Pontos Fracos |
|---------|-------|---------------------|---------------|---------------|
| **Figma Tokens** | $0 (plugin) | Design tokens como plugin Figma | Integrado no Figma | Requer Figma, curva de aprendizado |
| **Style Dictionary** | $0 (OSS) | Transformação de tokens | Poderoso, customizável | Requer código, CLI |
| **Supernova** | $19/mês | DS docs + code generation | Profissional, completo | Caro, complexo |
| **Zeroheight** | $39/mês | Documentação de DS | Bonito, organizado | Foco em docs, não builder |
| **InVision DSM** | $99/mês | Enterprise DS management | Enterprise-grade | Muito caro, overkill para pequenos |

### Posicionamento Neoloop

**Diferencial Único:**
- ✅ **Gratuito** e visual (não requer Figma, não requer código)
- ✅ **All-in-one** (tokens + componentes + templates em um lugar)
- ✅ **Rápido** (< 10 min para criar DS completo)
- ✅ **Beginner-friendly** (onboarding, templates, preview)
- ✅ **Export pronto** (JSON + CSS, não requer compilação)

**Tagline:** "Visual Design System Builder para times pequenos"

**Target:** Designers e desenvolvedores em startups, freelancers, projetos pessoais

---

## 🤝 Stakeholders

| Nome | Papel | Responsabilidade | Email/Contato |
|------|-------|------------------|---------------|
| **Fabio Brunning** | Product Owner, Dev Lead | Visão do produto, arquitetura, desenvolvimento, decisões técnicas | - |
| **[Designer]** | UI/UX Designer | Interface, experiência do usuário, wireframes, testes de usabilidade | - |
| **[QA]** | QA Engineer | Testes (manual + automação), qualidade, detecção de bugs | - |
| **[Marketing]** | Marketing Lead | Go-to-market, adoção, conteúdo, SEO, Product Hunt launch | - |

---

## 💰 Modelo de Negócio

### v1.0 - Free Tier (Sempre Gratuito)
- ✅ Todos os 17 módulos
- ✅ Export JSON + CSS ilimitado
- ✅ Import JSON ilimitado
- ✅ Templates básicos
- ✅ Auto-save
- ✅ Sem cadastro necessário
- ✅ Sem limite de design systems

**Objetivo:** Adoção massiva, construir base de usuários, validar produto

### v2.0 - Premium Tier (Opcional)
- 💎 Figma plugin (import/export direto)
- 💎 AI-powered suggestions
- 💎 Geração de código (React, Vue, Angular components)
- 💎 Colaboração em tempo real
- 💎 Histórico de versões ilimitado
- 💎 Compartilhamento via link
- 💎 Prioridade no suporte
- 💎 Exportação avançada (Sketch, Adobe XD)
- **Preço:** $9/mês ou $90/ano

### v3.0 - Enterprise (Futuro)
- 🏢 White-label (customizar branding)
- 🏢 API access
- 🏢 SSO (Single Sign-On)
- 🏢 SLA garantido
- 🏢 Suporte dedicado
- 🏢 On-premise deployment
- **Preço:** Custom (contato comercial)

---

## 📞 Contato e Suporte

**Repositório:** https://github.com/fabiobrunning/Neoloop-Design

**Issues:** https://github.com/fabiobrunning/Neoloop-Design/issues

**Documentação:** https://docs.neoloop.design (v1.1)

**Email:** contato@neoloop.design (adicionar)

**Twitter:** @NeoloopDesign (criar)

---

## 📝 Glossário

| Termo | Definição |
|-------|-----------|
| **Design System** | Conjunto de padrões de design (cores, tipografia, componentes) reutilizáveis para manter consistência visual |
| **Design Token** | Variável que armazena decisões de design (ex: `--color-primary`, `--spacing-4`) |
| **SVG** | Scalable Vector Graphics - formato de imagem vetorial escalável |
| **JSON** | JavaScript Object Notation - formato de dados estruturados |
| **SPA** | Single Page Application - aplicação web de página única |
| **Lucide React** | Biblioteca de ícones SVG para React |
| **Recharts** | Biblioteca de gráficos para React |
| **WCAG** | Web Content Accessibility Guidelines - diretrizes de acessibilidade web |
| **NPS** | Net Promoter Score - métrica de satisfação do cliente |
| **MAU** | Monthly Active Users - usuários ativos mensais |
| **MoM** | Month-over-Month - comparação mensal |
| **D7 Retention** | Taxa de retenção em 7 dias |
| **Cohort Analysis** | Análise de grupos de usuários por período de entrada |
| **Funnel Tracking** | Rastreamento de etapas de conversão |

---

## 📄 Histórico de Versões

| Versão | Data | Autor | Mudanças |
|--------|------|-------|----------|
| **0.1** | 2026-01-23 | Fabio Brunning | PRD inicial (prd-neoloop-design-system-builder.md) |
| **1.0** | 2026-01-24 | Fabio Brunning + Aria (Architect) | Revisão completa: corrigido erros ortográficos, adicionados 8 módulos essenciais (Spacing, Shadows, Radius, Breakpoints, Buttons, Cards, Forms, Templates), especificações técnicas completas, import JSON, auto-save, onboarding, undo/redo, keyboard shortcuts, preview global, 47 pontos de melhoria implementados |

**Principais Mudanças v0.1 → v1.0:**
- ✅ Corrigidos 6 erros ortográficos
- ✅ Renumerados RFs duplicados
- ✅ Adicionados 8 módulos faltantes
- ✅ Especificada estrutura de export JSON
- ✅ Documentadas bibliotecas de ícones (3 do Figma)
- ✅ Adicionadas 15 funcionalidades de UX (import, templates, onboarding, undo/redo, etc.)
- ✅ Especificados requisitos de performance (bundle < 500KB, load < 2s)
- ✅ Detalhada arquitetura técnica (state management, componentes, CI/CD)
- ✅ Definidos KPIs mensuráveis e roadmap claro
- ✅ Análise competitiva e posicionamento
- ✅ Modelo de negócio (free forever + premium opcional)

---

## ✅ Aprovações

| Nome | Papel | Data | Status | Assinatura |
|------|-------|------|--------|------------|
| Fabio Brunning | Product Owner | 2026-01-24 | ✅ Aprovado | ✍️ |
| [Stakeholder 2] | [Papel] | - | ⏳ Pendente | - |
| [Stakeholder 3] | [Papel] | - | ⏳ Pendente | - |

---

**Fim do PRD v1.0**

---

## 🚀 Próximos Passos

1. ✅ **Revisar e aprovar este PRD** com stakeholders
2. 📋 **Criar backlog de user stories** no GitHub Issues
3. 🎨 **Criar wireframes de alta fidelidade** (Figma)
4. 💻 **Iniciar desenvolvimento do MVP** (Sprint 1-2)
5. 🧪 **Setup de testes e CI/CD** (Semana 1)
6. 🚀 **Deploy em staging** (Semana 3)
7. 👥 **Beta testing** com 50 usuários convidados (Semana 4-5)
8. 🎉 **Launch público v1.0** (Semana 6)

---

*Documento criado seguindo padrões AIOS (AI-Orchestrated System)*
*Versão: 1.0.0*
*Última atualização: 2026-01-24*
*Revisor: Aria (Architect Agent)*
