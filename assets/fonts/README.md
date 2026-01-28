# Fontes Neoloop Design System

## 📝 Fontes Recomendadas

### Primary Font: Inter

**Inter** é uma fonte sans-serif otimizada para interfaces digitais, com excelente legibilidade em telas.

#### Como importar:

**Via Google Fonts:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

**Via CSS @import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
```

**Via npm:**
```bash
npm install @fontsource/inter
```

```javascript
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
```

### Monospace Font: JetBrains Mono

**JetBrains Mono** é uma fonte monoespaçada ideal para código e dados.

#### Como importar:

**Via Google Fonts:**
```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

**Via npm:**
```bash
npm install @fontsource/jetbrains-mono
```

## 🎯 Pesos Disponíveis

| Peso | Nome | Uso Recomendado |
|------|------|-----------------|
| 300 | Light | Textos grandes, hero sections |
| 400 | Regular | Corpo de texto padrão |
| 500 | Medium | Destaques sutis, labels |
| 600 | Semibold | Subtítulos, navegação |
| 700 | Bold | Títulos principais, CTAs |
| 800 | Extrabold | Display, hero titles |

## 📐 Escala Tipográfica

Veja a escala completa em: `docs/02-DESIGN/typography/type-scale.html`

### Display (Títulos grandes)
- **Display XL**: 72px / Bold / 1.25 line-height
- **Display LG**: 60px / Bold / 1.25 line-height
- **Display MD**: 48px / Semibold / 1.25 line-height
- **Display SM**: 36px / Semibold / 1.375 line-height

### Heading (Subtítulos)
- **Heading XL**: 30px / Semibold / 1.375 line-height
- **Heading LG**: 24px / Semibold / 1.5 line-height
- **Heading MD**: 20px / Semibold / 1.5 line-height
- **Heading SM**: 16px / Semibold / 1.5 line-height
- **Heading XS**: 14px / Semibold / 1.5 line-height

### Body (Texto corrido)
- **Body LG**: 18px / Regular / 1.625 line-height
- **Body MD**: 16px / Regular / 1.5 line-height
- **Body SM**: 14px / Regular / 1.5 line-height

### Caption (Textos auxiliares)
- **Caption LG**: 14px / Medium / 1.5 line-height
- **Caption MD**: 12px / Medium / 1.5 line-height
- **Caption SM**: 12px / Regular / 1.25 line-height

## 🎨 Uso com Tokens CSS

```css
/* Importar tokens */
@import url('/src/tokens/typography.css');

/* Usar em componentes */
.hero-title {
  font-size: var(--display-xl-size);
  font-weight: var(--display-xl-weight);
  line-height: var(--display-xl-line-height);
}

/* Ou usar classes utilitárias */
<h1 class="display-xl">Grande Título</h1>
<p class="body-md">Parágrafo normal</p>
<span class="caption-sm">Texto pequeno</span>
```

## 🔗 Recursos

- [Inter no Google Fonts](https://fonts.google.com/specimen/Inter)
- [JetBrains Mono no Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono)
- [Type Scale Calculator](https://type-scale.com/)
- [Inter GitHub](https://github.com/rsms/inter)

## 📱 Performance

### Otimizações recomendadas:

1. **Preload fonts críticas:**
```html
<link rel="preload" href="path/to/inter.woff2" as="font" type="font/woff2" crossorigin>
```

2. **Use font-display:**
```css
@font-face {
  font-family: 'Inter';
  font-display: swap; /* ou optional */
}
```

3. **Carregue apenas pesos necessários:**
   - Mínimo: 400, 600, 700
   - Recomendado: 400, 500, 600, 700

4. **Use variável fonts quando possível:**
   - Menor tamanho de arquivo
   - Todos os pesos em um único arquivo

## 🌐 Suporte a Idiomas

**Inter** suporta mais de 200 idiomas, incluindo:
- Latin (português, inglês, espanhol, etc.)
- Cyrillic
- Greek
- Vietnamese

## ✅ Checklist de Implementação

- [ ] Importar fonte via Google Fonts ou npm
- [ ] Definir variáveis CSS de tipografia
- [ ] Aplicar fonte ao body
- [ ] Testar em diferentes tamanhos de tela
- [ ] Verificar legibilidade
- [ ] Otimizar carregamento (preload, font-display)
- [ ] Testar acessibilidade (contraste, tamanho mínimo)
