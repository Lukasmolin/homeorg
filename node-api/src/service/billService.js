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
     * @param {Boolean} [deep=false] if should recursively populate contained entities (User, Debts[]), defaults to false
     * @returns {Bill} New Bill
     */
    parse(bill, deep = false) {
        const shouldBuildOwner = deep && (bill.owner.id || bill.owner.username);
        const parsedDebts = deep ? this.debtService.parseAll(bill.debts, deep) : bill.debts;
        const toParse = {
            id: bill.id,
            owner: shouldBuildOwner ? new User(bill.owner) : { ...bill.owner },
            value: bill.value,
            date: bill.date,
            description: bill.description,
            debts: parsedDebts 
        };
        return new Bill(toParse);
    }

    /**
     * parse array of json to array of Bill
     * @param {Object[]} bills Array of JSON bills
     * @param {Boolean} [deep=false] if should recursively populate contained entities (User, Debts[]), defaults to false
     * @returns {Bill[]} mapped array no New Bill
     */
    parseAll(bills, deep = false){
        const allToParse = bills.map( bill => this.parse(bill, deep) );
        return allToParse;
    }

    /**
     * @param {Bill} bill to save
     */
    async save(bill){
        const resp = await this.repo.insert(bill);
        return resp;
    }

    /**
     * @param {Bill[]} bills 
     */
    async saveAll(bills){
        const resp = await this.repo.insertAll(bills);
        return resp;
    }

}