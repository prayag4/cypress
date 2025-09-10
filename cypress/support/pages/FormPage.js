import BasePage from "./BasePage";
import RandomUtility from "../utility/RandomUtility";
let objRandomUtility = new RandomUtility();

export default class FormPage extends BasePage {
    constructor() {
        super()
        this.objRandomUtility = new RandomUtility();
        this.singleLineSelector = '#singleLine'
        this.multiLineSelector = '#multiLine'
        this.editorIframeSelector = 'iframe[id*="tiny-react"]'
        this.editorSelector = '#tinymce'
        this.numberSelector = 'input[id="number"]'
        this.emailSelector = '//input[@id="email"]'
        this.phoneSelector = 'input[type*="tel"]' //contains method
        this.singleSelectionSelector = "#singleSelect"
        this.multiSelectionSelector = "#multiSelect"
        this.fileFieldSelector = '#file'
        this.radioButtonSelector = '//label[contains(text(), "Radio Buttons")]/following-sibling::div/label/input[@type="radio"]'
        this.checkboxSelector = 'input[type="checkbox"]'
        this.datePickerSelector = "#date"
        this.dateRangeStartSelector = "#dateRangeStart"
        this.dateRangeEndSelector = "#dateRangeEnd"
        this.timePickerSelector = "#time"
        this.locationSelector = "#location"
        this.saveButtonSelector = 'button[type="submit"]'
    }

    async fillForm(formData) {
        if (formData.singleLine) {
            await this.typeinput(this.singleLineSelector, formData.singleLine)
        }
        if (formData.multiLine) {
            await this.typeinput(this.multiLineSelector, formData.multiLine)
        }
        // if (formData.editor) {
        //     const iframe =  this.getIframe(this.editorIframeSelector);
        //      this.fillFieldIframe(iframe, this.editorSelector, formData.editor);
        // }
        if (formData.number) {
             await this.typeinput(this.numberSelector, formData.number)
        }
        // if (formData.email) {
        //      this.fillField(this.emailSelector, formData.email)
        // }
        // if (formData.phone) {
        //      this.fillField(this.phoneSelector, formData.phone)
        // }
        // if (formData.singleSelection) {
        //     let selectLocator =  this.findElementLocator(this.singleSelectionSelector)
        //     if (formData.singleSelection = "random") {
        //         let arrayOptionElements =  this.findSelectTagOptionElements(selectLocator)
        //         let randomOption =  this.objRandomUtility.getRandomSelectedOneValueFromArray(arrayOptionElements)
        //         let randomOptionValue =  this.getAttributeFromLocator(randomOption, 'value')
        //          this.selectOption(selectLocator, randomOptionValue)
        //         formData.singleSelection = randomOptionValue
        //     }
        //     else {
        //          this.selectOption(selectLocator, formData.singleSelection)
        //     }
        // }
        // if (formData.multiSelection) {
        //     let selectLocator =  this.findElementLocator(this.multiSelectionSelector)
        //     if (formData.multiSelection = "random") {
        //         let arrayOptionElements =  this.findSelectTagOptionElements(selectLocator)
        //         let randomOptions =  this.objRandomUtility.getRandomSelectedValuesFromArray(arrayOptionElements)
        //         let arrayRandomOptionValue =  Promise.all(randomOptions.map(async (randomOption) => { return  this.getAttributeFromLocator(randomOption, 'value') }))
        //          this.selectOption(selectLocator, arrayRandomOptionValue)
        //         formData.multiSelection = arrayRandomOptionValue
        //     }
        //     else {
        //          this.selectOption(selectLocator, formData.multiSelection)
        //     }
        // }
        // if (formData.file) {
        //     let fileFieldLocator =  this.findElementLocator(this.fileFieldSelector)
        //      this.uploadFile(fileFieldLocator, formData.file)
        // }
        // if (formData.radioButton) {
        //     if (formData.radioButton = "random") {
        //         let arrayOptionElements =  this.findAllElementLocators(this.radioButtonSelector)
        //         let randomOption =  this.objRandomUtility.getRandomSelectedOneValueFromArray(arrayOptionElements)
        //         let randomOptionValue =  this.getAttributeFromLocator(randomOption, 'value')
        //          this.clickElement(randomOption)
        //         formData.radioButton = randomOptionValue
        //     }
        //     else {
        //          this.clickElement(randomOption)
        //     }
        // }
        // if (formData.checkbox) {
        //     if (formData.checkbox = "random") {
        //         let arrayOptionElements =  this.findAllElementLocators(this.checkboxSelector)
        //         let randomOptions =  this.objRandomUtility.getRandomSelectedValuesFromArray(arrayOptionElements)
        //         let arrayRandomOptionValue =  Promise.all(randomOptions.map(async (randomOption) => { return ( randomOption.locator('xpath=following-sibling::span')).textContent(); }))
        //         for (let chk of randomOptions) {  this.clickElement(chk) }
        //         formData.checkbox = arrayRandomOptionValue
        //     }
        //     else {
        //         for (let chk of formData.checkbox) {  this.clickElement(chk) }
        //     }
        // }
        // if (formData.datePicker) {
        //     let datePickerLocator =  this.findElementLocator(this.datePickerSelector)
        //      this.clickElement(datePickerLocator)
        //     let arrayDatePicker =  (formData.datePicker)[0]
        //      this.selectDate(...arrayDatePicker)
        //     formData.datePicker = (formData.datePicker)[1]
        // }
        // if (formData.dateRange) {
        //     let startDatePickerLocator =  this.findElementLocator(this.dateRangeStartSelector)
        //      this.clickElement(startDatePickerLocator)
        //     let arrayStartDatePicker =  (formData.dateRange)[0]
        //      this.selectDate(...arrayStartDatePicker)

        //     let endDatePickerLocator =  this.findElementLocator(this.dateRangeEndSelector)
        //      this.clickElement(endDatePickerLocator)
        //     let arrayEndDatePicker =  (formData.dateRange)[2]
        //      this.selectDate(...arrayEndDatePicker)

        //     formData.dateRange = [ (formData.dateRange)[1], (formData.dateRange)[3]]
        // }
        // if(formData.timePicker){
        //      this.fillField(this.timePickerSelector, formData.timePicker)
        // }
        // if(formData.location){
        //      this.fillField(this.locationSelector,  (formData.location).join(","))
        //     formData.location =  (formData.location).join(",")
        // }
        return formData

    }

       async submitForm() {
         await this.clickElement(this.saveButtonSelector)
    }

}
