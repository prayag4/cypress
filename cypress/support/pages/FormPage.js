import BasePage from "./BasePage";
import RandomUtility from "../utility/RandomUtility";

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

    fillForm(formData) {
        if (formData.singleLine) {
            this.typeinput(this.singleLineSelector, formData.singleLine)
        }
        if (formData.multiLine) {
            this.typeinput(this.multiLineSelector, formData.multiLine)
        }
        if (formData.editor) {
            cy.get(this.editorIframeSelector)
                .its('0.contentDocument.body')
                .should('not.be.empty')
                .then(cy.wrap)
                .as('tinyMCEEditor')

            cy.get('@tinyMCEEditor').clear().type(formData.editor)
        }
        if (formData.number) {
            this.typeinput(this.numberSelector, formData.number)
        }
        if (formData.email) {
            this.typeinput(this.emailSelector, formData.email)
        }
        if (formData.phone) {
            this.typeinput(this.phoneSelector, formData.phone)
        }
        if (formData.singleSelection) {
            if (formData.singleSelection === "random") {
                this.findElementFromElement(this.singleSelectionSelector, 'option').then((arrayOptionElements) => {
                    let randomOption = this.objRandomUtility.getRandomSelectedOneValueFromArray(arrayOptionElements)
                    let randomOptionValue = randomOption.value;
                    this.selectDropdownElement(this.singleSelectionSelector, randomOptionValue)
                    formData.singleSelection = randomOptionValue

                })
            }
            else {
                this.selectDropdownElement(this.singleSelectionSelector, formData.singleSelection)
            }
        }

        if (formData.multiSelection) {
            if (formData.multiSelection === "random") {
                this.findElementFromElement(this.multiSelectionSelector, 'option').then((arrayOptionElements) => {
                    let randomOptions = this.objRandomUtility.getRandomSelectedValuesFromArray(arrayOptionElements)
                    let arrRandomOptionValue = randomOptions.map(option => option.value)
                    this.selectDropdownElement(this.multiSelectionSelector, arrRandomOptionValue)
                    formData.multiSelection = arrRandomOptionValue
                })
            }
            else {
                this.selectDropdownElement(this.multiSelectionSelector, formData.singleSelection)
            }
        }
        if (formData.file) {
            this.uploadFile(this.fileFieldSelector, formData.file)
        }
        if (formData.radioButton) {
            if (formData.radioButton === "random") {
                this.findElement(this.radioButtonSelector).then(options => {
                    let randomOption = this.objRandomUtility.getRandomSelectedOneValueFromArray(options)
                    let randomOptionValue = randomOption.value
                    this.checkRadioORCheckboxButton(this.radioButtonSelector, randomOptionValue)
                    formData.radioButton = randomOptionValue
                })
            }
            else {
                this.checkRadioORCheckboxButton(this.radioButtonSelector, formData.radioButton)
            }
        }
        if (formData.checkbox) {
            if (formData.checkbox === "random") {
                this.findElement(this.checkboxSelector).then(($options) => {
                    const randomOptions = this.objRandomUtility.getRandomSelectedValuesFromArray($options);
                    formData.checkbox = [];
                    randomOptions.forEach((element) => {
                        this.clickElement(element); // Cypress handles click timing
                        formData.checkbox.push(element.value);
                    });
                });
            }
            else {
                this.checkRadioORCheckboxButton(this.checkboxSelector, formData.checkbox)
            }
        }
        if (formData.datePicker) {
            this.clickElementBySelector(this.datePickerSelector)
            let arrayDatePicker = (formData.datePicker)[0]
            this.selectDate(...arrayDatePicker)
            formData.datePicker = (formData.datePicker)[1]

        }
        if (formData.dateRange) {
            this.clickElementBySelector(this.dateRangeStartSelector)
            let arrayStartDatePicker = (formData.dateRange)[0]
            this.selectDate(...arrayStartDatePicker)

            this.clickElementBySelector(this.dateRangeEndSelector)
            let arrayEndDatePicker = (formData.dateRange)[2]
            cy.log(arrayEndDatePicker)
            this.selectDate(...arrayEndDatePicker)


            formData.dateRange = [(formData.dateRange)[1], (formData.dateRange)[3]]
        }
        if (formData.timePicker) {
            this.typeinput(this.timePickerSelector, formData.timePicker)
        }
        if (formData.location) {
            this.typeinput(this.locationSelector, (formData.location).join(","))
            formData.location = (formData.location).join(",")
        }
        return formData

    }

    submitForm() {
        this.clickElementBySelector(this.saveButtonSelector)
    }

}
