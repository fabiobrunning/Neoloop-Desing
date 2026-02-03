# Incident Response Guide

## Neo Design System - Guia de Resposta a Incidentes

### Objetivo

Este documento estabelece os procedimentos para resposta a incidentes de seguranca e operacionais no Neo Design System.

---

## Classificacao de Severidade

### Severidade 1 - Critica

- **Impacto:** Sistema totalmente indisponivel
- **Exemplo:** Aplicacao nao carrega, erro 500 generalizado
- **SLA de Resposta:** 15 minutos
- **SLA de Resolucao:** 1 hora

### Severidade 2 - Alta

- **Impacto:** Funcionalidade principal comprometida
- **Exemplo:** Componentes nao renderizam, erros de JavaScript
- **SLA de Resposta:** 30 minutos
- **SLA de Resolucao:** 4 horas

### Severidade 3 - Media

- **Impacto:** Funcionalidade secundaria afetada
- **Exemplo:** Performance degradada, UI quebrada em browser especifico
- **SLA de Resposta:** 2 horas
- **SLA de Resolucao:** 24 horas

### Severidade 4 - Baixa

- **Impacto:** Problema menor, nao afeta usuarios
- **Exemplo:** Warning no console, documentacao desatualizada
- **SLA de Resposta:** 24 horas
- **SLA de Resolucao:** 1 semana

---

## Fluxo de Resposta

### 1. Deteccao

**Fontes de Deteccao:**
- Monitoramento automatico (Vercel Analytics)
- Alertas do GitHub Actions
- Reports de usuarios
- Testes automatizados

**Acao Imediata:**
```bash
# Verificar status do servico
curl -s -o /dev/null -w "%{http_code}" https://neo-design-system.vercel.app

# Verificar build info
curl -s https://neo-design-system.vercel.app/build-info.json
```

### 2. Triagem

**Perguntas para Classificacao:**
1. O sistema esta totalmente indisponivel?
2. Quantos usuarios sao afetados?
3. Qual funcionalidade esta comprometida?
4. Quando o problema comecou?
5. Houve deployment recente?

### 3. Comunicacao

**Severidade 1-2:**
```
Canal: #incidents
Formato:
[INCIDENTE] [SEV-X] Titulo do Incidente
- Impacto: Descricao do impacto
- Status: Investigando/Mitigando/Resolvido
- ETA: Estimativa de resolucao
- Responsavel: @usuario
```

### 4. Investigacao

**Checklist de Investigacao:**

- [ ] Verificar logs do Vercel Dashboard
- [ ] Verificar ultimo deployment
- [ ] Verificar GitHub Actions recentes
- [ ] Verificar metricas de performance
- [ ] Verificar mudancas de codigo recentes
- [ ] Verificar status de dependencias externas

**Comandos Uteis:**
```bash
# Ver commits recentes
git log --oneline -10

# Ver deploys recentes no Vercel
vercel ls

# Verificar health
curl -v https://neo-design-system.vercel.app
```

### 5. Mitigacao

**Opcoes de Mitigacao:**

1. **Rollback Rapido**
   ```bash
   # Via Vercel CLI
   vercel rollback [deployment-url]
   ```

2. **Hotfix**
   ```bash
   git checkout main
   git checkout -b hotfix/nome-do-fix
   # Fazer correcao
   git commit -m "fix: descricao da correcao"
   git push origin hotfix/nome-do-fix
   # Criar PR urgente
   gh pr create --title "HOTFIX: descricao" --body "Correcao urgente para..."
   ```

3. **Feature Flag (se disponivel)**
   - Desabilitar feature problematica via environment variables

### 6. Resolucao

**Documentar:**
- Root cause
- Acoes tomadas
- Timeline completo
- Impacto real

### 7. Post-Mortem

**Template de Post-Mortem:**

```markdown
# Post-Mortem: [Titulo do Incidente]

## Resumo
- **Data:** YYYY-MM-DD
- **Duracao:** XX horas/minutos
- **Severidade:** X
- **Impacto:** Descricao do impacto

## Timeline
- HH:MM - Incidente detectado
- HH:MM - Equipe notificada
- HH:MM - Investigacao iniciada
- HH:MM - Root cause identificado
- HH:MM - Mitigacao aplicada
- HH:MM - Servico restaurado

## Root Cause
Descricao detalhada da causa raiz.

## Resolucao
Descricao das acoes tomadas para resolver.

## Licoes Aprendidas
- O que funcionou bem?
- O que poderia melhorar?

## Acoes de Follow-up
- [ ] Acao 1 - Responsavel - Prazo
- [ ] Acao 2 - Responsavel - Prazo

## Metricas de Impacto
- Usuarios afetados: XX
- Requests falhados: XX
- Tempo de indisponibilidade: XX min
```

---

## Playbooks Especificos

### Playbook: Aplicacao Indisponivel

1. **Verificar Vercel Status**
   - https://vercel-status.com

2. **Verificar DNS**
   ```bash
   dig neo-design-system.vercel.app
   ```

3. **Verificar Deployment**
   ```bash
   vercel ls
   ```

4. **Rollback se necessario**
   ```bash
   vercel rollback [previous-deployment]
   ```

### Playbook: Build Falhando

1. **Verificar logs do GitHub Actions**

2. **Reproduzir localmente**
   ```bash
   npm ci
   npm run lint
   npm run typecheck
   npm run build
   ```

3. **Identificar commit problematico**
   ```bash
   git bisect start
   git bisect bad HEAD
   git bisect good [commit-bom]
   # Testar cada commit
   npm run build
   ```

### Playbook: Vulnerabilidade de Seguranca

1. **Avaliar severidade** (CVSS score)

2. **Verificar se esta em producao**
   ```bash
   npm audit
   ```

3. **Aplicar patch**
   ```bash
   npm audit fix
   # ou
   npm update [pacote-vulneravel]
   ```

4. **Testar**
   ```bash
   npm test
   npm run build
   ```

5. **Deploy urgente** (seguir processo de hotfix)

---

## Contatos de Emergencia

| Funcao | Contato | Horario |
|--------|---------|---------|
| DevOps Lead | @fabiobrunning | 24/7 |
| Backup | @fabiobrunning | 24/7 |

---

## Ferramentas

| Ferramenta | Uso | URL |
|------------|-----|-----|
| Vercel Dashboard | Deployments, Logs | https://vercel.com/dashboard |
| GitHub Actions | CI/CD Logs | https://github.com/[repo]/actions |
| Slack | Comunicacao | #incidents |

---

## Historico de Revisoes

| Data | Versao | Autor | Mudancas |
|------|--------|-------|----------|
| 2026-01-30 | 1.0.0 | @fabiobrunning | Versao inicial |
