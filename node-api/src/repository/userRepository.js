const db = require('../connection');
const { User } = require('../model');
const DatabaseError = require('../error/databaseError');
const InvalidParamError = require('../error/invalidParamError');

module.exports = class UserRepository {

    constructor(){
        this.getTable = () => db('users');
    }

    async insert(user){
        if(!(user instanceof User))
            throw new InvalidParamError('Param must be instanceof User');

        try {
            const inserted = await this.getTable().insert(user);
            return inserted;
        } catch (error) {
            throw new DatabaseError(error.message);
        }
    }

    /**
     * @param {Number} id positive id number
     */
    async deleteById(id){
        if(isNaN(id)) throw new InvalidParamError('Id is Not a Number');
        if(id <= 0) throw new InvalidParamError('Id is not a valid number');

        const userId = parseInt(id);
        try {
            const deleted = await this.getTable().where('id', userId).delete().returning('*').first();
            return new User(deleted);
        } catch (error) {
            throw new DatabaseError(error.message);
        }
    }

    /**
     * @param {User} user with a valid id
     * @returns {Promise} 
     */
    async update(user){
        if(!(user instanceof User))
            throw new InvalidParamError('Param must be instanceof User');

        if(isNaN(user.id) || user.id <= 0)
            throw new InvalidParamError('user.id must be a valid number!')

        try {
            const user = await this.getTable()
                .where('id', user.id)
                .update({
                    username: user.username,
                    password: user.password
                 });
            return user;
        } catch (error) {
            throw new DatabaseError(error.message);
        }
    }

    /**
     * @param {Number} id of the user to get
     * @returns {Promise<User>} user with the specified id
     */
    async select(id){
        try {
            const [user] = await this.getTable().where('id', id);
            return user;
        } catch (error) {
            throw new DatabaseError(error.message);
        }
    }

    /**
     * @returns {Promise<User[]>} All users with ids and names populated
     */
    async selectAll(){
        try {
            const users = await this.getTable().select('id', 'username');
            return users.map(user => new User(user));
        } catch (error) {
            throw new DatabaseError(error.message);
        }
    }

}