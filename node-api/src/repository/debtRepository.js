const db = require('../connection');
const { User, Bill, Debt } = require('../model');
const { isFilledString } = require('../util/typeChecks/typeCheck');
const DatabaseError = require('../error/databaseError');
const InvalidParamError = require('../error/invalidParamError');

module.exports = class DebtRepository {

    constructor() {
        this.debtsDB = () => db('debts');
        this.billsDB = () => db('bills');
        this.usersDB = () => db('users');
    }

    /**
     * @param {Debt} debt new debt to be inserted
     * @returns {Promise<Debt>} inserted Debt
     * @throws {InvalidParamError} if debt not instance of Debt
     * @throws {DatabaseError} if database acess throws any error
     */
    async insert(debt) {
        if (!(debt instanceof Debt))
            throw new InvalidParamError('Param debt must be instance of Debt');

        const { value, billId, debtor } = debt;        

        const toInsert = {
            owner_bill: billId,
            debtor_user: debtor.id,
            value: value
        };

        try {
            const inserted = await this.debtsDB().insert(toInsert).returning('*');
            return new Debt({
                id: inserted.debt_id,
                billId: inserted.owner_bill,
                value: inserted.value,
                debtor: debtor
            });
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    /**
     * @param {Debt[]} debts all debts to insert
     * @returns {Promise<Debt[]>} all inserted
     * @throws {InvalidParamError} if debt not instance of Debt
     * @throws {DatabaseError} if database acess throws any error
     */
    async insertAll(debts){
        if(debts.some(debt => !(debt instanceof Debt)))
            throw new InvalidParamError('all elements from debts must be instanceof Debt');
        
        const toInsert = debts.map(debt => {
            const { billId, debtor, value } = debt;
            return {
                owner_bill: billId,
                debtor_user: debtor.id,
                value: value
            };
        });

        try {
            const inserted = await this.debtsDB().insert(toInsert).returning('*').join();
            const insertedDebts = inserted.map(debt => {
                return new Debt({
                    id: debt.debt_id,
                    billId: debt.owner_bill,
                    value: debt.value,
                    debtor: debtor
                });
            });
            return insertedDebts;
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

}