const { defineConfig } = require("cypress");
require('dotenv').config();


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl : process.env.BASE_URL
    // supportFile: 'cypress/support/e2e.js'
  },
});
