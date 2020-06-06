const db = require('../connection');
const { User, Bill, Debt } = require('../model');
const { isFilledString } = require('../util/typeChecks/typeCheck');
const DatabaseError = require('../error/databaseError');
const InvalidParamError = require('../error/invalidParamError');

module.exports = class DebtRepository {

    constructor() {
        this.debtsDB = () => db('debts');
    }

    /**
     * @param {Debt} debt new debt to be inserted
     * @returns {Promise<Debt>} inserted Debt with debt.id, debt.billId, debt.value and debt.debtor populated
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
            if(inserted){
                const insertedDebt = new Debt({
                    id: inserted.debt_id,
                    billId: inserted.owner_bill,
                    value: inserted.value,
                    debtor: debtor
                });
                return insertedDebt;
            }
        } catch (error) {
            throw new DatabaseError(error);
        }
        throw new DatabaseError('Could not insert for undefined reason');
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
        
        if(debts.some(debt => !(debt.debtor instanceof Debt)))
            throw new InvalidParamError('debt.debtor must be instanceof User');
        
            
        //maps each debt in array to object with matching table columns names
        const toInsert = debts.map(debt => {
            const { billId, debtor, value } = debt;
            return {
                owner_bill: billId,
                debtor_user: debtor.id,
                value: value
            };
        });

        //insert debts array
        try {
            const inserted = await this.debtsDB().insert(toInsert).returning('*').join();

            if(inserted[0]){
                const insertedDebts = inserted.map(debt => {
                    return new Debt({
                        id: debt.debt_id,
                        billId: debt.owner_bill,
                        value: debt.value,
                        debtor: debtor
                    });
                });
                return insertedDebts;
            }
        } catch (error) {
            throw new DatabaseError(error);
        }
        throw new DatabaseError('Could not insert for undefined reason');
    }

}