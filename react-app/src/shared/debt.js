/**
 * Represents a single Debt
 * @typedef {Object} Debt
 */
class Debt {

    constructor(debt){
        this.id = debt ? debt.id : undefined;
        this.bill = debt ? debt.bill : undefined;
        this.debtor = debt ? debt.user : undefined;
        this.value = debt ? debt.value : undefined;
    }

}

module.exports = Debt;