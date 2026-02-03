# Neoloop Design System Builder v1.0
## User Guide - Guia do Usuario

**Versao:** 1.0.0
**Ultima Atualizacao:** 2026-01-31
**Tempo de Leitura:** 15 minutos

---

## Indice

1. [Introducao](#1-introducao)
2. [Getting Started](#2-getting-started)
3. [Navegacao](#3-navegacao)
4. [Design Tokens](#4-design-tokens)
5. [Biblioteca de Icones](#5-biblioteca-de-icones)
6. [Componentes UI](#6-componentes-ui)
7. [Graficos](#7-graficos)
8. [Ferramentas de Validacao](#8-ferramentas-de-validacao)
9. [Exportacao](#9-exportacao)
10. [Troubleshooting](#10-troubleshooting)
11. [FAQ](#11-faq)

---

## 1. Introducao

### O que e o Neoloop Design System Builder?

O Neoloop Design System Builder e uma plataforma visual para criar e gerenciar design systems profissionais. Com ele, voce pode:

- Definir e organizar design tokens (cores, tipografia, espacamento)
- Explorar e utilizar mais de 3.820 icones
- Criar e documentar componentes UI
- Visualizar graficos customizados
- Validar acessibilidade WCAG
- Exportar seu design system

### Para Quem e?

- **Designers:** Criem tokens visuais sem escrever codigo
- **Desenvolvedores:** Obtenham componentes e tokens prontos para uso
- **Product Managers:** Garantam consistencia visual no produto
- **Accessibility Specialists:** Validem compliance WCAG

### Requisitos do Sistema

| Requisito | Especificacao |
|-----------|---------------|
| Navegador | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| Resolucao | Minimo 1280x720 (recomendado 1920x1080) |
| Conexao | Internet para carregar icones |

---

## 2. Getting Started

### Passo 1: Acessar a Aplicacao

1. Abra seu navegador
2. Acesse [URL da aplicacao]
3. Aguarde o carregamento (< 3 segundos)

### Passo 2: Interface Principal

Ao carregar, voce vera a interface dividida em:

```
+---------------------------------------+
|           HEADER (Logo + Export)      |
+-------+-------------------------------+
|       |                               |
| NAV   |        CONTENT AREA           |
| BAR   |                               |
|       |                               |
+-------+-------------------------------+
```

- **Header:** Logo e botao de exportacao
- **Navigation Bar:** Menu lateral com todas as secoes
- **Content Area:** Area principal onde o conteudo e exibido

### Passo 3: Primeira Exploracao

Recomendamos explorar nesta ordem:

1. **Colors** - Veja a paleta de cores
2. **Typography** - Explore escalas de fontes
3. **Icons** - Navegue pelos 3.820+ icones
4. **Components** - Veja Button, Card, Forms

---

## 3. Navegacao

### Menu Principal

| Secao | Descricao | Icone |
|-------|-----------|-------|
| **Colors** | Paleta de cores e tokens | Palette |
| **Typography** | Escalas tipograficas | Type |
| **Spacing** | Sistema de espacamento | Ruler |
| **Icons** | Biblioteca de icones | Icons |
| **Charts** | Graficos customizaveis | BarChart |
| **Components** | Componentes UI | Component |
| **Validators** | Ferramentas de validacao | Check |

### Navegacao por Teclado

| Tecla | Acao |
|-------|------|
| Tab | Navegar entre elementos |
| Enter | Selecionar/Ativar |
| Escape | Fechar modais |
| Arrow Keys | Navegar em listas |

### Atalhos de Teclado

| Atalho | Acao |
|--------|------|
| Ctrl + E | Abrir Export Modal |
| Ctrl + F | Buscar (quando disponivel) |
| Ctrl + / | Ajuda |

---

## 4. Design Tokens

### 4.1 Cores (Colors)

A secao de cores permite visualizar e gerenciar sua paleta.

**Visualizacao:**
- Cores primarias, secundarias e neutras
- Cores semanticas (success, warning, error, info)
- Shades (50-900) para cada cor

**Acoes:**
- Clique em uma cor para copiar o valor hex
- Hover para ver informacoes detalhadas
- Use o color picker para personalizar

**Exemplo de Uso:**
```css
/* Cor primaria */
--color-primary-500: #3B82F6;

/* Cor semantica */
--color-success: #10B981;
```

### 4.2 Tipografia (Typography)

Sistema completo de escalas tipograficas.

**Escalas Disponiveis:**
- Display (48-72px)
- Heading (24-36px)
- Body (14-18px)
- Caption (10-12px)

**Propriedades:**
- Font family
- Font size
- Line height
- Letter spacing
- Font weight

**Exemplo de Uso:**
```css
/* Heading */
font-size: 24px;
line-height: 1.3;
font-weight: 600;
```

### 4.3 Espacamento (Spacing)

Sistema baseado em multiplos de 4px.

**Escala Padrao:**
| Token | Valor | Uso |
|-------|-------|-----|
| spacing-1 | 4px | Micro espacos |
| spacing-2 | 8px | Pequeno |
| spacing-3 | 12px | Medio-pequeno |
| spacing-4 | 16px | Medio |
| spacing-6 | 24px | Grande |
| spacing-8 | 32px | Extra grande |

---

## 5. Biblioteca de Icones

### 5.1 Navegando pelos Icones

A biblioteca inclui 3.820+ icones Lucide React.

**Busca:**
1. Digite o nome do icone no campo de busca
2. Resultados aparecem em tempo real
3. Busca funciona em ingles (ex: "arrow", "user", "home")

**Filtros:**
- Por categoria (arrows, user, media, etc.)
- Por estilo (outline, solid)

### 5.2 Usando um Icone

1. **Encontre o icone** usando busca ou navegacao
2. **Clique no icone** para seleciona-lo
3. **Copie o codigo:**
   - Nome do icone
   - Codigo React
   - Codigo SVG

**Exemplo de Codigo React:**
```jsx
import { ArrowRight } from 'lucide-react';

<ArrowRight size={24} color="#3B82F6" />
```

### 5.3 Personalizacao

Cada icone pode ser customizado:
- **Size:** 16px, 20px, 24px, 32px, 48px
- **Color:** Qualquer cor da paleta
- **Stroke Width:** 1, 1.5, 2, 2.5

---

## 6. Componentes UI

### 6.1 Button

Componente de botao com multiplas variantes.

**Variantes:**
| Variante | Uso |
|----------|-----|
| primary | Acao principal |
| secondary | Acao secundaria |
| outline | Acao terciaria |
| ghost | Acao sutil |
| link | Navegacao |
| destructive | Acoes perigosas |
| success | Confirmacao |
| warning | Alerta |

**Tamanhos:**
- xs (extra small)
- sm (small)
- md (medium - padrao)
- lg (large)
- xl (extra large)

**Estados:**
- Default
- Hover
- Active
- Focus
- Disabled
- Loading

**Exemplo:**
```jsx
<Button variant="primary" size="md">
  Salvar
</Button>

<Button variant="outline" size="sm" loading>
  Processando...
</Button>
```

### 6.2 Card

Componente de card versátil.

**Layouts:**
| Layout | Descricao |
|--------|-----------|
| default | Card padrao vertical |
| horizontal | Imagem a esquerda |
| media-top | Imagem no topo |
| media-bottom | Imagem no rodape |
| overlay | Texto sobre imagem |

**Personalizacao:**
- Shadow (sm, md, lg, xl)
- Border radius (sm, md, lg, full)
- Padding (sm, md, lg)

**Exemplo:**
```jsx
<Card>
  <Card.Header>Titulo</Card.Header>
  <Card.Body>Conteudo do card...</Card.Body>
  <Card.Footer>
    <Button>Acao</Button>
  </Card.Footer>
</Card>
```

### 6.3 Forms

9 componentes de formulario disponiveis.

**Componentes:**
| Componente | Descricao |
|------------|-----------|
| Input | Campo de texto |
| Select | Lista de opcoes |
| Checkbox | Caixa de selecao |
| Radio | Opcao unica |
| Switch | Toggle on/off |
| Textarea | Texto longo |
| DatePicker | Seletor de data |
| ColorPicker | Seletor de cor |
| Slider | Controle deslizante |

**Estados:**
- Default
- Focus
- Error
- Disabled
- Read-only

**Exemplo:**
```jsx
<Input
  label="Email"
  placeholder="seu@email.com"
  type="email"
  required
/>

<Select
  label="Pais"
  options={['Brasil', 'Portugal', 'EUA']}
/>
```

---

## 7. Graficos

### 7.1 Tipos de Graficos

| Tipo | Uso |
|------|-----|
| Line | Tendencias ao longo do tempo |
| Bar | Comparacoes entre categorias |
| Area | Volume ao longo do tempo |
| Pie | Proporcoes de um todo |

### 7.2 Personalizacao

**Cores:**
Os graficos usam automaticamente as cores do design system.

**Dados:**
Edite os dados diretamente na interface.

**Opcoes:**
- Legenda (show/hide)
- Grid (show/hide)
- Animacao (enable/disable)
- Tooltips (enable/disable)

---

## 8. Ferramentas de Validacao

### 8.1 Contrast Checker

Valida contraste de cores segundo WCAG.

**Como Usar:**
1. Selecione a cor de foreground (texto)
2. Selecione a cor de background
3. Veja o ratio de contraste calculado
4. Verifique o status:
   - Pass AAA (7:1+ para texto normal)
   - Pass AA (4.5:1+ para texto normal)
   - Fail (abaixo de 4.5:1)

**Regras WCAG:**
| Nivel | Texto Normal | Texto Grande |
|-------|-------------|--------------|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

### 8.2 Typography Validator

Valida escalas tipograficas.

**Verificacoes:**
- Scale ratio (1.067 a 1.618)
- Line height (1.2 a 1.8)
- Font sizes minimos (14px para body)

### 8.3 Spacing Validator

Valida sistema de espacamento.

**Verificacoes:**
- Multiplos de 4px
- Consistencia na escala
- Gaps entre valores

---

## 9. Exportacao

### 9.1 Formatos Disponiveis

| Formato | Descricao | Uso |
|---------|-----------|-----|
| JSON | Estrutura completa | Desenvolvimento |
| CSS Variables | Variaveis CSS | Web |
| SCSS Variables | Variaveis SCSS | Sass |

### 9.2 Como Exportar

1. Clique no botao **Export** no header
2. Selecione o formato desejado
3. Escolha quais tokens exportar:
   - Colors
   - Typography
   - Spacing
   - Shadows
   - Todos
4. Clique em **Download**

### 9.3 Exemplo de Export JSON

```json
{
  "colors": {
    "primary": {
      "50": "#EFF6FF",
      "100": "#DBEAFE",
      "500": "#3B82F6",
      "900": "#1E3A8A"
    }
  },
  "typography": {
    "heading": {
      "fontSize": "24px",
      "lineHeight": "1.3"
    }
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "4": "16px"
  }
}
```

---

## 10. Troubleshooting

### Problemas Comuns

#### Icones nao carregam
**Causa:** Problemas de conexao
**Solucao:** Verifique sua conexao e recarregue a pagina

#### Interface lenta
**Causa:** Muitos icones renderizados
**Solucao:** Use a busca para filtrar resultados

#### Export nao funciona
**Causa:** Popup bloqueado
**Solucao:** Permita popups para este site

#### Cores parecem diferentes
**Causa:** Calibracao do monitor
**Solucao:** Use os valores hex para referencia precisa

### Contato de Suporte

Se o problema persistir:
1. Abra uma issue em [GitHub Issues]
2. Inclua:
   - Descricao do problema
   - Passos para reproduzir
   - Navegador e versao
   - Screenshots (se aplicavel)

---

## 11. FAQ

### Perguntas Frequentes

**P: Posso usar offline?**
R: Parcialmente. A interface funciona offline, mas os icones precisam de conexao para carregar inicialmente.

**P: Meus dados sao salvos?**
R: Na v1.0, os dados sao salvos apenas localmente no navegador. Persistencia em nuvem vira na v1.1.

**P: Posso importar um design system existente?**
R: Importacao de templates vira na v1.1. Por enquanto, voce pode configurar manualmente.

**P: Os componentes funcionam com React?**
R: Sim! Os componentes sao construidos em React e podem ser copiados diretamente.

**P: Como reporto um bug?**
R: Abra uma issue no GitHub com detalhes do problema.

**P: Quando vem a proxima versao?**
R: v1.0.1 (bug fixes) estimado para Fev/2026. v1.1 (features) estimado para Mar/2026.

---

## Recursos Adicionais

- [Release Notes v1.0](/docs/00-OVERVIEW/v1.0-release-notes.md)
- [Changelog](/docs/00-OVERVIEW/v1.0-changelog.md)
- [Component Library Docs](/docs/04-IMPLEMENTATION/component-library-docs.md)
- [API Reference](/docs/04-IMPLEMENTATION/api-reference.md)

---

**Documento Gerado:** 2026-01-31
**Por:** @pm (Product Manager Agent)
**Versao:** 1.0

---

*"Um bom user guide e a ponte entre o produto e o usuario."*
