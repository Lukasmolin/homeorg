const db = require('../connection');
const { User } = require('../model');

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
        return new User('nome', 'pass', 3);
    }

    async selectAll(){
        return await db('users').select('*');
    }

}