# 📚 Consumindo o Neoloop Design System

Guia completo para integrar o Neoloop Design System em seus projetos.

## 🚀 Quick Start

### 1. Instalação

```bash
# Clone o repositório
git clone <repository-url> neoloop-design-system
cd neoloop-design-system/neo-design-system-builder

# Instale as dependências
npm install

# Build para produção
npm run build

# Ou use diretamente (desenvolvimento)
npm run dev
```

### 2. Uso de Componentes

#### Importação de Componentes Individuais

```typescript
// src/App.tsx
import { Button, Card, Input, Select } from '@/src/components/core';

export function App() {
  return (
    <div>
      <Card>
        <h2>Formulário</h2>
        <Input placeholder="Nome" />
        <Select options={[{ label: 'Opção 1', value: '1' }]} />
        <Button variant="primary">Enviar</Button>
      </Card>
    </div>
  );
}
```

#### Componentes Disponíveis

**Core Components** (`src/components/core/`)
- `Button` - Botões com 8 variantes e 5 tamanhos
- `Card` - Container com estilo
- `Input` - Campo de entrada
- `Select` - Campo de seleção
- `Checkbox` - Checkbox com label
- `Radio` - Radio button
- `Textarea` - Área de texto
- `Label` - Labels com validação de acessibilidade
- `Avatar` - Avatar com iniciais
- `Badge` - Badges com variantes
- `Alert` - Alertas estilizados
- `Modal` - Modal dialogs
- `Toast` - Notificações toast
- `Spinner` - Loading spinner
- `ProgressBar` - Barra de progresso
- `Skeleton` - Skeleton loading
- `Table` - Tabela reativa
- `Charts` - Gráficos (4 tipos)
- `FileUpload` - Upload de arquivos
- `DatePicker` - Seletor de data
- `TimePicker` - Seletor de hora
- `Breadcrumb` - Navegação breadcrumb
- `Link` - Links estilizados
- `Divider` - Divisores
- `EmptyState` - Estados vazios
- `Tooltip` - Tooltips
- `Drawer` - Drawer sidebar
- `Accordion` - Componente accordion
- E mais 50+ componentes!

### 3. Design Tokens

Acesse tokens de design em `docs/02-DESIGN/design-tokens.json`:

```typescript
// src/styles/tokens.ts
import designTokens from '@/docs/02-DESIGN/design-tokens.json';

const colors = designTokens.colors;
const spacing = designTokens.spacing;
const typography = designTokens.typography;
```

### 4. CSS e Estilos

```typescript
// Importe os estilos
import '@/src/styles/index.css';
```

Ou use Tailwind CSS que já está configurado com design tokens.

## 📦 Estrutura do Projeto

```
neo-design-system-builder/
├── src/
│   ├── components/
│   │   ├── core/              # 79+ componentes principais
│   │   ├── accessibility/     # Validadores de acessibilidade
│   │   ├── motion/            # Animações e transições
│   │   └── navigation/        # Sistema de navegação
│   ├── styles/                # CSS e design tokens
│   ├── hooks/                 # React hooks customizados
│   ├── context/               # Context providers
│   ├── schemas/               # Validações Zod
│   └── utils/                 # Utilitários
├── dist/                      # Build de produção
├── docs/                      # Documentação completa
└── tests/                     # Suite de testes (2.500+ casos)
```

## 🎨 Customização

### Estilos Globais

```css
/* src/styles/index.css */
:root {
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --spacing-unit: 4px;
  /* ... mais tokens ... */
}
```

### Temas

```typescript
// Adicione temas em src/styles/themes/
// theme-dark.css
// theme-light.css
```

## 🧪 Testing

Executar testes:

```bash
# Todos os testes
npm run test

# Apenas testes unitários
npm run test:unit

# Testes de acessibilidade
npm run test:a11y

# Cobertura
npm run test:coverage
```

**Estatísticas:**
- 2.500+ casos de teste
- 92% cobertura de código
- WCAG 2.1 AA compliance

## ♿ Acessibilidade

Todos os componentes incluem:
- Labels semânticas ARIA
- Suporte a teclado
- Contrast validator (WCAG AA/AAA)
- Touch targets ≥ 44px
- Fontes legíveis (16px+)

**Validadores inclusos:**
```typescript
import {
  ContrastValidator,
  TypographyValidator,
  SpacingValidator
} from '@/src/components/accessibility';
```

## 🎬 Animações

Animações com Framer Motion:

```typescript
import { Transitions } from '@/src/components/motion';

<motion.div animate={{ opacity: 1 }} transition={Transitions.fadeIn} />
```

## 🚀 Performance

- Bundle size: ~337KB (gzipped)
- Code splitting automático
- Lazy loading de componentes
- 60fps animations

## 📊 Storybook

Ver stories dos componentes:

```bash
npm run storybook
# Abrir em http://localhost:6006
```

## 🔗 Links Úteis

- **Documentação Completa**: `docs/00-OVERVIEW/master-release-document-v1.0.md`
- **Design Tokens**: `docs/02-DESIGN/design-tokens-reference.md`
- **Arquitetura**: `docs/03-ARCHITECTURE/README.md`
- **Guias de Implementação**: `docs/04-IMPLEMENTATION/`

## 📝 Exemplos

Veja exemplos prontos em `src/examples/`:

```typescript
// FileUploadExample.tsx
// TableExample.tsx
```

## 🐛 Troubleshooting

### Estilos não aparecem
```typescript
// Certifique-se de importar os estilos
import '@/src/styles/index.css';
```

### TypeScript errors
```bash
# Regenerar tipos
npm run typecheck

# Ou use o arquivo de tipos
import type { ButtonProps } from '@/src/components/core';
```

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique a documentação em `docs/`
2. Veja exemplos em `src/examples/`
3. Consulte stories do Storybook

## 📄 Licença

Este design system foi desenvolvido como parte do projeto Neoloop v1.0.

---

**Última atualização:** 2026-02-03
**Versão:** 1.0.0
**Status:** Production Ready ✅
