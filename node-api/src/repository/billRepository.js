const db = require('../connection');
const { User, Bill, Debt } = require('../model');
const { isFilledString } = require('../util/typeChecks/typeCheck');
const DatabaseError = require('../error/databaseError');
const InvalidParamError = require('../error/invalidParamError');

module.exports = class BillRepository {

    constructor(){
        this.billsDB = () => db('bills');
    }

    /**
     * @param {Bill} bill to insert
     * @return {Promise<Bill>} inserted
     * @throws {InvalidParamError} if bill not isntance of Bill
     * @throws {InvalidParamError} if bill.id not positive number
     * @throws {InvalidParamError} if bill.value not positive number
     * @throws {InvalidParamError} if bill.owner not instance of User
     */
    async insert(bill){

    }

}