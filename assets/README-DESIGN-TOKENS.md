# 🎨 Design Tokens - watchOS Colors

Design tokens exportados do Figma e organizados para uso em aplicações web.

## 📂 Estrutura de Arquivos

```
assets/
├── Cores/
│   └── design-tokens-colors.css        ← 80+ cores do watchOS
├── fonts/
│   └── design-tokens-typography.css    ← Estilos de tipografia
├── tailwind.config.colors.js           ← Config para Tailwind CSS
├── design-tokens.tokens.json           ← JSON original do Figma
└── README-DESIGN-TOKENS.md             ← Este arquivo
```

## 🚀 Como Usar

### Opção 1: CSS Variables (Recomendado)

**Para usar em qualquer projeto (HTML, React, Vue, Angular):**

```html
<!-- Importe os arquivos CSS -->
<link rel="stylesheet" href="assets/Cores/design-tokens-colors.css">
<link rel="stylesheet" href="assets/fonts/design-tokens-typography.css">
```

```tsx
// No React/Next.js
import './assets/Cores/design-tokens-colors.css';
import './assets/fonts/design-tokens-typography.css';
```

**Uso:**

```css
.meu-botao {
  background-color: var(--color-hibiscus);
  color: white;
  font-family: var(--font-title-family);
  font-size: var(--font-title-size);
}
```

```tsx
// No React com inline styles
<button style={{ backgroundColor: 'var(--color-dragon-fruit)' }}>
  Clique aqui
</button>

<h1 className="text-title">Meu Título</h1>
```

---

### Opção 2: Tailwind CSS

**Configuração:**

```javascript
// tailwind.config.js
const watchOSColors = require('./assets/tailwind.config.colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: watchOSColors,
      fontFamily: {
        'title': ['SF UI Display', 'sans-serif'],
        'value': ['SF Mono', 'monospace'],
      }
    }
  }
}
```

**Uso:**

```tsx
<button className="bg-hibiscus text-white px-6 py-3 rounded-lg">
  Clique aqui
</button>

<h1 className="font-title text-2xl text-purple">
  Título
</h1>

<div className="bg-sea-foam p-6 rounded-xl">
  <p className="text-pine-green">Conteúdo</p>
</div>
```

---

## 🎨 Paleta de Cores Completa

### 🔴 Vermelhos e Rosas
```css
--color-red: #df1125
--color-neon-pink: #fb212f
--color-electric-pink: #fc3644
--color-hibiscus: #fb0049         ⭐ Destaque
--color-pink: #fd4154
--color-dragon-fruit: #f12e6d
--color-pomegranate: #d80e4f
--color-camellia: #bf3138
--color-red-rose: #ab1438
--color-plum: #81323d
```

### 🟠 Laranjas
```css
--color-orange: #fc4e12
--color-clementine: #fd513b
--color-apricot: #fc5c42
--color-papaya: #fd7036
--color-peach: #e0694e
--color-rose-gold: #e99475
--color-pink-sand: #feb69c
```

### 🟡 Amarelos
```css
--color-canary-yellow: #ffda3a
--color-flash-light: #faed0b
--color-lemon-cream: #ffeb6d
--color-cream: #ffe0ab
```

### 🟢 Verdes
```css
--color-green: #80e220
--color-spearmint: #77ea7e
--color-mint: #a2ec8e
--color-sea-foam: #cff1d6        ⭐ Suave
--color-turquoise: #91cec2
```

### 🔵 Azuis
```css
--color-blue: #1ea5fc            ⭐ Principal
--color-light-blue: #5ebad9
--color-surf-blue: #1871ac
--color-denim-blue: #4b709a
--color-midnight-blue: #383b65   ⭐ Escuro
```

### 🟣 Roxos
```css
--color-purple: #8962f8          ⭐ Vibrante
--color-ultra-violet: #5f41b2
--color-lilac: #a990dd
--color-indigo: #474e95
```

### 🟤 Marrons e Dourados
```css
--color-gold: #b08053
--color-camel: #a97d4f
--color-walnut: #a17455
--color-cocoa: #8b7d7d
```

---

## 📝 Tipografia

### Title Style
- **Font:** SF UI Display (fallback: system sans-serif)
- **Size:** 22px
- **Weight:** 500 (Medium)
- **Line Height:** 26.4px

**Uso:**
```html
<h1 className="text-title">Título Principal</h1>
```

```css
.meu-titulo {
  font-family: var(--font-title-family);
  font-size: var(--font-title-size);
  font-weight: var(--font-title-weight);
}
```

### Value Style (Monospace)
- **Font:** SF Mono (fallback: Monaco, monospace)
- **Size:** 16px
- **Weight:** 400 (Regular)
- **Transform:** UPPERCASE
- **Line Height:** 19.2px

**Uso:**
```html
<span className="text-value">ABC123</span>
```

---

## 💡 Exemplos Práticos

### 1. Botão Primário
```tsx
<button
  className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90"
  style={{ backgroundColor: 'var(--color-hibiscus)' }}
>
  Clique aqui
</button>
```

### 2. Card Colorido
```tsx
<div
  className="p-6 rounded-xl shadow-lg"
  style={{ backgroundColor: 'var(--color-sea-foam)' }}
>
  <h3 className="text-title" style={{ color: 'var(--color-pine-green)' }}>
    Título do Card
  </h3>
  <p className="text-sm mt-2">Descrição do card</p>
</div>
```

### 3. Badge/Tag
```tsx
<span
  className="px-3 py-1 rounded-full text-sm font-medium"
  style={{
    backgroundColor: 'var(--color-purple)',
    color: 'white'
  }}
>
  Novo
</span>
```

### 4. Gradiente
```tsx
<div
  className="p-8 rounded-2xl"
  style={{
    background: `linear-gradient(135deg, var(--color-purple), var(--color-blue))`
  }}
>
  <h2 className="text-white text-3xl">Hero Section</h2>
</div>
```

---

## 🔄 Atualizando os Tokens

Quando o design mudar no Figma:

1. No Figma → Plugins → **"Figma Tokens"**
2. Export → **JSON**
3. Salve como `design-tokens.tokens.json` nesta pasta
4. Execute o script de conversão (ou notifique o desenvolvedor)

---

## 📦 Exportar do Figma Manualmente

### Exportar Cores:
1. Abra o Figma no **Dev Mode** (Shift + D)
2. Selecione o elemento
3. Copie o CSS do painel direito
4. Cole no seu arquivo CSS

### Exportar Ícones/Assets:
1. Selecione o elemento
2. Painel direito → **Export**
3. Escolha **SVG** (para ícones) ou **PNG** (para imagens)
4. Salve em `icons/` ou `Logos/`

---

## 🎯 Boas Práticas

### ✅ Fazer:
- Usar CSS Variables para flexibilidade
- Manter consistência entre design e código
- Re-exportar do Figma quando houver mudanças
- Usar classes utilitárias (`.text-title`, `.bg-hibiscus`)

### ❌ Evitar:
- Hardcoded colors (`#fb0049` direto no código)
- Criar cores fora do design system
- Modificar valores sem atualizar o Figma

---

## 🤔 FAQ

**P: Posso adicionar mais cores?**
R: Sim! Adicione no `design-tokens-colors.css` seguindo o padrão:
```css
--color-minha-cor: #hexcode;
```

**P: Como fazer dark mode?**
R: Crie variações com prefixo:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--color-midnight-blue);
    --color-text: var(--color-soft-white);
  }
}
```

**P: Funciona com outros frameworks?**
R: Sim! CSS Variables funciona com Vue, Angular, Svelte, etc.

**P: Preciso usar todas as cores?**
R: Não! Use apenas as que fazem sentido para seu projeto.

---

## 📞 Contato

Dúvidas sobre os design tokens? Entre em contato com o time de design.

---

**Última atualização:** 27 de janeiro de 2026
**Versão:** 1.0
**Fonte:** Figma (watchOS Colors - Community)
