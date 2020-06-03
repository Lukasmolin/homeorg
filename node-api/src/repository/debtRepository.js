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
     * @throws {InvalidParamError} if debt.value is not an positive integer
     * @throws {InvalidParamError} if debt.billId is not an positive integer
     * @throws {InvalidParamError} if debt.debtor.id is not an positive integer
     * @throws {DatabaseError} if database acess throws any error
     */
    async insert(debt) {
        if (!(debt instanceof Debt))
            throw new InvalidParamError('Param debt must be instance of Debt');

        const { value, billId, debtor } = debt;
        if (isNaN(value) || value <= 0)
            throw new InvalidParamError('Param debt.value must be positive integer');

        if (isNaN(billId) || billId <= 0)
            throw new InvalidParamError('Param debt.billId must be a positive integer');

        if(isNaN(debtor.id) || debtor.id <= 0)
            throw new InvalidParamError('param debt.debtor.id must be a positive integer');

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

}