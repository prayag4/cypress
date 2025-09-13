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
        if (formData.editor) {
            cy.get(this.editorIframeSelector)
                .its('0.contentDocument.body')
                .should('not.be.empty')
                .then(cy.wrap)
                .as('tinyMCEEditor')

            cy.get('@tinyMCEEditor').clear().type(formData.editor)
        }
        if (formData.number) {
            await this.typeinput(this.numberSelector, formData.number)
        }
        if (formData.email) {
            await this.typeinput(this.emailSelector, formData.email)
        }
        if (formData.phone) {
            await this.typeinput(this.phoneSelector, formData.phone)
        }
        if (formData.singleSelection) {
            this.findElementFromElement(this.singleSelectionSelector, 'option').then(async (arrayOptionElements) => {
                let randomOption = await this.objRandomUtility.getRandomSelectedOneValueFromArray(arrayOptionElements)
                let randomOptionValue = await randomOption.value;
                await this.selectDropdownElement(this.singleSelectionSelector, randomOptionValue)
                formData.singleSelection = randomOptionValue

            })
        }
        else {
            await this.selectDropdownElement(this.singleSelectionSelector, formData.singleSelection)
        }

        if (formData.multiSelection) {
            this.findElementFromElement(this.multiSelectionSelector, 'option').then(async (arrayOptionElements) => {
                let randomOptions = await this.objRandomUtility.getRandomSelectedValuesFromArray(arrayOptionElements)
                let arrRandomOptionValue = await Promise.all(randomOptions.map(async option => await option.value))
                await this.selectDropdownElement(this.multiSelectionSelector, arrRandomOptionValue)
                formData.multiSelection = arrRandomOptionValue
            })
        }
        else {
            await this.selectDropdownElement(this.multiSelectionSelector, formData.singleSelection)
        }
        if (formData.file) {
            await this.uploadFile(this.fileFieldSelector, formData.file)
        }
        if (formData.radioButton) {
            if (formData.radioButton = "random") {
                this.findElement(this.radioButtonSelector).then(async options => {
                    let randomOption = await this.objRandomUtility.getRandomSelectedOneValueFromArray(options)
                    let randomOptionValue = await randomOption.value
                    await this.checkRadioORCheckboxButton(this.radioButtonSelector, randomOptionValue)
                    formData.radioButton = randomOptionValue
                })
            }
            else {
                this.checkRadioORCheckboxButton(this.radioButtonSelector, formData.radioButton)
            }
        }
        if (formData.checkbox) {
            if (formData.checkbox = "random") {
                this.findElement(this.checkboxSelector).then(async ($options) => {
                    const randomOptions = await this.objRandomUtility.getRandomSelectedValuesFromArray($options); // assume this is sync

                    formData.checkbox = [];

                    randomOptions.forEach(async (element) => {
                        await this.clickElement(element); // Cypress handles click timing
                        formData.checkbox.push(element.value);
                    });
                });
            }
            else {
                this.checkRadioORCheckboxButton(this.checkboxSelector, formData.checkbox)
            }
        }
        if (formData.datePicker) {
            this.clickElementBySelector(this.datePickerSelector).then(async () => {
                let arrayDatePicker = (formData.datePicker)[0]
                this.selectDate(...arrayDatePicker)
                formData.datePicker = (formData.datePicker)[1]
            })

        }
        if (formData.dateRange) {
            cy.log("date range",(formData.dateRange)[2])
            // this.clickElementBySelector(this.dateRangeStartSelector).then(async () => {
            //     let arrayStartDatePicker = await (formData.dateRange)[0]
            //     this.selectDate(...arrayStartDatePicker)
            // })
            this.clickElementBySelector(this.dateRangeEndSelector).then(async () => {
                let arrayEndDatePicker = (formData.dateRange)[2]
                cy.log(arrayEndDatePicker)
                // this.selectDate(...arrayEndDatePicker)
            })

            formData.dateRange = [(formData.dateRange)[1], (formData.dateRange)[3]]
        }
        if (formData.timePicker) {
            await this.typeinput(this.timePickerSelector, formData.timePicker)
        }
        if (formData.location) {
            await this.typeinput(this.locationSelector, (formData.location).join(","))
            formData.location = (formData.location).join(",")
        }
        return formData

    }

    async submitForm() {
        await this.clickElement(this.saveButtonSelector)
    }

}
