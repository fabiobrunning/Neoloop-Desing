# Local Development Setup Guide

## Neo Design System - Guia de Configuracao Local

### Pre-requisitos

Antes de comecar, certifique-se de ter instalado:

- **Node.js** >= 18.0.0 ([download](https://nodejs.org/))
- **npm** >= 9.0.0 (vem com Node.js)
- **Git** >= 2.30.0 ([download](https://git-scm.com/))
- **VS Code** (recomendado) ([download](https://code.visualstudio.com/))

### Verificar Versoes

```bash
node --version  # Deve ser >= 18.0.0
npm --version   # Deve ser >= 9.0.0
git --version   # Deve ser >= 2.30.0
```

---

## Configuracao Inicial

### 1. Clonar o Repositorio

```bash
# Via HTTPS
git clone https://github.com/fabiobrunning/neo-design-system.git

# Via SSH
git clone git@github.com:fabiobrunning/neo-design-system.git

cd neo-design-system
```

### 2. Navegar para o Diretorio da Aplicacao

```bash
cd neo-design-system-builder
```

### 3. Instalar Dependencias

```bash
npm ci
```

> **Nota:** Usamos `npm ci` em vez de `npm install` para garantir instalacao deterministica baseada no `package-lock.json`.

### 4. Configurar Variaveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env.local

# Editar com suas credenciais
nano .env.local  # ou use seu editor preferido
```

**Conteudo do `.env.local`:**
```bash
GEMINI_API_KEY=sua_chave_api_aqui
VITE_ENV=development
VITE_API_URL=http://localhost:3000
```

### 5. Verificar Configuracao

```bash
# Rodar verificacoes
npm run lint
npm run typecheck
npm test
```

---

## Comandos de Desenvolvimento

### Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3005

### Build de Producao

```bash
npm run build
```

### Preview do Build

```bash
npm run preview
```

### Rodar Testes

```bash
# Testes em modo watch
npm run test:watch

# Testes com coverage
npm run test:coverage

# Testes UI (interface visual)
npm run test:ui
```

### Linting e Formatacao

```bash
# Verificar lint
npm run lint

# Corrigir lint automaticamente
npm run lint:fix

# Verificar formatacao
npm run format:check

# Formatar codigo
npm run format
```

### Type Checking

```bash
npm run typecheck
```

---

## Estrutura do Projeto

```
neo-design-system-builder/
├── components/          # Componentes React
├── src/
│   ├── components/      # Componentes adicionais
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilitarios e helpers
│   ├── test/            # Configuracao de testes
│   └── types/           # Definicoes TypeScript
├── public/              # Assets estaticos
├── dist/                # Build output (gitignored)
├── coverage/            # Coverage reports (gitignored)
├── node_modules/        # Dependencias (gitignored)
├── .eslintrc.cjs        # Configuracao ESLint
├── .prettierrc          # Configuracao Prettier
├── package.json         # Dependencias e scripts
├── tailwind.config.js   # Configuracao Tailwind CSS
├── tsconfig.json        # Configuracao TypeScript
├── vite.config.ts       # Configuracao Vite
└── vitest.config.ts     # Configuracao Vitest
```

---

## Extensoes VS Code Recomendadas

Crie ou edite `.vscode/extensions.json`:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "usernamehw.errorlens",
    "eamodio.gitlens"
  ]
}
```

### Configuracoes VS Code Recomendadas

Crie ou edite `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

---

## Workflow de Desenvolvimento

### 1. Criar Branch

```bash
# Para nova feature
git checkout -b feature/nome-da-feature

# Para bug fix
git checkout -b fix/descricao-do-bug
```

### 2. Fazer Alteracoes

- Escreva codigo seguindo os padroes do projeto
- Adicione testes para novas funcionalidades
- Mantenha commits pequenos e focados

### 3. Commit

```bash
# Verificar mudancas
git status

# Adicionar arquivos
git add .

# Commit seguindo Conventional Commits
git commit -m "feat: adiciona componente Button"
# ou
git commit -m "fix: corrige alinhamento do header"
```

### 4. Push e PR

```bash
# Push da branch
git push origin feature/nome-da-feature

# Criar PR via GitHub CLI
gh pr create --title "feat: descricao" --body "Descricao detalhada"
```

---

## Troubleshooting

### Erro: `node_modules` corrompido

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: TypeScript nao reconhece tipos

```bash
# Reiniciar servidor TS no VS Code
# Ctrl+Shift+P > "TypeScript: Restart TS Server"

# Ou reinstalar tipos
npm install @types/react @types/react-dom -D
```

### Erro: ESLint muito lento

```bash
# Verificar se .eslintcache existe
ls -la .eslintcache

# Limpar cache
rm .eslintcache
```

### Erro: Testes falhando misteriosamente

```bash
# Limpar cache do Vitest
rm -rf node_modules/.vitest
npm test
```

### Erro: Build falha em CI mas funciona local

```bash
# Simular ambiente CI localmente
CI=true npm run build
CI=true npm test
```

---

## Scripts Uteis

### Verificar Saude do Projeto

```bash
# Rodar todas as verificacoes
npm run lint && npm run typecheck && npm test && npm run build
```

### Atualizar Dependencias

```bash
# Ver pacotes desatualizados
npm outdated

# Atualizar patch/minor
npm update

# Atualizar major (cuidado!)
npx npm-check-updates -u
npm install
```

### Limpar Projeto

```bash
# Remover arquivos gerados
rm -rf dist coverage node_modules/.vitest

# Reinstalar tudo
rm -rf node_modules package-lock.json
npm install
```

---

## Recursos Adicionais

- [Documentacao React](https://react.dev/)
- [Documentacao TypeScript](https://www.typescriptlang.org/docs/)
- [Documentacao Vite](https://vitejs.dev/guide/)
- [Documentacao Vitest](https://vitest.dev/guide/)
- [Documentacao Tailwind CSS](https://tailwindcss.com/docs)

---

## Precisa de Ajuda?

- Crie uma issue no GitHub
- Pergunte no canal #dev-help
- Consulte a documentacao em `/docs`
