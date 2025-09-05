import 'cypress-iframe';
import 'cypress-xpath';

export default class BasePage {
    goto(url) {
        return cy.visit(url);
    }

    findElement(selector) {
        const trimmedSelector = selector.trim();
        const isXPath = trimmedSelector.startsWith('//')
            || trimmedSelector.startsWith('(')
            || trimmedSelector.startsWith('/')
            || trimmedSelector.startsWith('.//');
        return isXPath ? cy.xpath(selector) : cy.get(selector);
    }

    clickElement(selector) {
        return this.findElement(selector).click();
    }

    typeinput(selector, text) {
        return this.findElement(selector).clear().type(text);
    }

    waitForIframeToLoad(selector) {
        return cy.frameLoaded(selector);
    }

    getIframeBody(selector) {
        return cy.iframe(selector);
    }

    typeTextInIframe(iframeSelector, selector, text) {
        return this.getIframeBody(iframeSelector).find(selector).clear().type(text);
    }

    selectDropdownElement(selector,value) {
        return this.findElement(selector).select(value)
    }

    getAttribute(selector,attrName){
        return this.findElement(selector).invoke('attr',attrName)
    }

    uploadFile(selector,filePath){
        return this.findElement(selector).selectFile(filePath)
    }

    selectDate(day, month, year) {
    this.findElement('.react-datepicker__year-dropdown-container').click();
    this.findElement('.react-datepicker__year-option').contains(year).click();

    this.findElement('.react-datepicker__month-dropdown-container').click();
    this.findElement('.react-datepicker__month-option').contains(month).click();

    const paddedDay = day.toString().padStart(2, '0');
    const dateLocator = `div[class*="react-datepicker__day--0${paddedDay}"][aria-label*="${month} ${day}"]`;
    
    this.clickElement(dateLocator);
  }

    clickElementWithJs(selector) {
    this.findElement(selector).then(($el) => {
      $el[0].click();
    });
  }

  getTextContent(selector){
    return this.findElement(selector).invoke('text')
  }

  getAllFieldNamesInTable(selector) {
    cy.get('table tr:last-child td:last-child').should('be.visible');
    return cy.get(selector).then($els => Cypress._.map($els, 'innerText'));
  }


}
