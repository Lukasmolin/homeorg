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
     * @throws {InvalidParamError} if bill not isntance of Bill or bill.user not instance of User
     * @throws {DatabaseError} if database acess throws any exception
     */
    async insert(bill){
        if(!(bill instanceof Bill))
            throw new InvalidParamError('Param bill must be instance of Bill');

        if(!(bill.user instanceof User))
            throw new InvalidParamError('Param bill.user must be instanceof User');
        
        const { value, owner, description, date } = bill;
        const toInsert = {
            owner_id: owner.id,
            bill_date: date,
            value, description
        }

        try {
            const inserted = await this.billsDB().insert(toInsert).returning('*');
            if(inserted) {
                const { bill_id, value, description, bill_date } = inserted;
                return new Bill({
                    id: bill_id,
                    date: bill_date,
                    owner,
                    value,
                    description
                });
            }
        } catch (error) {
            throw new DatabaseError(error);
        }
        throw new DatabaseError('Could not insert for undefined reason');
    }

    /**
     * Inserts all Bills
     * @param {Bill[]} bills array of Bill to be inserted
     * @returns {Promise<Bill[]>} inserted Bills with bill.id, bill.date, bill.value, bill.description
     * abd bill.debtor populated
     */
    async insertAll(bills){
        if(bills.some(bill => !(bill instanceof Bill)))
            throw new InvalidParamError('All bills must be instance of Bill')

        if(bills.some(bill => !(bill.owner instanceof User)))
            throw new InvalidParamError('All bill.owner must be instance of User');

        const toInsert = bills.map( bill => {
            return {
                value: bill.value,
                description: bill.description,
                bill_date: bill.date,
                owner_id: bill.owner.id
            };
        });

        try {
            const allInserted = await this.billsDB().insert(toInsert).returning('*');
            if(allInserted[0]){
                const allInsertedUsers = allInserted.map( inserted => {
                    const { owner_id, bill_date, bill_id, description, value } = inserted;
                    const owner = bills.find( bill => bill.owner.id == owner_id ).owner;
                    return new Bill({
                        id: bill_id,
                        date: bill_date,
                        owner,
                        value,
                        description
                    });
                });
                return allInserted;
            }
        } catch (error) {
            throw new DatabaseError(error)
        }        
        throw new DatabaseError('Could not insert for undefined reason');
    }

}