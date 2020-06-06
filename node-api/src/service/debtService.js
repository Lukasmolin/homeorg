const DebtRepository = require('../repository/debtRepository');
const { Debt, User } = require('../model');

module.exports = class DebtService {

    constructor() {
        this.repo = new DebtRepository();
    }

    /**
     * Parses JSON to Debt
     * @param {Object} debt JSON object to parse
     * @param {Boolean} [deep=false] if should recursively fill contained entities
     * @returns {Debt} new Debt
     */
    parse(debt, deep = false) {
        const shouldCreateUser = deep && debt.debtor.id;
        const toParse = {
            id: debt.id,
            billId: debt.billId,
            value: debt.value,
            debtor: shouldCreateUser ? new User(debt.debtor) : { ...debt.debtor }
        };
        return new Debt(toParse);
    }

    /**
     * Parses JSON array to Debt array
     * @param {Object[]} debt array of JSON objects to parse
     * @param {Boolean} [deep=false] if should recursively fill contained entities
     * @returns {Debt[]} parsed new debts
     */
    parseAll(debts, deep = false) {
        const all = debts.map( debt => this.parse(debt, deep) );
        return all;
    }

    /**
     * @param {Debt} debt
     * @returns {Promise<Debt>}
     */
    async save(debt) {
        const resp = await this.repo.insert(debt);
        return resp;
    }

    /**
     * @param {Debt[]} debts newDebtsToSave
     * @returns {Promise<User[]>} all saved debts
     * @throws {InvalidParamError} if debt not instance of Debt
     * @throws {DatabaseError} if database acess throws any error
    */
    async saveAll(debts) {
        const resp = await this.repo.insertAll(debts);
        return resp;
    }

}