# 🚀 Guia de Deployment - Neoloop Design System v1.0

Instruções para fazer deploy do design system em diferentes plataformas.

---

## 📍 Opção 1: Vercel (Recomendado)

### Pré-requisitos
- Conta no [Vercel](https://vercel.com) (gratuito)
- GitHub conectado à sua conta Vercel

### Passos de Deployment

#### 1. Conectar Repositório no Vercel

```bash
# Clone para local (se ainda não tiver)
git clone <your-repo-url>

# Push para GitHub (se ainda não fez)
git push origin main
```

#### 2. No dashboard Vercel

1. Acesse https://vercel.com/dashboard
2. Clique em **"Add New Project"**
3. Selecione seu repositório do Neoloop
4. Configure:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci`
5. Clique **"Deploy"**

#### 3. Configuração Automática

Vercel lerá `vercel.json` automaticamente:
- ✅ Build command
- ✅ Output directory
- ✅ Security headers
- ✅ Rewrite rules
- ✅ Cache policies

#### 4. Resultado

```
🎉 Deployment realizado!

URL: https://neo-design-system.vercel.app
ou seu-dominio-customizado.com

Builds automáticos a cada push para main
```

---

## 📍 Opção 2: GitHub Pages

### Pré-requisitos
- Repositório GitHub público
- GitHub Pages habilitado

### Passos

#### 1. Modificar vite.config.ts

```typescript
export default defineConfig({
  base: '/neoloop-design-system/', // Seu repo name
  // ... resto da config
});
```

#### 2. Build para GitHub Pages

```bash
npm run build
# Gera dist/ com base path correto
```

#### 3. Deploy via GitHub Actions

Criar `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm ci
      - run: npm run build

      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### 4. Ativar GitHub Pages

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `root`

```
URL: https://seu-usuario.github.io/neoloop-design-system
```

---

## 📍 Opção 3: Netlify

### Pré-requisitos
- Conta [Netlify](https://netlify.com) (gratuito)
- Repositório GitHub

### Passos

#### 1. Conectar no Netlify

```bash
npm install -D netlify-cli
```

#### 2. Configurar netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[dev]
  command = "npm run dev"
  port = 3000

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### 3. Deploy

```bash
# Manual
netlify deploy --prod

# Automático (conectar no dashboard)
# https://app.netlify.com
```

---

## 📍 Opção 4: Docker (Produção)

### Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/vercel.json /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Deploy

```bash
# Build image
docker build -t neoloop-design-system .

# Run localmente
docker run -p 80:80 neoloop-design-system

# Ou push para Docker Hub
docker push seu-usuario/neoloop-design-system
```

---

## 🔑 Variáveis de Ambiente

### Em Produção (Vercel)

1. Settings → Environment Variables
2. Adicione conforme necessário:

```
VITE_ENV=production
VITE_API_URL=https://api.seu-dominio.com
```

---

## 📊 Checklist de Deployment

### Antes do Deploy
- [ ] Build local funciona: `npm run build`
- [ ] Sem erros TypeScript: `npm run typecheck`
- [ ] Testes passam: `npm run test`
- [ ] Linting OK: `npm run lint`
- [ ] README atualizado
- [ ] Última versão commitada

### Após Deploy
- [ ] URL acessível
- [ ] Assets carregam
- [ ] Componentes renderizam
- [ ] Animações funcionam
- [ ] Responsive OK (mobile/tablet/desktop)
- [ ] Console sem erros
- [ ] Performance OK (Lighthouse)

---

## 🔒 Security Checklist

Vercel.json já inclui:
- ✅ Content Security Policy
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ HSTS headers
- ✅ Permissions Policy
- ✅ Cache-Control para assets

---

## 📈 Performance After Deployment

Métricas esperadas:

```
Core Web Vitals:
- LCP: < 2.5s ✓
- FID: < 100ms ✓
- CLS: < 0.1 ✓

Lighthouse:
- Performance: > 90
- Accessibility: 100
- Best Practices: 95+
- SEO: 100
```

---

## 🎯 Domínio Customizado

### Vercel
1. Settings → Domains
2. Adicione seu domínio
3. Configure DNS records conforme instruções

### GitHub Pages
```yaml
name: seu-dominio.com
```

Em `_config.yml` ou DNS settings.

---

## 🔄 CI/CD Pipeline

GitHub Actions já configurado em `.github/workflows/`:

- ✅ PR checks
- ✅ Auto-deploy main
- ✅ Security scanning
- ✅ Performance testing
- ✅ Storybook deploy

```bash
# Ver workflows
ls .github/workflows/
```

---

## 📞 Troubleshooting

### Build falha em Vercel

```bash
# Local build OK?
npm run build

# Se OK local, verificar:
1. Node version (node 18+)
2. npm version (9+)
3. Environment variables
4. Build logs no Vercel dashboard
```

### Assets 404

```
Verificar:
- base path em vite.config.ts
- output directory (dist/)
- Cache-Control headers
```

### Performance lenta

```bash
# Analisar bundle
npm run build
npm run test:bundle-size

# Lazy load components se necessário
import { Button } from '@/src/components/core'
// Usar dynamic imports:
const Button = lazy(() => import('@/src/components/core'))
```

---

## 📝 Pós-Deployment

### Próximos Passos

1. **Compartilhar URL**
   - Enviar link do site
   - Adicionar em documentação
   - Update no README

2. **Monitorar**
   - Vercel Analytics
   - Error tracking
   - Performance monitoring

3. **Manutenção**
   - Auto-updates de dependências (Dependabot)
   - Weekly deployments
   - Monitore security advisories

---

## 🎉 Exemplo: Deploy em Vercel

```bash
# 1. Commit final
git add .
git commit -m "chore: prepare for vercel deployment"

# 2. Push
git push origin main

# 3. Vercel detecta e faz deploy automaticamente
# Acompanhe em https://vercel.com/dashboard

# 4. Acesse
# https://neo-design-system.vercel.app
```

---

**Status:** Pronto para Deploy ✅
**Última atualização:** 3 de fevereiro de 2026
