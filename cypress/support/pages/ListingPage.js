import BasePage from "./BasePage";

export default class ListingPage extends BasePage {
    constructor() {
        super()
        this.deleteButtonSelector = '//button[text()="Delete"]'
        this.addButtonSelector = ".bg-green-500"
    }

    goToListingPage() {
        return this.goto("/records")
    }

    clickOnAddButton() {
        return this.clickElementBySelector(this.addButtonSelector);
    }

    getLatestTableValue(columnName) {
        return this.getAllFieldNamesInTable('table thead tr th').then((arrFieldNamesInTable) => {
            const columnIndex = arrFieldNamesInTable.indexOf(columnName) + 1;
            const latestColumnSelector = `table tr:last-child td:nth-child(${columnIndex})`;
            return this.getTextContentOfTable(latestColumnSelector);
        });
    }




    deleteRecord(fieldValue) {
        let row = this.findLocatorWithFilterText("table tr", fieldValue)
        let deleteButtonLocator = this.findLocatorFromLocator(row, this.deleteButtonSelector)
        this.waitForDialogAndAccept()
        this.clickElement(deleteButtonLocator)
    }
}