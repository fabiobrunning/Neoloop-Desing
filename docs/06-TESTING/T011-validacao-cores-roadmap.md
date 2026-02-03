# T011: Validação de Cores WCAG - Roadmap Detalhado
**Sprint 1-2**
**Responsável:** @ux-design-expert (Lead) + @qa (Support)
**Prioridade:** Should Have
**Esforço:** 1.5 dias
**Data de Início:** 2026-01-27

---

## 📋 Objetivo

Auditar e validar todas as cores da paleta Neoloop Design System contra os standards WCAG 2.1 de contraste, garantindo acessibilidade mínima de **AA (4.5:1)** e ideal de **AAA (7:1)**.

---

## 🎯 Escopo

### Cores a Validar
```
Primary (9 tons)
├─ Primary-50 (#f0f9ff)
├─ Primary-100 (#e0f2fe)
├─ Primary-200 (#bae6fd)
├─ Primary-300 (#7dd3fc)
├─ Primary-400 (#38bdf8)
├─ Primary-500 (#0ea5e9)
├─ Primary-600 (#0284c7)
├─ Primary-700 (#0369a1)
├─ Primary-800 (#075985)
└─ Primary-900 (#0c4a6e)

Secondary (6 tons)
├─ Secondary-50 (#faf5ff)
├─ Secondary-100 (#f3e8ff)
├─ Secondary-300 (#d8b4fe)
├─ Secondary-500 (#a855f7)
├─ Secondary-700 (#7e22ce)
└─ Secondary-900 (#581c87)

Neutral (11 tons)
├─ Neutral-0 (#ffffff)
├─ Neutral-50 (#fafafa)
├─ Neutral-100 (#f5f5f5)
├─ Neutral-200 (#e5e5e5)
├─ Neutral-300 (#d4d4d4)
├─ Neutral-400 (#a3a3a3)
├─ Neutral-500 (#737373)
├─ Neutral-600 (#525252)
├─ Neutral-700 (#404040)
├─ Neutral-800 (#262626)
└─ Neutral-900 (#171717)

Semantic Colors
├─ Success-100 (#dcfce7), 500 (#22c55e), 700 (#15803d)
├─ Warning-100 (#fef3c7), 500 (#f59e0b), 700 (#b45309)
├─ Error-100 (#fee2e2), 500 (#ef4444), 700 (#b91c1c)
└─ Info-100 (#dbeafe), 500 (#3b82f6), 700 (#1d4ed8)

Dark Mode Variants (quando aplicável)
└─ [Inversões de cores para dark mode]
```

### Combinações a Testar
**Total estimado: ~200-300 combinações**

1. **Texto Foreground com Backgrounds**
   - Primary-900 (texto escuro) + Neutral-0 (branco)
   - Primary-900 + Neutral-50 (cinza muito claro)
   - Primary-600 (texto médio) + Neutral-0
   - Neutral-900 (texto preto) + backgrounds variados
   - Etc.

2. **Estados Interativos**
   - Button default + backgrounds
   - Button hover + backgrounds
   - Button disabled + backgrounds
   - Link + backgrounds
   - Link visited + backgrounds

3. **Backgrounds Semânticos**
   - Success-100 + Success-700 (texto de sucesso)
   - Error-100 + Error-700 (texto de erro)
   - Warning-100 + Warning-700 (texto de aviso)
   - Info-100 + Info-700 (texto informativo)

4. **Dark Mode**
   - Mesmas combinações, invertidas
   - Validar tokens de dark mode

---

## 🔄 Processo de Validação

### Passo 1: Extração da Paleta (30 min)

**Tarefa:** Extrair todas as cores do projeto

**Como:**
1. Abrir `/src/tokens/colors.css` (ou arquivo equivalente)
2. Extrair valores HEX de cada cor
3. Criar arquivo `neoloop-palette.json` com estrutura:

```json
{
  "primary": {
    "50": { "hex": "#f0f9ff", "rgb": "240, 249, 255" },
    "100": { "hex": "#e0f2fe", "rgb": "224, 242, 254" }
    // ... todos os tons
  },
  "secondary": { /* ... */ },
  "neutral": { /* ... */ },
  "semantic": { /* ... */ }
}
```

**Verificação:**
- [ ] Todos os 26 cores primárias extraídas
- [ ] Todos os 13 tons neutral extraídos
- [ ] Todas as semantic colors incluídas
- [ ] Dark mode variants (se aplicável)

---

### Passo 2: Teste de Contraste (1-2 horas)

**Tarefa:** Calcular contraste para cada combinação

**Ferramenta:** WebAIM Contrast Ratio Tool
- Site: https://contrast-ratio.com/
- Método: Manual ou API (verificar disponibilidade)

**Algoritmo WCAG 2.1:**
```
Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
onde:
- L1 = luminância da cor mais clara
- L2 = luminância da cor mais escura

Luminância (L) = 0.2126 * R + 0.7152 * G + 0.0722 * B
(onde R, G, B são normalizados 0-1)
```

**Formato de Output:**
```json
{
  "test_id": "primary-900_on_neutral-0",
  "foreground": {
    "name": "Primary-900",
    "hex": "#0c4a6e",
    "rgb": "12, 74, 110"
  },
  "background": {
    "name": "Neutral-0",
    "hex": "#ffffff",
    "rgb": "255, 255, 255"
  },
  "contrast_ratio": 10.5,
  "wcag_aa": true,
  "wcag_aaa": true,
  "status": "PASS_AAA"
}
```

**Verificação:**
- [ ] Todas as 200-300 combinações testadas
- [ ] Cada teste documentado
- [ ] Ratios calculados com precisão

---

### Passo 3: Análise de Gaps (1 hora)

**Tarefa:** Identificar combinações com baixo contraste

**Critérios WCAG:**
- 🟢 **PASS AAA:** Ratio ≥ 7:1 (ideal)
- 🟡 **PASS AA:** Ratio ≥ 4.5:1 (mínimo aceitável)
- 🔴 **FAIL:** Ratio < 4.5:1 (inacessível)

**Análise:**
```
Summary:
- Total tests: 250
- PASS AAA: 180 (72%)
- PASS AA: 50 (20%)
- FAIL: 20 (8%)

Issues Found:
1. Neutral-600 on Neutral-100: 2.5:1 (FAIL)
   Context: Body text on light background
   Severity: HIGH

2. Neutral-500 on Neutral-0: 3.1:1 (FAIL)
   Context: Tertiary text on white
   Severity: MEDIUM

3. Primary-400 on Primary-100: 3.8:1 (AA borderline)
   Context: Border on light background
   Severity: LOW
```

**Verificação:**
- [ ] Todas as falhas identificadas
- [ ] Severidade classificada
- [ ] Contexto documentado

---

### Passo 4: Sugestões de Alternativas (1 hora)

**Tarefa:** Propor cores corrigidas mantendo consistência de paleta

**Estratégia:**
1. Para cada cor que falha, ajustar luminância
2. Preservar hue (matiz) - manter "cor" visualmente
3. Encontrar valor que passa em AAA (7:1)
4. Validar novo valor na paleta

**Exemplo:**
```
Current: Neutral-600 (#525252) on Neutral-100 (#f5f5f5)
Ratio: 2.5:1 (FAIL)
Issue: Texto secundário ilegível em background claro

Solution 1: Escurecer texto
New Neutral-600: #3a3a3a (mais escuro)
New Ratio: 6.8:1 (PASS AAA) ✅

Solution 2: Usar cor existente
Use Neutral-700: #404040 instead
Ratio: 5.2:1 (PASS AA) ✅

Recommendation: Use Solution 1 (Neutral-600 adjusted)
Rationale: Melhor contraste, mantém familiaridade de cor
```

**Verificação:**
- [ ] Cada cor com falha tem alternativa sugerida
- [ ] Alternativas testadas e validadas
- [ ] Rationale documentada

---

### Passo 5: Documentação (1 hora)

**Tarefa:** Criar relatório profissional de validação

**Arquivo 1: `WCAG-contrast-audit.md`**
```markdown
# WCAG 2.1 Contrast Validation Report
## Neoloop Design System - 2026-01-27

### Executive Summary
- Total colors: 26
- Total tests: 250
- PASS AAA: 180 (72%)
- PASS AA: 50 (20%)
- FAIL: 20 (8%)

### Critical Issues (3)
[Listar issues críticas]

### Recommendations
[Listar ajustes recomendados]

### Detailed Results
[Tabelas de combinações]

### Testing Methodology
[Explicar como foi testado]
```

**Arquivo 2: `contrast-validation-results.json`**
```json
{
  "metadata": {
    "project": "Neoloop Design System",
    "date": "2026-01-27",
    "validator": "@ux-design-expert",
    "wcag_version": "2.1"
  },
  "summary": {
    "total_tests": 250,
    "pass_aaa": 180,
    "pass_aa": 50,
    "fail": 20
  },
  "tests": [
    {
      "id": "primary-900_on_neutral-0",
      "result": "PASS_AAA",
      "ratio": 10.5
    }
  ],
  "issues": [
    {
      "id": "neutral-600_on_neutral-100",
      "current_ratio": 2.5,
      "required_ratio": 4.5,
      "suggestion": "Use Neutral-700 instead"
    }
  ]
}
```

**Verificação:**
- [ ] Documento Markdown completo
- [ ] JSON com dados estruturados
- [ ] Tabelas com todas as combinações
- [ ] Recomendações claras

---

## 🛠️ Implementação de Warnings na UI

### Passo 6: Integração em ColorTokensView (4-6 horas)

**Responsável:** @dev
**Apoio:** @ux-design-expert

**Tarefa:** Adicionar warnings visuais quando contraste é insuficiente

**Implementação:**
```typescript
// ColorTokensView.tsx

interface ColorValidation {
  hex: string;
  wcagAA: boolean;
  wcagAAA: boolean;
  warningLevel: 'none' | 'warning' | 'error';
  warningMessage?: string;
}

function ColorItem({ color }: { color: Color }) {
  const validation = validateContrast(color);

  return (
    <div className={`color-item ${validation.warningLevel}`}>
      <div className="color-preview" style={{ background: color.hex }} />

      <div className="color-info">
        <h3>{color.name}</h3>
        <p className="hex-value">{color.hex}</p>

        {validation.warningMessage && (
          <div className={`warning ${validation.warningLevel}`}>
            {validation.warningLevel === 'error' && '⚠️ '}
            {validation.warningMessage}
          </div>
        )}

        <div className="wcag-status">
          <span className={validation.wcagAAA ? 'pass' : 'fail'}>
            AAA {validation.wcagAAA ? '✅' : '❌'}
          </span>
          <span className={validation.wcagAA ? 'pass' : 'fail'}>
            AA {validation.wcagAA ? '✅' : '❌'}
          </span>
        </div>
      </div>
    </div>
  );
}
```

**UI Display:**
```
┌─────────────────────────────────────────┐
│ Primary-600 (#0284c7)                   │
├─────────────────────────────────────────┤
│ [Color preview square]                  │
│                                         │
│ ⚠️ Check contrast: May not meet AA      │
│ on some backgrounds                     │
│                                         │
│ WCAG Status:                            │
│ AAA ✅  AA ✅                            │
└─────────────────────────────────────────┘
```

**Verificação:**
- [ ] Warnings aparecem para cores problemáticas
- [ ] Status WCAG visível para cada cor
- [ ] Mensagens claras e educacionais

---

## 📊 Matriz de Testes

### Exemplo de Tabela Final

| Foreground | Background | Ratio | AA | AAA | Status |
|-----------|-----------|-------|-----|-----|--------|
| Primary-900 | Neutral-0 | 10.5:1 | ✅ | ✅ | PASS_AAA |
| Primary-600 | Neutral-0 | 5.2:1 | ✅ | ⚠️ | PASS_AA |
| Neutral-900 | Neutral-50 | 15.1:1 | ✅ | ✅ | PASS_AAA |
| Neutral-600 | Neutral-100 | 2.5:1 | ❌ | ❌ | **FAIL** |
| Neutral-500 | Neutral-0 | 3.1:1 | ❌ | ❌ | **FAIL** |
| Success-700 | Success-100 | 6.8:1 | ✅ | ✅ | PASS_AAA |
| Error-700 | Error-100 | 7.2:1 | ✅ | ✅ | PASS_AAA |

---

## 📈 Critério de Sucesso

### Mínimo Aceitável (MVP)
- [x] 100% de cores validadas contra WCAG AA (4.5:1)
- [x] Documento de audit publicado
- [x] JSON de validação gerado
- [x] Warnings implementados na UI

### Ideal
- [x] 80%+ de cores WCAG AAA compliant (7:1)
- [x] Sugestões de alternativas documentadas
- [x] Tabela interativa de contrastes
- [x] Educação sobre WCAG integrada

### Stretch Goal
- [x] Tool visual de contrast checker
- [x] Sugestões de cores acessíveis automáticas
- [x] Integração com algoritmo de geração de paletas

---

## 📅 Timeline Detalhado

| Tarefa | Duração | Responsável | Status |
|--------|---------|-------------|--------|
| Extração de paleta | 30 min | @ux-design-expert | 🟡 Ready |
| Teste de contraste | 2h | @ux-design-expert | 🟡 Ready |
| Análise de gaps | 1h | @ux-design-expert | 🟡 Ready |
| Sugestões de cores | 1h | @ux-design-expert | 🟡 Ready |
| Documentação | 1h | @ux-design-expert | 🟡 Ready |
| **Subtotal UX** | **5.5h** | | |
| Implementação UI | 4-6h | @dev | 🔵 Pending |
| Testing | 1-2h | @qa | 🔵 Pending |
| **Total Task** | **10.5-13.5h** | | |
| **Task Duration** | **1.5 dias** | | |

---

## 📚 Referências

### WCAG 2.1 Standards
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum)
- [Contrast Ratio Formula](https://www.w3.org/TR/WCAG20/#relativeluminancedef)

### Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio](https://contrast-ratio.com/)
- [Accessible Colors](https://accessible-colors.com/)

### Similar Projects
- Tailwind CSS color palette validation
- Material Design color guidelines
- Bootstrap color contrast standards

---

## ✅ Checklist de Conclusão

Quando esta task for completa:

- [ ] Arquivo `neoloop-palette.json` criado
- [ ] Arquivo `contrast-validation-results.json` populado
- [ ] Documento `WCAG-contrast-audit.md` publicado
- [ ] Warnings implementados em ColorTokensView
- [ ] Zero issues críticos de contraste
- [ ] 100% WCAG AA compliance
- [ ] 80%+ WCAG AAA compliance
- [ ] Team notificado de resultados
- [ ] Próximas ações planejadas

---

## 🚀 Próximos Passos Após T011

1. **T012:** Validação de Tipografia
2. **Implementação de UI warnings** (colaborar com @dev)
3. **Publicação de Accessibility Guidelines**
4. **Planning para T040 (Contrast Checker tool)**

---

**Responsável:** @ux-design-expert
**Data de Início:** 2026-01-27
**Data Alvo de Conclusão:** 2026-02-03
**Status:** 🟡 Ready to Start
