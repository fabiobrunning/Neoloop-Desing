# Integração com Figma - Neoloop Design System

## 🎨 Visão Geral

Este guia explica como integrar templates do Figma com o Neoloop Design System e manter sincronização entre design e código.

## 📥 Como Trazer Templates do Figma

### Método 1: Exportar Design Tokens (Recomendado)

#### Passo 1: Instalar Plugin de Design Tokens

**Plugins recomendados:**
- **Design Tokens** by Jan Six
- **Tokens Studio for Figma** (mais completo)
- **Style Dictionary** export

**Instalação:**
1. Abra seu arquivo no Figma
2. Menu > Plugins > Browse plugins
3. Busque "Design Tokens" ou "Tokens Studio"
4. Clique em "Install"

#### Passo 2: Configurar Design Tokens no Figma

1. **Criar Cores como Styles:**
   - Selecione uma forma
   - Sidebar direita > Fill > Click no ícone de 4 colunas
   - Clique em "+" para criar novo style
   - Nomeie seguindo convenção: `color/primary/500`

2. **Criar Text Styles:**
   - Selecione um texto
   - Sidebar direita > Text > Click no ícone de 4 colunas
   - Crie estilos: `display/xl`, `heading/lg`, `body/md`

3. **Organização sugerida:**
   ```
   Cores:
   ├── color/primary/50-900
   ├── color/secondary/50-900
   ├── color/neutral/0-950
   ├── color/success/50-900
   └── ...

   Tipografia:
   ├── display/xl
   ├── display/lg
   ├── heading/xl
   ├── body/md
   └── ...
   ```

#### Passo 3: Exportar Tokens

**Usando Tokens Studio:**
1. Plugins > Tokens Studio
2. Configurar tokens (cores, tipografia, espaçamento)
3. Export > JSON
4. Salvar em: `docs/02-DESIGN/design-tokens/figma-tokens.json`

**Formato do JSON:**
```json
{
  "color": {
    "primary": {
      "500": {
        "value": "#0ea5e9",
        "type": "color"
      }
    }
  },
  "typography": {
    "display-xl": {
      "fontSize": { "value": 72, "type": "dimension" },
      "fontWeight": { "value": 700, "type": "fontWeight" },
      "lineHeight": { "value": 1.25, "type": "dimension" }
    }
  }
}
```

#### Passo 4: Converter para CSS

**Opção A: Manual**
```bash
# Localização dos tokens exportados
docs/02-DESIGN/design-tokens/figma-tokens.json

# Converter manualmente para CSS Variables
# Já temos os arquivos em: src/tokens/colors.css
```

**Opção B: Style Dictionary (Automatizado)**
```bash
npm install -g style-dictionary

# Criar arquivo config.json
{
  "source": ["docs/02-DESIGN/design-tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "src/tokens/",
      "files": [{
        "destination": "tokens.css",
        "format": "css/variables"
      }]
    }
  }
}

# Executar
style-dictionary build
```

### Método 2: Exportar Ícones

#### Passo 1: Preparar Ícones no Figma

1. **Padronizar tamanho:**
   - Todos ícones em frame 24x24px
   - Padding interno de 2px
   - Stroke de 2px

2. **Organizar em Frame:**
   ```
   Icons
   ├── Outline
   │   ├── home
   │   ├── search
   │   └── ...
   ├── Solid
   │   └── ...
   └── Brand
       └── ...
   ```

3. **Flatten e outline strokes:**
   - Selecionar ícone
   - Botão direito > Flatten
   - Botão direito > Outline Stroke

#### Passo 2: Exportar SVG

**Exportar individualmente:**
1. Selecionar ícone
2. Sidebar direita > Export
3. Formato: SVG
4. Settings:
   - ✅ Include "id" attribute
   - ✅ Outline text
   - ✅ Simplify stroke
5. Export

**Exportar em massa:**
1. Selecionar todos os ícones
2. Export > SVG
3. Salvar em: `assets/icons/outline/`

#### Passo 3: Otimizar SVG

```bash
# Instalar SVGO
npm install -g svgo

# Otimizar todos os SVGs
cd assets/icons/outline
svgo *.svg --multipass

# Ou um por vez
svgo home.svg -o home.svg
```

**Script de otimização (opcional):**
```bash
#!/bin/bash
# optimize-icons.sh

for file in assets/icons/**/*.svg; do
  echo "Otimizando: $file"
  svgo "$file" \
    --multipass \
    --pretty \
    --indent=2 \
    --config='{"plugins": [{"removeViewBox": false}]}'
done
```

### Método 3: Exportar Componentes

#### Passo 1: Preparar Componentes

1. **Criar Components no Figma:**
   - Select > Create Component (Cmd/Ctrl + Alt + K)
   - Nomear: `Button/Primary`, `Card/Default`

2. **Documentar variantes:**
   - Properties panel > Add variant
   - Criar states: default, hover, active, disabled

#### Passo 2: Inspecionar e Copiar Código

**Usar plugin Figma to Code:**
1. Plugins > Browse > Instalar "Figma to Code"
2. Selecionar componente
3. Plugin > Figma to Code
4. Escolher framework: HTML/CSS, React, Vue
5. Copiar código gerado

**Exemplo - Botão:**
```css
/* Inspecionar no Figma */
.button-primary {
  padding: 12px 24px;
  background: #0ea5e9;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
}

/* Adaptar para tokens */
.button-primary {
  padding: var(--spacing-3) var(--spacing-6);
  background: var(--color-primary-500);
  border-radius: var(--radius-lg);
  font-size: var(--body-md-size);
  font-weight: var(--font-weight-semibold);
}
```

### Método 4: Usar Figma API

#### Passo 1: Obter Access Token

1. Figma > Settings > Account
2. "Personal access tokens"
3. Generate new token
4. Copiar e guardar com segurança

#### Passo 2: Instalar Figma API Client

```bash
npm install figma-js
```

#### Passo 3: Script para Baixar Assets

```javascript
// download-figma-assets.js
const Figma = require('figma-js');
const fs = require('fs');

const token = 'SEU_TOKEN_AQUI';
const fileKey = 'SEU_FILE_KEY'; // da URL do Figma

const client = Figma.Client({ personalAccessToken: token });

async function downloadIcons() {
  const file = await client.file(fileKey);

  // Filtrar nodes de ícones
  const icons = file.data.document.children
    .filter(page => page.name === 'Icons')
    .flatMap(page => page.children);

  // Exportar SVGs
  for (const icon of icons) {
    const svgUrl = await client.fileImages(fileKey, {
      ids: icon.id,
      format: 'svg'
    });

    // Download e salvar
    const svg = await fetch(svgUrl.data.images[icon.id]);
    const svgText = await svg.text();

    fs.writeFileSync(
      `assets/icons/outline/${icon.name.toLowerCase()}.svg`,
      svgText
    );
  }
}

downloadIcons();
```

## 🔄 Workflow de Sincronização

### 1. Fluxo Recomendado

```
Figma Design
    ↓
Export Tokens (JSON)
    ↓
Style Dictionary
    ↓
CSS Variables (src/tokens/)
    ↓
Código da Aplicação
```

### 2. Quando Sincronizar

- **Cores mudaram**: Re-exportar tokens de cores
- **Tipografia mudou**: Re-exportar tokens de texto
- **Novos ícones**: Exportar SVGs e otimizar
- **Componentes novos**: Inspecionar e implementar

### 3. Checklist de Sincronização

```markdown
- [ ] Exportar design tokens do Figma
- [ ] Converter tokens para CSS Variables
- [ ] Atualizar arquivo src/tokens/colors.css
- [ ] Atualizar arquivo src/tokens/typography.css
- [ ] Exportar novos ícones SVG
- [ ] Otimizar SVGs com SVGO
- [ ] Adicionar ícones em assets/icons/
- [ ] Atualizar documentação (guia-icones.md)
- [ ] Testar componentes atualizados
- [ ] Commit e push para repositório
```

## 📁 Estrutura de Arquivos Sugerida

```
docs/02-DESIGN/
├── design-tokens/
│   ├── figma-tokens.json        # Export do Figma
│   ├── tokens-colors.json       # Cores separadas
│   ├── tokens-typography.json   # Tipografia separada
│   └── tokens-spacing.json      # Espaçamento
├── wireframes/
│   ├── homepage.fig             # Arquivos Figma (opcional)
│   └── screenshots/
│       ├── homepage-desktop.png
│       └── homepage-mobile.png
└── components/
    ├── button-specs.md          # Especificações de componentes
    └── card-specs.md
```

## 🔗 Links e Referências do Figma

### Organização no Figma

**Nomear páginas:**
```
📐 Cover
🎨 Design Tokens
   ├── Colors
   ├── Typography
   └── Spacing
🔷 Icons
   ├── Outline
   ├── Solid
   └── Brand
🧩 Components
   ├── Buttons
   ├── Cards
   └── Forms
📱 Screens
```

### Como Compartilhar

**Link do arquivo:**
```
https://www.figma.com/file/[FILE_KEY]/Neoloop-Design-System
```

**Documentar no README:**
```markdown
## 🎨 Figma Design

Acesse o design no Figma:
[Neoloop Design System](https://figma.com/file/xxx/neoloop-design)

Para contribuir:
1. Solicite acesso (edit permission)
2. Siga as guidelines de design
3. Exporte tokens após mudanças
```

## 🛠️ Ferramentas Recomendadas

### Plugins Figma Essenciais

1. **Tokens Studio for Figma**
   - Gerenciar design tokens
   - Export/Import JSON
   - Sincronização GitHub

2. **Iconify**
   - Biblioteca de ícones
   - Import direto no Figma

3. **Figma to Code**
   - Gerar código HTML/CSS/React
   - Acelerar implementação

4. **Design Lint**
   - Validar consistência
   - Detectar problemas

5. **Contrast**
   - Verificar acessibilidade
   - Validar contraste WCAG

### Ferramentas de Conversão

1. **Style Dictionary**
   ```bash
   npm install -g style-dictionary
   ```

2. **Figma Tokens Transformer**
   ```bash
   npm install -g figma-tokens-transformer
   ```

3. **SVGO**
   ```bash
   npm install -g svgo
   ```

## 📚 Recursos

- [Figma API Documentation](https://www.figma.com/developers/api)
- [Tokens Studio Documentation](https://docs.tokens.studio/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Design Tokens W3C Spec](https://design-tokens.github.io/community-group/)

## ⚠️ Considerações Importantes

### 1. Versionamento
- Versione tokens junto com o código
- Use Git tags para releases
- Mantenha CHANGELOG.md atualizado

### 2. Nomenclatura Consistente
- Siga convenção entre Figma e código
- Use kebab-case ou camelCase consistentemente
- Documente exceções

### 3. Automação
- Configure CI/CD para converter tokens
- Automatize export de ícones
- Use webhooks do Figma para notificar mudanças

### 4. Documentação
- Mantenha screenshots atualizados
- Documente decisões de design (ADRs)
- Link specs do Figma no código

## ✅ Checklist de Integração Inicial

```markdown
- [ ] Criar arquivo no Figma
- [ ] Organizar páginas (Tokens, Icons, Components)
- [ ] Configurar Color Styles
- [ ] Configurar Text Styles
- [ ] Instalar plugins (Tokens Studio, Figma to Code)
- [ ] Exportar design tokens (JSON)
- [ ] Salvar tokens em docs/02-DESIGN/design-tokens/
- [ ] Converter tokens para CSS
- [ ] Exportar ícones SVG
- [ ] Otimizar SVGs
- [ ] Salvar ícones em assets/icons/
- [ ] Documentar no README.md
- [ ] Compartilhar link do Figma com equipe
- [ ] Configurar permissões de acesso
- [ ] Criar workflow de sincronização
```

## 🚀 Próximos Passos

1. **Configurar Tokens Studio no seu Figma**
2. **Exportar todos os design tokens**
3. **Sincronizar com os arquivos CSS existentes**
4. **Automatizar processo de export**
5. **Documentar mudanças em changelog**

---

**Precisa de ajuda?** Consulte a [documentação oficial do Figma](https://help.figma.com/) ou abra uma issue no repositório.
