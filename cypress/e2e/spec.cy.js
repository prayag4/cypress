describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://crud-mvp-frontend.onrender.com/records')
    cy.get('.bg-green-500').click()
    cy.get('#singleLine').type("single line text")
  })
})