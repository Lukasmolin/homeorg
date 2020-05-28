const db = require('../connection');
const { User } = require('../model');
const DatabaseError = require('../error/databaseError');
const InvalidParamError = require('../error/invalidParamError');

module.exports = class UserRepository {

    constructor(){
        this.getTable = () => db('users');
    }

    async insert(user){
        if(!(user instanceof User)){
            const err = new InvalidParamError('Param must be instanceof User');
            console.error(err);
            throw err;
        }
        try {
            const inserted = await this.getTable().insert(user);
            return inserted;
        } catch (error) {
            console.error(error);
            return new DatabaseError(error.message);
        }
    }

    async deleteById(id){
        if(isNaN(id)) throw new InvalidParamError("Id is Not a Number");
        try {
            const deleted = await this.getTable().where('id', id).delete().returning('*').first();
            return new User(deleted);
        } catch (error) {
            console.error(error);
            throw new DatabaseError(error.message);
        }
    }

    async update(user){
        if(!(user instanceof User)){
            const err = new InvalidParamError('Param must be instanceof User');
            console.error(err);
            throw err;
        }
        try {
            const user = await this.getTable()
                .where('id', user.id)
                .update({
                    username: user.username,
                    password: user.password
                 });
            return user;
        } catch (error) {
            console.error(error);
            throw new DatabaseError(error.message);
        }
    }

    async select(user){
        try {
            const [user] = await this.getTable().where('id', user.id);
            return user;
        } catch (error) {
            console.error(error);
            throw new DatabaseError(error.message);
        }
    }

    async selectAll(){
        try {
            const users = await this.getTable().select('id', 'username');
            return users.map(user => new User(user));
        } catch (error) {
            console.error(error);
            throw new DatabaseError(error.message);
        }
    }

}