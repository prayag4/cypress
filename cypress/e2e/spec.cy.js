import 'cypress-iframe';
import 'cypress-xpath';
import 'cypress-file-upload'
import RandomUtility from "../support/utility/RandomUtility"
let objRandomUtility = new RandomUtility()

beforeEach(() => {
  cy.visit('https://crud-mvp-frontend.onrender.com/records')
})


describe('check only single line can be added or not', () => {
  it('should be added.', () => {
    let singleLineText = "single line text any value3"
    cy.get('.bg-green-500').click()
    cy.get('#singleLine').type(singleLineText)
    cy.get('button[type="submit"]').click()

    cy.wait(1000)
    //check data added or not in listng 
    cy.get('table tr:last-child td:last-child')
    cy.get('table tr:last-child td').then((elements) => {
      cy.wrap(elements).eq(1).should('contain.text', singleLineText)
      cy.wrap(elements).eq(3).find('.bg-yellow-500').click()
      cy.get("#singleLine").should('contain.value', singleLineText)
      cy.get("#singleLine").should('have.value', singleLineText)

      cy.get('#singleLine').invoke('val').then(value => {
        cy.softAssert(value, "check single line text box has right value or not", singleLineText)
      })
      cy.get('.bg-gray-500').click()
    })
    cy.get('table tr:last-child td').then((elements) => {
      const singlelineTableValue = elements.eq(1).text()
      cy.softAssert(singlelineTableValue, "check singleline value in table is right or not", singleLineText)
    })
    cy.assertAll()
  })
})

describe('check record can be added with all information add or not', () => {
  it('should add the record with all details', () => {
    let singleLineSelector = '#singleLine'
    let multiLineSelector = '#multiLine'
    let editorIframeSelector = 'iframe[id*="tiny-react"]'
    let editorSelector = 'body#tinymce'
    let numberSelector = 'input[id="number"]'
    let emailSelector = '//input[@id="email"]'
    let phoneSelector = 'input[type*="tel"]' //contains method
    let singleSelectionSelector = "#singleSelect"
    let multiSelectionSelector = "#multiSelect"
    let fileFieldSelector = '#file'
    let radioButtonSelector = '//label[contains(text(), "Radio Buttons")]/following-sibling::div/label/input[@type="radio"]'
    let checkboxSelector = 'input[type="checkbox"]'
    let datePickerSelector = "#date"
    let dateRangeStartSelector = "#dateRangeStart"
    let dateRangeEndSelector = "#dateRangeEnd"
    let timePickerSelector = "#time"
    let locationSelector = "#location"
    let saveButtonSelector = 'button[type="submit"]'
    let formData = {}
    cy.wrap(null).then(async () => {
      //data preparation
      formData.singleLine = await objRandomUtility.generateRandomString()
      formData.multiLine = await objRandomUtility.generateMultipleLineContent()
      formData.editor = await objRandomUtility.generateMultipleLineContent()
      formData.number = await objRandomUtility.generateRandomNumber()
      formData.email = await objRandomUtility.generateRandomEmail()
      formData.phone = await objRandomUtility.generateFakePhoneNumber()
      formData.singleSelection = "random"
      formData.multiSelection = "random"
      formData.file = "utility/test.png" //always set according to on which level cypress is executing
      formData.radioButton = "random"
      formData.checkbox = "random"
      formData.datePicker = await objRandomUtility.getRandomDate()
      formData.dateRange = await objRandomUtility.getRandomDateRange()
      formData.timePicker = await objRandomUtility.generateRandomTime()
      formData.location = await objRandomUtility.getRandomLatLong()

      cy.get('.bg-green-500').click()

      cy.get(singleLineSelector).type(formData.singleLine)
      cy.get(multiLineSelector).type(formData.multiLine)

      //wait for iframe to get loaded 
      // cy.frameLoaded(editorIframeSelector)
      cy.get(editorIframeSelector)
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .as('tinyMCEEditor')

      cy.get('@tinyMCEEditor').clear().type(formData.editor)

      cy.get(numberSelector).type(formData.number)

      cy.xpath(emailSelector).type(formData.email)

      cy.get(phoneSelector).type(formData.phone)

      cy.get(singleSelectionSelector).select('Option 2')

      cy.get(multiSelectionSelector).select(['Option 1', 'Option 2'])

      cy.get(fileFieldSelector).attachFile('test.png')

      cy.xpath(radioButtonSelector).first().check()

      cy.get(checkboxSelector).first().check()

      //date picker
      let arrDatepicker = formData.datePicker
      let dayMonthYear = arrDatepicker[0]
      cy.get(datePickerSelector).click().then(() => {
        cy.selectReactDate(...dayMonthYear)
      })

      //date range 
      let arrDateRange = formData.dateRange
      let startDayMonthYear = arrDateRange[0]
      let endDayMonthYear = arrDateRange[2]
      cy.get(dateRangeStartSelector).click().then(() => {
        cy.selectReactDate(...startDayMonthYear)
      })
      cy.get(dateRangeEndSelector).click().then(() => {
        cy.selectReactDate(...endDayMonthYear)
      })

      cy.get(timePickerSelector).type(formData.timePicker)

      cy.get(locationSelector).type(...formData.location)

      cy.get(saveButtonSelector).click()
      cy.wait(2000)
      cy.get('table tr:last-child td').then((elements) => {
        const singlelineTableValue = elements.eq(1).text()
        cy.softAssert(singlelineTableValue, "check singleline value in table is right or not", formData.singleLine)

        cy.wrap(elements).eq(3).find('.bg-yellow-500').click().then(() => {
          cy.get(multiLineSelector).should('have.value', formData.multiLine)
          cy.get(editorIframeSelector)
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap)
            .as('tinyMCEEditor')

          cy.get('@tinyMCEEditor').then(body=>{
            cy.softAssert(body.text(),'Check editor value is same or not',formData.editor)
            cy.log(body.text())})
        })

      })

    })


  })
})