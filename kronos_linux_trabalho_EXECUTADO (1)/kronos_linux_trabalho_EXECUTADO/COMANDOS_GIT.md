# Comandos Git/Git Flow sugeridos

```bash
git init
git checkout -b main
git add .
git commit -m "chore: estrutura inicial do projeto KRONOS Linux"

git checkout -b develop
git checkout -b feature/dashboard-linux
git add .
git commit -m "feat: adiciona dashboard de monitoramento Linux"

git checkout develop
git merge feature/dashboard-linux

git checkout -b feature/scripts-linux
git add scripts/
git commit -m "feat: adiciona scripts de automacao Linux"

git checkout develop
git merge feature/scripts-linux

git checkout main
git merge develop
git tag v1.0.0
```
