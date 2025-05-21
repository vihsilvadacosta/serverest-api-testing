# Serverest API - Testes Automatizados com Cypress e Allure

Este repositório contém a automação de testes para a API [Serverest.dev](https://serverest.dev), utilizando:

- 🧪 [Cypress](https://www.cypress.io/) para testes de API REST
- 📊 [Allure Report](https://docs.qameta.io/allure/) para relatórios interativos
- ⚙️ GitHub Actions para integração contínua (CI/CD)

![Testes Cypress](https://github.com/vihsilvadacosta/serverest-api-auth-dinamica/actions/workflows/cypress-ci.yml/badge.svg)

---

## 🚀 Como executar localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/vihsilvadacosta/serverest-api-auth-dinamica.git
cd serverest-api-auth-dinamica
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar os testes com Allure habilitado

```bash
npx cypress run --env allure=true
```

### 4. Gerar e abrir o relatório Allure

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

---

## ✅ Cenários de teste implementados

- ✅ Cadastrar e remover carrinho autenticado
- ✅ Listar carrinhos cadastrados
- ✅ Buscar carrinho por ID
- 🔐 Autenticação dinâmica com Cypress.env()
- 🔒 Nenhum token ou credencial exposto no código

---

## ⚙️ CI com GitHub Actions

A cada `push` ou `pull request` na branch `main`, os testes Cypress são executados automaticamente via GitHub Actions.  
O relatório Allure é gerado no runner.

Acesse os resultados na aba [Actions](https://github.com/vihsilvadacosta/serverest-api-auth-dinamica/actions).

---

## 📁 Estrutura do projeto

```
.
├── cypress/
│   ├── e2e/
│   │   └── carrinhos/carrinhos.cy.js
│   └── support/
│       ├── apiHelper.js
│       └── e2e.js
├── cypress.config.js
├── package.json
├── .github/
│   └── workflows/
│       └── cypress-ci.yml
```

---

## 🛡️ Boas práticas aplicadas

- Variáveis de ambiente para login e token
- Encadeamento com Cypress `.then()` para sincronia segura
- Testes independentes com autenticação real
- Geração de relatórios interativos

---

