import BasePage from "./BasePage";

export default class ListingPage extends BasePage {
    constructor() {
        super()
        this.deleteButtonSelector = '//button[text()="Delete"]'
        this.addButtonSelector = ".bg-green-500"
    }

    async goToListingPage() {
        return this.goto("/records")
    }

    async clickOnAddButton() {
        return await this.clickElementBySelector(this.addButtonSelector);
    }

    getLatestTableValue(columnName) {
  return this.getAllFieldNamesInTable('table thead tr th').then((arrFieldNamesInTable) => {
    const columnIndex = arrFieldNamesInTable.indexOf(columnName) + 1;
    const latestColumnSelector = `table tr:last-child td:nth-child(${columnIndex})`;
    return this.getTextContentOfTable(latestColumnSelector); // returning this chain!
  });
}




    async deleteRecord(fieldValue) {
        let row = await this.findLocatorWithFilterText("table tr", fieldValue)
        let deleteButtonLocator = await this.findLocatorFromLocator(row, this.deleteButtonSelector)
        await this.waitForDialogAndAccept()
        await this.clickElement(deleteButtonLocator)
    }
}