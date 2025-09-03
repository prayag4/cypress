export default class BasePage{
    goto(url){
        cy.visit(url)
    }
    clickElement(selector){
        cy.get(selector).click()
    }

    findElementSubject(selector){
        cy.get(selector)
    }

}