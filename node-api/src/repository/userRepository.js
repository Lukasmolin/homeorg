const db = require('../connection');
const { User } = require('../model');
const DatabaseError = require('../error/databaseError');

module.exports = class UserRepository {

    constructor(){
        this.table = 'users';
    }

    async insert(user){
        
    }

    async delete(user){
        return new User('nome', 'pass', 3);
    }

    async deleteById(id){
        return new User('nome', 'pass', 3);
    }

    async update(user){
        return new User('nome', 'pass', 3);
    }

    async select(user){
        return await db('users').select
    }

    async selectAll(){
        try {
            const user = await db('users').select('id, username');
            return new User(user);
        } catch (error) {
            console.error(error);
            throw new DatabaseError(error.message)
        }
    }

}