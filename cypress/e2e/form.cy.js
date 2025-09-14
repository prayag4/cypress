import FormPage from "../support/pages/FormPage"
import ListingPage from "../support/pages/ListingPage"
import RandomUtility from "../support/utility/RandomUtility"

let objRandomUtility = new RandomUtility()
let formPage = new FormPage()
let listingPage = new ListingPage()

describe('check record can be added with all information', () => {
    it('should be added with all information', () => {
        listingPage.goToListingPage()
        listingPage.clickOnAddButton();

        let formData = {}
        //data preparation
        formData.singleLine = objRandomUtility.generateRandomString()
        formData.multiLine = objRandomUtility.generateMultipleLineContent()
        formData.editor = objRandomUtility.generateMultipleLineContent()
        formData.number = objRandomUtility.generateRandomNumber()
        formData.email = objRandomUtility.generateRandomEmail()
        formData.phone = objRandomUtility.generateFakePhoneNumber()
        formData.singleSelection = "random"
        formData.multiSelection = "random"
        formData.file = "cypress/fixtures/test.png"
        formData.radioButton = "random"
        formData.checkbox = "random"
        formData.datePicker = objRandomUtility.getRandomDate()
        formData.dateRange = objRandomUtility.getRandomDateRange()
        formData.timePicker = objRandomUtility.generateRandomTime()
        formData.location = objRandomUtility.getRandomLatLong()

        formPage.fillForm(formData)
        formPage.submitForm()

        //verfiy data in table listing
        listingPage.getLatestTableValue("Single Line").then((value) => {
            cy.softAssert(value, "check singleline value in table is right or not", formData.singleLine)
        })

    })
})