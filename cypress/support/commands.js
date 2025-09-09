// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import 'cypress-iframe';

// Global objects to track assertion errors
let itBlockErrors = {}; // Stores errors for each 'it' block title
let totalFailedAssertionsByDescribe = {}; // Tracks total assertion failures for each "describe" block

Cypress.Commands.add('softAssert', { prevSubject: false }, (actualValue, message,expectedValue) => {
  return cy.wrap(null, { timeout: Cypress.config('defaultCommandTimeout') }).then(() => {
    try {
      expect(actualValue).to.equal(expectedValue, message);
    } catch (err) {
      const itBlockTitle = Cypress.currentTest.title;
      const describeBlockTitle = Cypress.currentTest.titlePath[0];

      // Initialize describe block failure count if not already present
      totalFailedAssertionsByDescribe[describeBlockTitle] = totalFailedAssertionsByDescribe[describeBlockTitle] || 0;
      totalFailedAssertionsByDescribe[describeBlockTitle]++;

      // Store the error under the current it block
      if (!itBlockErrors[itBlockTitle]) {
        itBlockErrors[itBlockTitle] = [];
      }
      itBlockErrors[itBlockTitle].push({ message, error: err });
    }
  });
});

Cypress.Commands.add('assertAll', () => {
  const errors = itBlockErrors;
  itBlockErrors = {}; // Reset for next test run

  if (Object.keys(errors).length > 0) {
    // Build detailed error messages
    const errorMessages = Object.entries(errors).map(([title, entries], index) => {
      const entryMessages = entries.map(({ error }) => `=> ${error.message}`).join('\n\n');
      return `${index + 1}. Test Title: ${title}\n${entryMessages}`;
    });

    // Add summary per describe block
    const describeSummary = Object.entries(totalFailedAssertionsByDescribe).map(
      ([describe, count]) => `Total assertion failures in "${describe}": ${count}`
    ).join('\n');

    throw new Error(
      `Soft assertion failed: Total it block failed (${Object.keys(errors).length})\n` +
      `${errorMessages.join('\n\n')}\n\n` +
      `${describeSummary}`
    );
  }
});
