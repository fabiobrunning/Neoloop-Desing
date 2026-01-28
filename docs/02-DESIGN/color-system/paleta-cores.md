# Paleta de Cores - Neoloop Design System

## 🎨 Visão Geral

O sistema de cores da Neoloop é construído com design tokens semânticos, garantindo consistência e facilitando a manutenção.

## 📊 Estrutura da Paleta

### Cores Principais (Primary)
Cor principal da marca, usada para CTAs, links e elementos interativos principais.

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-primary-50` | #f0f9ff | Backgrounds muito claros |
| `--color-primary-100` | #e0f2fe | Backgrounds claros |
| `--color-primary-200` | #bae6fd | Hover states suaves |
| `--color-primary-300` | #7dd3fc | Borders, dividers |
| `--color-primary-400` | #38bdf8 | Elementos secundários |
| `--color-primary-500` | #0ea5e9 | **Cor principal** (default) |
| `--color-primary-600` | #0284c7 | Hover de botões |
| `--color-primary-700` | #0369a1 | Active states |
| `--color-primary-800` | #075985 | Textos sobre fundos claros |
| `--color-primary-900` | #0c4a6e | Textos de alto contraste |

### Cores Secundárias (Secondary)
Cor secundária para variação e hierarquia visual.

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-secondary-50` | #faf5ff | Backgrounds muito claros |
| `--color-secondary-100` | #f3e8ff | Backgrounds claros |
| `--color-secondary-300` | #d8b4fe | Borders, accents |
| `--color-secondary-500` | #a855f7 | **Cor secundária** (default) |
| `--color-secondary-700` | #7e22ce | Hover/Active |
| `--color-secondary-900` | #581c87 | Contraste alto |

### Cores Neutras (Neutral)
Escala de cinzas para textos, backgrounds e bordas.

| Token | Hex | Uso Principal |
|-------|-----|---------------|
| `--color-neutral-0` | #ffffff | **Branco puro** |
| `--color-neutral-50` | #fafafa | Backgrounds suaves |
| `--color-neutral-100` | #f5f5f5 | Backgrounds secundários |
| `--color-neutral-200` | #e5e5e5 | **Borders default** |
| `--color-neutral-300` | #d4d4d4 | Borders fortes |
| `--color-neutral-400` | #a3a3a3 | Elementos desabilitados |
| `--color-neutral-500` | #737373 | Textos terciários |
| `--color-neutral-600` | #525252 | **Textos secundários** |
| `--color-neutral-700` | #404040 | Textos de destaque |
| `--color-neutral-800` | #262626 | Backgrounds escuros |
| `--color-neutral-900` | #171717 | **Texto principal** |
| `--color-neutral-950` | #0a0a0a | Preto quase puro |

## 🎯 Cores Semânticas

### Success (Verde) ✅
Para feedback positivo, confirmações e sucesso.

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-success-100` | #dcfce7 | Background |
| `--color-success-500` | #22c55e | **Default** |
| `--color-success-700` | #15803d | Hover/Active |

**Exemplos de uso:**
- Mensagens de sucesso
- Ícones de confirmação
- Status "ativo" ou "completo"
- Notificações positivas

### Warning (Amarelo/Laranja) ⚠️
Para avisos e ações que requerem atenção.

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-warning-100` | #fef3c7 | Background |
| `--color-warning-500` | #f59e0b | **Default** |
| `--color-warning-700` | #b45309 | Hover/Active |

**Exemplos de uso:**
- Avisos importantes
- Ações que requerem cuidado
- Status "pendente" ou "em progresso"

### Error (Vermelho) ❌
Para erros, ações destrutivas e alertas críticos.

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-error-100` | #fee2e2 | Background |
| `--color-error-500` | #ef4444 | **Default** |
| `--color-error-700` | #b91c1c | Hover/Active |

**Exemplos de uso:**
- Mensagens de erro
- Validações falhas
- Ações destrutivas (deletar, remover)
- Status "erro" ou "falhou"

### Info (Azul Claro) ℹ️
Para informações gerais e dicas.

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-info-100` | #dbeafe | Background |
| `--color-info-500` | #3b82f6 | **Default** |
| `--color-info-700` | #1d4ed8 | Hover/Active |

**Exemplos de uso:**
- Tooltips
- Mensagens informativas
- Ajuda e documentação
- Status "informação"

## 🏷️ Tokens Semânticos (Aliases)

### Backgrounds
```css
--bg-primary: var(--color-neutral-0);      /* Fundo principal */
--bg-secondary: var(--color-neutral-50);   /* Fundo secundário */
--bg-tertiary: var(--color-neutral-100);   /* Fundo terciário */
--bg-inverse: var(--color-neutral-900);    /* Fundo invertido */
--bg-brand: var(--color-primary-500);      /* Fundo da marca */
```

### Textos
```css
--text-primary: var(--color-neutral-900);   /* Texto principal */
--text-secondary: var(--color-neutral-600); /* Texto secundário */
--text-tertiary: var(--color-neutral-500);  /* Texto terciário */
--text-inverse: var(--color-neutral-0);     /* Texto invertido */
--text-brand: var(--color-primary-600);     /* Texto da marca */
--text-link: var(--color-primary-600);      /* Links */
--text-link-hover: var(--color-primary-700);/* Links hover */
```

### Borders
```css
--border-default: var(--color-neutral-200); /* Borda padrão */
--border-strong: var(--color-neutral-300);  /* Borda forte */
--border-subtle: var(--color-neutral-100);  /* Borda sutil */
--border-brand: var(--color-primary-500);   /* Borda da marca */
```

### Estados Interativos
```css
--interactive-default: var(--color-primary-500);  /* Estado normal */
--interactive-hover: var(--color-primary-600);    /* Hover */
--interactive-active: var(--color-primary-700);   /* Active/Pressed */
--interactive-disabled: var(--color-neutral-300); /* Desabilitado */
```

## 🌙 Dark Mode

O sistema suporta dark mode através do atributo `data-theme="dark"`:

```html
<body data-theme="dark">
  <!-- Conteúdo -->
</body>
```

### Tokens que mudam no Dark Mode:

| Token | Light | Dark |
|-------|-------|------|
| `--bg-primary` | #ffffff | #0a0a0a |
| `--bg-secondary` | #fafafa | #171717 |
| `--text-primary` | #171717 | #fafafa |
| `--border-default` | #e5e5e5 | #404040 |

## 💡 Guia de Uso

### 1. Contraste de Texto
Sempre garanta contraste adequado (WCAG AA: 4.5:1 para texto normal):

```css
/* ✅ BOM - Alto contraste */
.text-on-light {
  background: var(--color-neutral-0);
  color: var(--color-neutral-900);
}

/* ❌ EVITAR - Baixo contraste */
.text-on-light-bad {
  background: var(--color-neutral-50);
  color: var(--color-neutral-300);
}
```

### 2. Hierarquia Visual
Use variações de peso para criar hierarquia:

- **Primary**: 500-700 (CTAs, elementos principais)
- **Secondary**: 300-500 (elementos secundários)
- **Tertiary**: 100-300 (backgrounds, hints)

### 3. Estados Interativos
Sempre defina estados claros:

```css
.button {
  background: var(--interactive-default);
}

.button:hover {
  background: var(--interactive-hover);
}

.button:active {
  background: var(--interactive-active);
}

.button:disabled {
  background: var(--interactive-disabled);
  cursor: not-allowed;
}
```

### 4. Cores Semânticas
Use cores semânticas apenas para seu propósito:

```css
/* ✅ CORRETO */
.success-message {
  background: var(--color-success-100);
  color: var(--color-success-700);
  border-left: 4px solid var(--color-success-500);
}

/* ❌ INCORRETO - não use verde para outra finalidade */
.highlight-box {
  background: var(--color-success-100); /* Use neutral em vez disso */
}
```

## 📦 Como Importar

### HTML
```html
<link rel="stylesheet" href="/src/tokens/colors.css">
```

### CSS
```css
@import url('/src/tokens/colors.css');
```

### JavaScript/React
```javascript
import '../src/tokens/colors.css';
```

## 🎨 Exemplos de Uso

### Card com Cores
```html
<div style="
  background: var(--bg-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
">
  <h3 style="color: var(--text-primary);">Título</h3>
  <p style="color: var(--text-secondary);">Descrição do card</p>
  <button style="
    background: var(--interactive-default);
    color: var(--text-inverse);
  ">
    Ação
  </button>
</div>
```

### Alert de Sucesso
```html
<div style="
  background: var(--color-success-100);
  color: var(--color-success-700);
  border-left: 4px solid var(--color-success-500);
  padding: var(--spacing-4);
">
  ✅ Operação realizada com sucesso!
</div>
```

## 🔗 Ferramentas Úteis

- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors - Palette Generator](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)
- [WCAG Contrast Checker](https://contrast-ratio.com/)

## ✅ Checklist

- [ ] Importar arquivo de tokens de cores
- [ ] Usar tokens semânticos (não valores fixos)
- [ ] Verificar contraste de textos (WCAG AA)
- [ ] Definir estados interativos (hover, active, disabled)
- [ ] Testar em dark mode
- [ ] Validar cores semânticas para seus propósitos corretos
- [ ] Documentar qualquer nova cor adicionada
