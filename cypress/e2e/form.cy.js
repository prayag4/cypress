import FormPage from "../support/pages/FormPage"
// import ListingPage from "..support/pages/ListingPage"
import RandomUtility from "../support/utility/RandomUtility"

let objRandomUtility = new RandomUtility()
let formPage = new FormPage()

describe('check record can be added with all information', () => {
    it('should be added with all information', () => {
        cy.visit('https://crud-mvp-frontend.onrender.com/records')
        cy.get('.bg-green-500').click()

        cy.wrap(null).then(async () => {
            let formData = {}
            //data preparation
            formData.singleLine = await objRandomUtility.generateRandomString()
            formData.multiLine = await objRandomUtility.generateMultipleLineContent()
            formData.editor = await objRandomUtility.generateMultipleLineContent()
            formData.number = await objRandomUtility.generateRandomNumber()
            formData.email = await objRandomUtility.generateRandomEmail()
            formData.phone = await objRandomUtility.generateFakePhoneNumber()
            formData.singleSelection = "random"
            formData.multiSelection = "random"
            formData.file = "cypress/fixtures/test.png"
            formData.radioButton = "random"
            formData.checkbox = "random"
            formData.datePicker = await objRandomUtility.getRandomDate()
            formData.dateRange = await objRandomUtility.getRandomDateRange()
            formData.timePicker = await objRandomUtility.generateRandomTime()
            formData.location = await objRandomUtility.getRandomLatLong()

            await formPage.fillForm(formData)

            await formPage.submitForm()

        })
    })
})