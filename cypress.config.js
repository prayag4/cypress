const { defineConfig } = require("cypress");
require('dotenv').config();


module.exports = defineConfig({
  projectId: 'id87y7',
  video: true,         // Enable video recording
  screenshotOnRunFailure: true, // Enable screenshots on failure
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
  },
  // reporter: "mochawesome",
  // reporterOptions: {
  //   reportDir: "cypress/reports",
  //   overwrite: false,
  //   html: true,
  //   json: true,
  //   charts: true
  // },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    baseUrl: process.env.BASE_URL
    // supportFile: 'cypress/support/e2e.js'
  },
});
