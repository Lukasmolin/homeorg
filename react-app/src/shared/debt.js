/**
 * Represents a single Debt
 * @typedef {Object} Debt
 */
class Debt {

    constructor(debt){
        this.modelClass = "Debt";
        this.id = debt ? debt.id : undefined;
        this.billId = debt ? debt.bill : undefined;
        this.debtor = debt ? debt.debtor : undefined;
        this.value = debt ? debt.value : undefined;
    }

}

module.exports = Debt;