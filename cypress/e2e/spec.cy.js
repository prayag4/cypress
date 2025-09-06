
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://crud-mvp-frontend.onrender.com/records')
    cy.get('.bg-green-500').click()
    cy.get('#singleLine').type("single line text")
    // cy.get('h1').should('contain', 'Welcome')

    cy.softAssert("expected", "actual", "message");
    cy.softAssert("expected", "actual", "message")
    cy.assertAll()
  })
})  