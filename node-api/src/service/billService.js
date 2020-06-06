const BillRepository = require('../repository/billRepository');
const DebtService = require('../service/debtService');
const { Bill } = require('../model');

module.exports = class BillService {

    constructor(){
        this.repo = new BillRepository();
        this.debtService = DebtService();
    }

    /**
     * parse json to Bill
     * @param {Object} bills JSON bill
     * @param {Boolean} [deep=false] if should populate contained entities (User, Debts[]), defaults to false
     * @returns {Bill} New Bill
     */
    parse(bill, deep = false) {
        const parsed = new Bill(bill);
        if(deep){
            
        }
        return parsed;
    }

    /**
     * parse array of json to array of Bill
     * @param {Object[]} bills Array of JSON bills
     * @param {Boolean} [deep=false] if should populate contained entities (User, Debts[]), defaults to false
     * @returns {Bill[]} mapped array no New Bill
     */
    parseAll(bills, deep = false){

    }

    async save(bill){
        const resp = await this.repo.insert(bill);
        return resp;
    }

    async saveAll(bills){
        const resp = await this.repo.insertAll(bills);
        return resp;
    }

}