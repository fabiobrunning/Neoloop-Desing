# Branch Protection Rules

## Configuracao Manual Necessaria

Este documento descreve as regras de protecao de branch que devem ser configuradas manualmente no GitHub.

### Como Configurar

1. Va para: Repository Settings > Branches > Add rule
2. Configure conforme descrito abaixo

---

## Branch: `main`

### Branch name pattern
```
main
```

### Protect matching branches

- [x] **Require a pull request before merging**
  - [x] Require approvals: `1`
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners
  - [ ] Require approval of the most recent reviewable push

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Required status checks:
    - `lint-typecheck`
    - `test`
    - `build`
    - `security-audit`

- [x] **Require conversation resolution before merging**

- [x] **Require signed commits** (optional, recommended)

- [x] **Require linear history**

- [ ] **Require deployments to succeed before merging**

- [x] **Do not allow bypassing the above settings**

- [ ] **Restrict who can push to matching branches**

- [ ] **Allow force pushes**

- [ ] **Allow deletions**

---

## Branch: `develop`

### Branch name pattern
```
develop
```

### Protect matching branches

- [x] **Require a pull request before merging**
  - [x] Require approvals: `1`
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [ ] Require review from Code Owners

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Required status checks:
    - `lint-typecheck`
    - `test`
    - `build`

- [x] **Require conversation resolution before merging**

- [ ] **Require signed commits**

- [x] **Require linear history**

- [ ] **Do not allow bypassing the above settings**

- [ ] **Allow force pushes**

- [ ] **Allow deletions**

---

## Branch: `feature/**` e `fix/**`

Nao ha protecao especifica para branches de feature/fix. Desenvolvedores podem:
- Criar branches livremente
- Fazer push direto
- Deletar apos merge

---

## Verificar Configuracao via CLI

```bash
# Listar regras de protecao
gh api repos/{owner}/{repo}/branches/main/protection

# Verificar status checks requeridos
gh api repos/{owner}/{repo}/branches/main/protection/required_status_checks
```

---

## Troubleshooting

### PR nao pode ser merged

1. Verifique se todos os status checks passaram
2. Verifique se ha aprovacoes suficientes
3. Verifique se branch esta atualizada com main/develop

### Status check nao aparece

1. Verifique se o workflow rodou pelo menos uma vez
2. O nome do check deve ser exatamente igual ao nome do job

### Bypass necessario (emergencia)

Apenas administradores podem fazer bypass. Documente o motivo e crie issue de follow-up.
