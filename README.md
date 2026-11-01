# Entrega do Projeto Final - Clima App

**Aluno:** Luiz Guilherme Carvalho de Lima, Felipe da Silva Oliveira Figueiredo e Pedro Henrique Barros Sayao Ramos  
**Repositório GitHub:** https://github.com/luiz121106/clima-app  
**Imagem Docker Hub:** https://hub.docker.com/r/luiz121106/clima-app  

---

### Resumo dos Requisitos Cumpridos

1. **Aplicação e Testes:**
   - Aplicação em Next.js (TypeScript/Tailwind) integrada com Supabase e Open-Meteo.
   - Suíte de testes unitários configurada com Jest.

2. **Integração Contínua (CI/CD):**
   - Workflow do GitHub Actions (`.github/workflows/ci.yml`) a executar e a validar a compilação e os testes automaticamente em cada `push` e `pull_request`.

3. **Regras de Proteção de Branch:**
   - Branch `main` protegida por Ruleset exigindo a aprovação da verificação de status `testes` antes de permitir o *merge*.
   - Comprovativo em anexo (`pr-bloqueada.png`) demonstrando a rejeição e o bloqueio automático de uma PR com teste falhado.

4. **Containerização:**
   - Aplicação empacotada via `Dockerfile` e `.dockerignore`.
   - Imagem compilada e publicada com sucesso no Docker Hub: `docker push luiz121106/clima-app:latest`.
