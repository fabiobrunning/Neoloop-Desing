# Guia de Ícones - Neoloop Design System

## 🔷 Visão Geral

A biblioteca de ícones da Neoloop oferece ícones SVG otimizados e acessíveis para todas as necessidades da plataforma.

## 📁 Estrutura da Biblioteca

```
assets/icons/
├── outline/          # Ícones com traços (linha)
│   ├── home.svg
│   ├── search.svg
│   ├── settings.svg
│   └── ...
├── solid/            # Ícones preenchidos (sólidos)
│   ├── heart.svg
│   ├── star.svg
│   └── ...
└── brand/            # Ícones da marca Neoloop
    └── neoloop-logo.svg
```

## 📐 Especificações Técnicas

### Dimensões
- **viewBox**: `0 0 24 24` (padrão)
- **Tamanho base**: 24x24 pixels
- **Grid**: 24px com padding interno de 2px

### Traços
- **stroke-width**: 2px (padrão para outline)
- **stroke-linecap**: `round`
- **stroke-linejoin**: `round`

### Formato
- **Formato**: SVG inline ou arquivo
- **Cor**: `currentColor` (herda cor do pai)
- **Otimização**: SVG otimizado e minificado

## 🎨 Estilos Disponíveis

### 1. Outline (Traços)
Ícones com traços, ideais para interfaces leves e modernas.

**Características:**
- Traços de 2px
- Transparência interna
- Melhor para fundos claros

**Quando usar:**
- Interface principal
- Navegação
- Botões secundários
- Toolbar

### 2. Solid (Preenchidos)
Ícones preenchidos, ideais para estados ativos e destaques.

**Características:**
- Completamente preenchidos
- Mais peso visual
- Melhor para contraste

**Quando usar:**
- Estados ativos/selecionados
- CTAs principais
- Notificações
- Badges e contadores

### 3. Brand (Marca)
Ícones específicos da marca Neoloop.

**Características:**
- Logo da marca
- Elementos de identidade visual

**Quando usar:**
- Splash screens
- Loading states
- Branding
- Marca d'água

## 📝 Catálogo de Ícones

### Navegação
| Ícone | Nome | Arquivo | Uso |
|-------|------|---------|-----|
| 🏠 | Home | `home.svg` | Página inicial |
| 🔍 | Search | `search.svg` | Busca |
| ⚙️ | Settings | `settings.svg` | Configurações |
| 👤 | User | `user.svg` | Perfil do usuário |
| 🔔 | Bell | `bell.svg` | Notificações |

### Arquivos & Pastas
| Ícone | Nome | Arquivo | Uso |
|-------|------|---------|-----|
| 📄 | File | `file.svg` | Arquivo genérico |
| 📁 | Folder | `folder.svg` | Pasta |
| 📥 | Download | `download.svg` | Download |
| 📤 | Upload | `upload.svg` | Upload |

### Ações
| Ícone | Nome | Arquivo | Uso |
|-------|------|---------|-----|
| ➕ | Plus | `plus.svg` | Adicionar |
| ➖ | Minus | `minus.svg` | Remover |
| ✏️ | Edit | `edit.svg` | Editar |
| 🗑️ | Trash | `trash.svg` | Deletar |
| ✓ | Check | `check.svg` | Confirmar |
| ✕ | X | `x.svg` | Fechar/Cancelar |

### Feedback
| Ícone | Nome | Arquivo | Uso |
|-------|------|---------|-----|
| ❤️ | Heart | `heart.svg` | Favoritar |
| ⭐ | Star | `star.svg` | Avaliação |
| 👁️ | Eye | `eye.svg` | Visualizar |
| 🚫 | Eye Off | `eye-off.svg` | Ocultar |

### Design
| Ícone | Nome | Arquivo | Uso |
|-------|------|---------|-----|
| 🎨 | Palette | `palette.svg` | Cores |
| 📐 | Layers | `layers.svg` | Camadas |
| 🖼️ | Image | `image.svg` | Imagem |
| 📱 | Layout | `layout.svg` | Layout |
| 🔤 | Type | `type.svg` | Tipografia |
| ⊞ | Grid | `grid.svg` | Grade |

### Social
| Ícone | Nome | Arquivo | Uso |
|-------|------|---------|-----|
| 📋 | Copy | `copy.svg` | Copiar |
| 🔗 | Share | `share.svg` | Compartilhar |

## 💻 Como Usar

### Método 1: SVG Inline (Recomendado)
```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round"
     width="24" height="24">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9 22 9 12 15 12 15 22"/>
</svg>
```

**Vantagens:**
- Estilizável via CSS
- Suporta `currentColor`
- Melhor performance
- Sem requisição HTTP

### Método 2: Tag `<img>`
```html
<img src="/assets/icons/outline/home.svg"
     alt="Home"
     width="24"
     height="24">
```

**Vantagens:**
- Mais simples
- Cacheável
- Fácil de usar

**Desvantagens:**
- Não estilizável via CSS
- Cor fixa no SVG

### Método 3: Background CSS
```css
.icon-home {
  width: 24px;
  height: 24px;
  background-image: url('/assets/icons/outline/home.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
```

### Método 4: React Component (TypeScript)
```tsx
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className
}) => {
  return (
    <img
      src={`/assets/icons/outline/${name}.svg`}
      alt={name}
      width={size}
      height={size}
      className={className}
      style={{ color }}
    />
  );
};

// Uso
<Icon name="home" size={32} color="var(--color-primary-500)" />
```

## 🎨 Estilização

### Mudar Cor (com currentColor)
```html
<svg style="color: var(--color-primary-500);">
  <!-- SVG paths -->
</svg>
```

```css
.icon {
  color: var(--color-primary-500);
}

.icon:hover {
  color: var(--color-primary-600);
}
```

### Mudar Tamanho
```html
<!-- Método 1: Atributos -->
<svg width="32" height="32" viewBox="0 0 24 24">
  <!-- paths -->
</svg>

<!-- Método 2: CSS -->
<svg class="icon-lg" viewBox="0 0 24 24">
  <!-- paths -->
</svg>
```

```css
.icon-xs { width: 16px; height: 16px; }
.icon-sm { width: 20px; height: 20px; }
.icon-md { width: 24px; height: 24px; } /* default */
.icon-lg { width: 32px; height: 32px; }
.icon-xl { width: 48px; height: 48px; }
```

### Animações
```css
/* Rotação */
.icon-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Pulsar */
.icon-pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Hover bounce */
.icon-bounce:hover {
  animation: bounce 0.5s;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
```

## ♿ Acessibilidade

### 1. Sempre adicione texto alternativo
```html
<!-- Se o ícone é decorativo -->
<svg aria-hidden="true">
  <!-- paths -->
</svg>

<!-- Se o ícone tem significado -->
<svg role="img" aria-label="Configurações">
  <title>Configurações</title>
  <!-- paths -->
</svg>
```

### 2. Em botões
```html
<!-- Botão somente com ícone -->
<button aria-label="Fechar">
  <svg aria-hidden="true">
    <!-- x icon -->
  </svg>
</button>

<!-- Botão com ícone e texto -->
<button>
  <svg aria-hidden="true">
    <!-- icon -->
  </svg>
  <span>Salvar</span>
</button>
```

### 3. Contraste
Garanta contraste suficiente:
- Ícones principais: 3:1 mínimo
- Ícones de texto: 4.5:1 mínimo

## 📦 Otimização

### Minificar SVG
Use ferramentas como [SVGO](https://github.com/svg/svgo):

```bash
npm install -g svgo
svgo icon.svg
```

### Remover atributos desnecessários
```svg
<!-- Antes -->
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" ...>

<!-- Depois -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
```

## 🚀 Performance

### 1. Use SVG Sprite
Combine múltiplos ícones em um sprite sheet:

```html
<!-- sprite.svg -->
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="icon-home" viewBox="0 0 24 24">
    <path d="..."/>
  </symbol>
  <symbol id="icon-search" viewBox="0 0 24 24">
    <path d="..."/>
  </symbol>
</svg>

<!-- Uso -->
<svg width="24" height="24">
  <use href="sprite.svg#icon-home"/>
</svg>
```

### 2. Lazy Loading
```html
<img src="icon.svg" loading="lazy" alt="Icon">
```

## 🎯 Casos de Uso

### Navegação
```html
<nav>
  <a href="/">
    <svg><!-- home icon --></svg>
    Início
  </a>
  <a href="/search">
    <svg><!-- search icon --></svg>
    Buscar
  </a>
</nav>
```

### Botões
```html
<button class="btn-primary">
  <svg><!-- plus icon --></svg>
  Adicionar
</button>

<button class="btn-icon" aria-label="Configurações">
  <svg><!-- settings icon --></svg>
</button>
```

### Status/Badges
```html
<div class="status success">
  <svg><!-- check icon --></svg>
  Sucesso
</div>

<div class="notification">
  <svg><!-- bell icon --></svg>
  <span class="badge">3</span>
</div>
```

## 🔧 Criando Novos Ícones

### Guidelines:
1. **Grid**: 24x24px com padding de 2px
2. **Stroke**: 2px para outline
3. **Formato**: SVG otimizado
4. **viewBox**: `0 0 24 24`
5. **Cor**: Use `currentColor`
6. **Naming**: kebab-case (ex: `user-check.svg`)

### Template:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
     fill="none" stroke="currentColor" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
  <!-- Seus paths aqui -->
</svg>
```

## 📚 Recursos

- [Heroicons](https://heroicons.com/) - Inspiração
- [Lucide Icons](https://lucide.dev/) - Biblioteca similar
- [SVGO](https://github.com/svg/svgo) - Otimizador
- [SVG OMG](https://jakearchibald.github.io/svgomg/) - Otimizador online

## ✅ Checklist

- [ ] Usar ícones com `currentColor`
- [ ] Adicionar `aria-label` ou `aria-hidden`
- [ ] Definir `viewBox="0 0 24 24"`
- [ ] Otimizar SVG (remover atributos desnecessários)
- [ ] Testar em diferentes tamanhos
- [ ] Verificar contraste de cores
- [ ] Documentar novos ícones adicionados
- [ ] Manter consistência de stroke-width
