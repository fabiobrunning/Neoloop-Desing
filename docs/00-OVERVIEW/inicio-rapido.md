# Início Rápido - Neoloop Design System

## 🚀 Comece em 5 Minutos

Este guia vai te ajudar a começar a usar o Neoloop Design System rapidamente.

---

## Para Designers 🎨

### 1. Abra o Figma
```
1. Acesse seu arquivo do Figma
2. Instale o plugin "Tokens Studio for Figma"
3. Siga o guia: docs/99-REFERENCES/integracao-figma.md
```

### 2. Use as Cores
```
Paleta completa em: docs/02-DESIGN/color-system/paleta-cores.md

Cores principais:
- Primary: #0ea5e9 (azul)
- Secondary: #a855f7 (roxo)
- Success: #22c55e (verde)
- Error: #ef4444 (vermelho)
```

### 3. Use a Tipografia
```
Fontes:
- Inter (body, headings)
- JetBrains Mono (code)

Escalas:
- Display XL: 72px
- Heading LG: 24px
- Body MD: 16px (padrão)
```

### 4. Use os Ícones
```
Ícones disponíveis em: assets/icons/

Exportar novos ícones:
1. Frame 24x24px
2. Stroke 2px
3. Export SVG
4. Salvar em assets/icons/outline/
```

---

## Para Desenvolvedores 💻

### 1. Importe os Tokens CSS

**HTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <!-- Importar tokens -->
  <link rel="stylesheet" href="/src/tokens/colors.css">
  <link rel="stylesheet" href="/src/tokens/typography.css">
  <link rel="stylesheet" href="/src/tokens/spacing.css">

  <!-- Importar Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Seu conteúdo -->
</body>
</html>
```

**CSS:**
```css
@import url('/src/tokens/colors.css');
@import url('/src/tokens/typography.css');
@import url('/src/tokens/spacing.css');
```

**React/Next.js:**
```javascript
// _app.js ou layout.js
import '../src/tokens/colors.css';
import '../src/tokens/typography.css';
import '../src/tokens/spacing.css';
```

### 2. Use os Tokens

**Exemplo - Botão:**
```css
.button {
  /* Cores */
  background: var(--color-primary-500);
  color: var(--text-inverse);

  /* Espaçamento */
  padding: var(--spacing-3) var(--spacing-6);

  /* Tipografia */
  font-size: var(--body-md-size);
  font-weight: var(--font-weight-semibold);

  /* Layout */
  border-radius: var(--radius-lg);
  border: none;

  /* Interação */
  cursor: pointer;
  transition: var(--transition-base);
}

.button:hover {
  background: var(--color-primary-600);
}
```

**Ou use classes utilitárias:**
```html
<button class="bg-brand text-inverse body-md rounded-lg p-6">
  Clique Aqui
</button>
```

### 3. Use os Ícones

**Método 1: SVG Inline (Recomendado)**
```html
<button>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2"
       width="24" height="24" style="color: white;">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
  Home
</button>
```

**Método 2: Tag img**
```html
<img src="/assets/icons/outline/home.svg" alt="Home" width="24" height="24">
```

**React Component:**
```tsx
// components/Icon.tsx
interface IconProps {
  name: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24 }) => {
  return (
    <img
      src={`/assets/icons/outline/${name}.svg`}
      alt={name}
      width={size}
      height={size}
    />
  );
};

// Uso
<Icon name="home" size={32} />
```

### 4. Ative Dark Mode

```html
<!-- Adicionar atributo data-theme -->
<body data-theme="dark">
  <!-- Conteúdo -->
</body>
```

```javascript
// Toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';

  body.setAttribute('data-theme', isDark ? 'light' : 'dark');
}
```

---

## Exemplos Práticos 📝

### Exemplo 1: Card Simples

```html
<div style="
  background: var(--bg-primary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
">
  <h3 class="heading-lg" style="color: var(--text-primary); margin-bottom: var(--spacing-2);">
    Título do Card
  </h3>

  <p class="body-md" style="color: var(--text-secondary); margin-bottom: var(--spacing-4);">
    Descrição do conteúdo do card aqui.
  </p>

  <button style="
    background: var(--color-primary-500);
    color: var(--text-inverse);
    padding: var(--spacing-2) var(--spacing-4);
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
  ">
    Saiba Mais
  </button>
</div>
```

### Exemplo 2: Alert de Sucesso

```html
<div style="
  background: var(--color-success-100);
  color: var(--color-success-700);
  border-left: 4px solid var(--color-success-500);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
">
  <!-- Ícone check -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2"
       width="24" height="24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>

  <span class="body-md">
    Operação realizada com sucesso!
  </span>
</div>
```

### Exemplo 3: Navegação

```html
<nav style="
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-default);
  padding: var(--spacing-4) var(--spacing-6);
">
  <ul style="
    display: flex;
    gap: var(--spacing-8);
    list-style: none;
    margin: 0;
    padding: 0;
  ">
    <li>
      <a href="/" style="
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        color: var(--text-brand);
        text-decoration: none;
        font-weight: var(--font-weight-medium);
      ">
        <svg width="20" height="20"><!-- home icon --></svg>
        Início
      </a>
    </li>
    <li>
      <a href="/search" style="
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        color: var(--text-secondary);
        text-decoration: none;
      ">
        <svg width="20" height="20"><!-- search icon --></svg>
        Buscar
      </a>
    </li>
  </ul>
</nav>
```

---

## Recursos Rápidos 🔗

### Documentação
- [📘 Índice Geral](indice-geral.md)
- [🎨 Paleta de Cores](../02-DESIGN/color-system/paleta-cores.md)
- [📝 Tipografia](../02-DESIGN/typography/)
- [🔷 Ícones](../02-DESIGN/icons/guia-icones.md)
- [🔗 Integração Figma](../99-REFERENCES/integracao-figma.md)

### Arquivos Importantes
- [colors.css](../../src/tokens/colors.css)
- [typography.css](../../src/tokens/typography.css)
- [spacing.css](../../src/tokens/spacing.css)
- [Ícones SVG](../../assets/icons/)
- [Demo Tipografia](../02-DESIGN/typography/type-scale.html)

### Demonstrações
- **Ver tipografia**: Abra `docs/02-DESIGN/typography/type-scale.html` no navegador
- **Ver ícones**: Navegue em `assets/icons/` para ver todos os SVGs

---

## Próximos Passos 🎯

### Para Designers
1. ✅ Leia o [guia de integração Figma](../99-REFERENCES/integracao-figma.md)
2. ✅ Configure Tokens Studio no Figma
3. ✅ Use a paleta de cores definida
4. ✅ Exporte ícones seguindo as specs

### Para Desenvolvedores
1. ✅ Importe os tokens CSS
2. ✅ Teste a demonstração de tipografia
3. ✅ Implemente seu primeiro componente
4. ✅ Configure dark mode

---

## Dúvidas Comuns ❓

### Como adicionar uma nova cor?

1. Edite `src/tokens/colors.css`
2. Adicione nova variável:
   ```css
   --color-accent-500: #ff6b6b;
   ```
3. Documente em `docs/02-DESIGN/color-system/paleta-cores.md`

### Como adicionar um novo ícone?

1. Crie SVG 24x24px com stroke de 2px
2. Salve em `assets/icons/outline/nome-icone.svg`
3. Adicione na documentação em `docs/02-DESIGN/icons/guia-icones.md`

### Como mudar a fonte?

1. Importe nova fonte (Google Fonts, arquivo local)
2. Atualize `--font-primary` em `src/tokens/typography.css`
3. Documente em `assets/fonts/README.md`

### Como usar tokens no JavaScript?

```javascript
// Ler tokens
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary-500');

// Definir tokens dinamicamente
document.documentElement.style.setProperty(
  '--color-primary-500',
  '#ff0000'
);
```

---

## Checklist de Início ✅

**Designers:**
- [ ] Abrir guia de integração Figma
- [ ] Instalar plugins recomendados
- [ ] Revisar paleta de cores
- [ ] Revisar escala tipográfica
- [ ] Explorar biblioteca de ícones

**Desenvolvedores:**
- [ ] Importar tokens CSS
- [ ] Configurar fontes (Inter, JetBrains Mono)
- [ ] Testar demo de tipografia no navegador
- [ ] Implementar primeiro componente
- [ ] Testar dark mode
- [ ] Usar ao menos 3 ícones

---

## Ajuda 💬

Se precisar de ajuda:
1. Consulte o [Índice Geral](indice-geral.md)
2. Leia a documentação específica de cada seção
3. Veja exemplos práticos acima

---

**Pronto para começar!** 🚀

Escolha seu caminho (designer ou desenvolvedor) e siga os passos acima.
