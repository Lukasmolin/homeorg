const DebtRepository = require('../repository/debtRepository');

module.exports = class DebtService {

    constructor() {
        this.repo = new DebtRepository();
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