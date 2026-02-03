# Deployment Runbook

## Neo Design System - Deployment Guide

### Overview

Este documento descreve os procedimentos de deployment para o Neo Design System Builder, incluindo ambientes de staging e production.

---

## Ambientes

### Staging

- **URL:** `https://neo-design-system-staging.vercel.app`
- **Branch:** `develop`
- **Auto-deploy:** Sim (a cada push em `develop`)
- **Manual deploy:** Workflow `deploy-staging.yml`

### Production

- **URL:** `https://neo-design-system.vercel.app`
- **Branch:** `main`
- **Auto-deploy:** Nao (apenas manual)
- **Manual deploy:** Workflow `deploy-production.yml`

---

## Pre-requisitos

### Secrets Configurados no GitHub

```
VERCEL_TOKEN          # Token de API do Vercel
VERCEL_ORG_ID         # ID da organizacao no Vercel
VERCEL_PROJECT_ID     # ID do projeto no Vercel
CODECOV_TOKEN         # Token para upload de coverage
SLACK_WEBHOOK_URL     # Webhook para notificacoes (opcional)
STAGING_API_URL       # URL da API de staging
PRODUCTION_API_URL    # URL da API de production
```

### Environments Configurados no GitHub

1. **staging**
   - Protection rules: Nenhuma
   - Secrets especificos de staging

2. **production**
   - Protection rules: Required reviewers
   - Secrets especificos de production

---

## Procedimentos de Deployment

### Deploy para Staging

#### Via Push (Automatico)

```bash
git checkout develop
git pull origin develop
# Fazer alteracoes
git add .
git commit -m "feat: minha alteracao"
git push origin develop
# Deploy automatico sera iniciado
```

#### Via Workflow Manual

1. Acesse GitHub Actions
2. Selecione "Deploy to Staging"
3. Clique em "Run workflow"
4. Selecione a branch (default: develop)
5. Opcional: marque "Skip tests" se necessario
6. Clique em "Run workflow"

### Deploy para Production

#### Passo a Passo

1. **Verificar que staging esta OK**
   ```bash
   # Testar staging manualmente
   curl -s https://neo-design-system-staging.vercel.app
   ```

2. **Criar PR de develop para main**
   ```bash
   gh pr create --base main --head develop --title "Release vX.X.X"
   ```

3. **Aguardar aprovacao do PR**

4. **Fazer merge do PR**
   ```bash
   gh pr merge --merge
   ```

5. **Iniciar deploy de production**
   - Acesse GitHub Actions
   - Selecione "Deploy to Production"
   - Clique em "Run workflow"
   - Digite "DEPLOY" no campo de confirmacao
   - Opcional: adicione tag de versao (ex: v1.0.0)
   - Clique em "Run workflow"

6. **Monitorar deployment**
   - Acompanhe o progresso no GitHub Actions
   - Verifique notificacoes no Slack

7. **Verificar production**
   ```bash
   curl -s https://neo-design-system.vercel.app/build-info.json
   ```

---

## Rollback

### Rollback Rapido via Vercel

1. Acesse o dashboard do Vercel
2. Va para Deployments
3. Encontre o deployment anterior funcionando
4. Clique em "..." > "Promote to Production"

### Rollback via Workflow

1. Acesse GitHub Actions
2. Selecione "Deploy to Production"
3. Clique em "Run workflow"
4. Digite "DEPLOY" na confirmacao
5. No campo "rollback_to", insira o ID do deployment anterior
6. Clique em "Run workflow"

### Rollback via Git

```bash
# Reverter ultimo commit em main
git checkout main
git revert HEAD
git push origin main

# Re-deployar
# Iniciar workflow de production normalmente
```

---

## Troubleshooting

### Build Falhou

1. Verifique os logs do workflow
2. Problemas comuns:
   - Erro de TypeScript: `npm run typecheck` localmente
   - Erro de lint: `npm run lint` localmente
   - Teste falhando: `npm test` localmente

### Deploy Falhou

1. Verifique se os secrets estao configurados corretamente
2. Verifique o status do Vercel: https://vercel-status.com
3. Verifique os logs no Vercel Dashboard

### Health Check Falhou

1. Aguarde alguns minutos (propagacao DNS)
2. Verifique se o build foi bem sucedido
3. Verifique logs do Vercel para erros de runtime

### Notificacao Nao Chegou

1. Verifique se SLACK_WEBHOOK_URL esta configurado
2. Verifique se o canal do Slack existe
3. Teste o webhook manualmente

---

## Checklist de Deploy

### Pre-Deploy

- [ ] Todos os testes passam localmente
- [ ] Lint esta limpo
- [ ] TypeScript compila sem erros
- [ ] Build local funciona
- [ ] PR foi revisado e aprovado

### Durante Deploy

- [ ] Workflow iniciou corretamente
- [ ] Build completou com sucesso
- [ ] Deploy para Vercel completou
- [ ] Health check passou

### Pos-Deploy

- [ ] Aplicacao esta acessivel
- [ ] Funcionalidades principais funcionam
- [ ] Nenhum erro no console
- [ ] Notificacao de sucesso recebida
- [ ] Documentar qualquer issue encontrada

---

## Contatos

| Funcao | Contato |
|--------|---------|
| DevOps Lead | @fabiobrunning |
| Backend Lead | @fabiobrunning |
| Frontend Lead | @fabiobrunning |

---

## Historico de Mudancas

| Data | Versao | Mudanca |
|------|--------|---------|
| 2026-01-30 | 1.0.0 | Criacao inicial do documento |
