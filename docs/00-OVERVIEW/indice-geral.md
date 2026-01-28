# Índice Geral - Neoloop Design System

## 📚 Documentação Completa

Este é o índice principal do Neoloop Design System. Use-o para navegar rapidamente por toda a documentação.

---

## 🎯 Início Rápido

### Para Designers
1. [Integração com Figma](../99-REFERENCES/integracao-figma.md)
2. [Paleta de Cores](../02-DESIGN/color-system/paleta-cores.md)
3. [Sistema Tipográfico](../02-DESIGN/typography/)
4. [Biblioteca de Ícones](../02-DESIGN/icons/guia-icones.md)

### Para Desenvolvedores
1. [README Principal](../../README.md)
2. [Design Tokens CSS](../../src/tokens/)
3. [Ícones SVG](../../assets/icons/)
4. [Demonstração Tipográfica](../02-DESIGN/typography/type-scale.html)

---

## 📁 Estrutura do Projeto

```
neoloop-design/
├── .project-meta.yaml          # Metadados do projeto
├── README.md                   # Visão geral principal
│
├── docs/                       # 📚 Documentação
│   ├── 00-OVERVIEW/           # Índices e visão geral
│   ├── 02-DESIGN/             # Design system
│   │   ├── design-tokens/     # Tokens exportados do Figma
│   │   ├── color-system/      # Sistema de cores
│   │   ├── typography/        # Sistema tipográfico
│   │   └── icons/             # Guia de ícones
│   └── 99-REFERENCES/         # Referências e integrações
│       └── integracao-figma.md
│
├── assets/                    # 🎨 Assets visuais
│   ├── icons/                 # Biblioteca de ícones
│   │   ├── outline/          # Ícones outline (27 ícones)
│   │   ├── solid/            # Ícones sólidos (4 ícones)
│   │   └── brand/            # Logo Neoloop
│   ├── fonts/                # Sistema de fontes
│   └── exports/              # Assets exportados
│
├── src/                       # 💻 Código fonte
│   ├── tokens/               # Design tokens CSS
│   │   ├── colors.css        # Variáveis de cores
│   │   ├── typography.css    # Variáveis tipográficas
│   │   └── spacing.css       # Espaçamento e layout
│   └── utils/                # Utilitários
│
└── _archive/                  # 📦 Versões antigas
```

---

## 🎨 Design System

### 1. Cores

#### Documentação
- [📘 Paleta de Cores Completa](../02-DESIGN/color-system/paleta-cores.md)
- [💻 Tokens CSS](../../src/tokens/colors.css)

#### Paletas Disponíveis
- **Primary** (Azul): 10 variações (#f0f9ff → #0c4a6e)
- **Secondary** (Roxo): 10 variações (#faf5ff → #581c87)
- **Neutral** (Cinza): 12 variações (branco → preto)
- **Semantic**:
  - Success (Verde)
  - Warning (Amarelo/Laranja)
  - Error (Vermelho)
  - Info (Azul claro)

#### Tokens Semânticos
```css
--bg-primary, --bg-secondary, --bg-tertiary
--text-primary, --text-secondary, --text-tertiary
--border-default, --border-strong, --border-subtle
--interactive-default, --interactive-hover, --interactive-active
```

#### Suporte Dark Mode
✅ Suportado via `data-theme="dark"`

---

### 2. Tipografia

#### Documentação
- [📘 Sistema Tipográfico](../02-DESIGN/typography/)
- [💻 Tokens CSS](../../src/tokens/typography.css)
- [🎨 Demonstração Interativa](../02-DESIGN/typography/type-scale.html)
- [📄 Guia de Fontes](../../assets/fonts/README.md)

#### Fontes
- **Primary**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono

#### Escalas Disponíveis
- **Display** (4 tamanhos): XL, LG, MD, SM
- **Heading** (5 tamanhos): XL, LG, MD, SM, XS
- **Body** (3 tamanhos): LG, MD (default), SM
- **Caption** (3 tamanhos): LG, MD, SM
- **Code**: Monospace style

#### Pesos
- Light (300), Regular (400), Medium (500)
- Semibold (600), Bold (700), Extrabold (800)

---

### 3. Ícones

#### Documentação
- [📘 Guia Completo de Ícones](../02-DESIGN/icons/guia-icones.md)
- [📁 Biblioteca SVG](../../assets/icons/)

#### Catálogo
- **Outline**: 27 ícones (home, search, settings, user, bell, etc.)
- **Solid**: 4 ícones (heart, star, bell, check-circle)
- **Brand**: 1 logo (neoloop-logo)

#### Especificações
- Tamanho: 24x24px (viewBox)
- Stroke: 2px (outline)
- Formato: SVG otimizado
- Cor: `currentColor`

#### Categorias
- **Navegação**: home, search, settings, user, bell
- **Arquivos**: file, folder, upload, download
- **Ações**: plus, minus, edit, trash, check, x
- **Feedback**: heart, star, eye, eye-off
- **Design**: palette, layers, image, layout, type, grid
- **Social**: copy, share

---

### 4. Espaçamento

#### Documentação
- [💻 Tokens CSS](../../src/tokens/spacing.css)

#### Sistema
- Base: 4px (múltiplos)
- Escala: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32

#### Tokens Incluem
- **Spacing**: margin, padding
- **Border Radius**: sm, md, lg, xl, 2xl, 3xl, full
- **Shadows**: xs, sm, md, lg, xl, 2xl
- **Z-index**: layers de empilhamento
- **Transitions**: fast, base, slow

---

## 🔗 Integração com Figma

### Documentação
- [📘 Guia Completo de Integração](../99-REFERENCES/integracao-figma.md)

### Métodos de Integração
1. **Export Design Tokens** (Recomendado)
   - Usar plugin Tokens Studio
   - Exportar JSON
   - Converter para CSS Variables

2. **Export Ícones**
   - Exportar SVG individual ou em massa
   - Otimizar com SVGO
   - Adicionar em assets/icons/

3. **Export Componentes**
   - Inspecionar no Figma
   - Copiar especificações
   - Implementar com tokens CSS

4. **Figma API**
   - Automatizar download de assets
   - Sincronização programática

### Plugins Recomendados
- Tokens Studio for Figma
- Figma to Code
- Design Lint
- Contrast Checker
- Iconify

---

## 💻 Uso no Código

### Importar Tokens

**HTML:**
```html
<link rel="stylesheet" href="/src/tokens/colors.css">
<link rel="stylesheet" href="/src/tokens/typography.css">
<link rel="stylesheet" href="/src/tokens/spacing.css">
```

**CSS:**
```css
@import url('/src/tokens/colors.css');
@import url('/src/tokens/typography.css');
@import url('/src/tokens/spacing.css');
```

**JavaScript/React:**
```javascript
import '../src/tokens/colors.css';
import '../src/tokens/typography.css';
import '../src/tokens/spacing.css';
```

### Usar Tokens

**Método 1: Tokens diretos**
```css
.my-button {
  background: var(--color-primary-500);
  color: var(--text-inverse);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  font-size: var(--body-md-size);
  font-weight: var(--font-weight-semibold);
}
```

**Método 2: Classes utilitárias**
```html
<h1 class="display-xl text-brand">Título</h1>
<p class="body-md text-secondary">Parágrafo</p>
<button class="bg-brand text-inverse rounded-lg">Botão</button>
```

### Usar Ícones

**Inline SVG (Recomendado):**
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     width="24" height="24">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
</svg>
```

**Tag img:**
```html
<img src="/assets/icons/outline/home.svg" alt="Home" width="24">
```

---

## 📊 Estatísticas

### Conteúdo Disponível
- ✅ 31 ícones SVG otimizados
- ✅ 42+ design tokens de cores
- ✅ 17 escalas tipográficas
- ✅ 14 tokens de espaçamento
- ✅ 2 famílias de fontes
- ✅ Suporte dark mode completo

### Arquivos Criados
- 📄 1 README principal
- 📄 1 .project-meta.yaml
- 📄 3 arquivos CSS de tokens
- 📄 31 arquivos SVG (ícones)
- 📄 5 arquivos de documentação
- 📄 1 demonstração HTML interativa

---

## ✅ Checklists

### Para Designers

**Ao Criar Novos Elementos:**
- [ ] Seguir especificações de grid (24px para ícones)
- [ ] Usar cores da paleta definida
- [ ] Aplicar escalas tipográficas corretas
- [ ] Verificar contraste (WCAG AA: 4.5:1)
- [ ] Exportar assets otimizados
- [ ] Documentar decisões de design
- [ ] Atualizar tokens no Figma

### Para Desenvolvedores

**Ao Implementar Designs:**
- [ ] Usar design tokens (não valores fixos)
- [ ] Importar tokens CSS necessários
- [ ] Aplicar nomenclatura correta
- [ ] Adicionar aria-labels em ícones
- [ ] Testar responsividade
- [ ] Validar dark mode
- [ ] Verificar acessibilidade
- [ ] Otimizar performance

---

## 🚀 Próximos Passos

### Expansões Planejadas

1. **Componentes**
   - [ ] Biblioteca de componentes React
   - [ ] Buttons, Cards, Forms, Modals
   - [ ] Storybook para documentação

2. **Animações**
   - [ ] Tokens de animação
   - [ ] Transições padrão
   - [ ] Micro-interações

3. **Acessibilidade**
   - [ ] Guia completo A11y
   - [ ] Padrões ARIA
   - [ ] Testes automatizados

4. **Ferramentas**
   - [ ] CLI para gerar componentes
   - [ ] Linter customizado
   - [ ] Build system

---

## 📞 Suporte

### Documentação
- [README Principal](../../README.md)
- [Guia de Integração Figma](../99-REFERENCES/integracao-figma.md)

### Links Úteis
- [Figma Design File](#) (adicionar link)
- [Repositório Git](#) (se aplicável)
- [Storybook](#) (quando disponível)

---

## 📝 Changelog

### v1.0.0 - 2026-01-23

**Criado:**
- ✨ Estrutura inicial do design system
- 🎨 Paleta de cores completa (42+ tokens)
- 📝 Sistema tipográfico (17 escalas)
- 🔷 Biblioteca de ícones (31 SVGs)
- 📚 Documentação completa
- 🌙 Suporte dark mode
- 🎯 Design tokens CSS
- 📐 Sistema de espaçamento
- 🔗 Guia de integração Figma

---

**Versão**: 1.0.0
**Última atualização**: 2026-01-23
**Mantido por**: Fabio Brunning
