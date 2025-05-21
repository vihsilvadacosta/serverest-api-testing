const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://serverest.dev",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.js",
    env: {
      usuario_email: "fulano@qa.com",
      usuario_senha: "teste"
    },
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    }
  }
});
