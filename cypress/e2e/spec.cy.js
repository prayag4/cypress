
import RandomUtility from "../support/utility/RandomUtility"
let objRandomUtility = new RandomUtility()

describe('check only single line can be added or not', () => {
  it('should be added.', () => {
    let singleLineText = "single line text any value3"
    cy.visit('https://crud-mvp-frontend.onrender.com/records')
    cy.get('.bg-green-500').click()
    cy.get('#singleLine').type(singleLineText)
    cy.get('button[type="submit"]').click()

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
  it.only('should add the record with all details', () => {
    let singleLineSelector = '#singleLine'
    let multiLineSelector = '#multiLine'
    let editorIframeSelector = 'iframe[id*="tiny-react"]'
    let editorSelector = '#tinymce'
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
    let formData
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
      formData.file = "utility/test.png" //always set according to on which level playwright is executing
      formData.radioButton = "random"
      formData.checkbox = "random"
      formData.datePicker = await objRandomUtility.getRandomDate()
      formData.dateRange = await objRandomUtility.getRandomDateRange()
      formData.timePicker = await objRandomUtility.generateRandomTime()
      formData.location = await objRandomUtility.getRandomLatLong()
    })


  })
})