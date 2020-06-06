const DebtRepository = require('../repository/debtRepository');
const { Debt } = require('../model');

module.exports = class DebtService {

    constructor() {
        this.repo = new DebtRepository();
    }

    /**
     * Parses JSON to Debt
     * @param {Object} debt JSON object to parse
     * @param {Boolean} [deep=false] if should fill contained entities
     * @returns {Debt} new Debt
     */
    parse(debt, deep = false) {
        
    }

    /**
     * Parses JSON array to Debt array
     * @param {Object[]} debt array of JSON objects to parse
     * @param {Boolean} [deep=false] if should fill contained entities
     * @returns {Debt[]} parsed new debts
     */
    parseAll(debts, deep = false) {

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