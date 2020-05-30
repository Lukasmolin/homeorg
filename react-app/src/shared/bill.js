/**
 * represents a single Bill
 * @typedef {Object} Bill
 */
class Bill {

    constructor(bill) {
        this.modelClass = "Bill";
        this.id = bill ? bill.id : undefined;
        this.owner = bill ? bill.owner : undefined;
        this.value = bill ? bill.value : undefined;
        this.date = bill ? bill.date : undefined;
        this.description = bill ? bill.description : undefined; 
        this.debts = bill && Array.isArray(bill.debts) ? bill.debts : [];
    }

}

module.exports = Bill;