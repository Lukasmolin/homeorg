const DebtRepository = require('../repository/debtRepository');

module.exports = class DebtService {

    constructor(){
        this.repo = new DebtRepository();
    }


    /**
     * @param {Debt} debt
     * @returns {Promise<Debt>}
     */
    async save(debt){
        const resp = await this.repo.insert(debt);
        return resp;
    }

}