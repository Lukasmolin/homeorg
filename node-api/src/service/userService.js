const UserRepository = require('../repository/userRepository');

module.exports = class UserService {

    constructor(){
        this.repo = new UserRepository();
    }

    async getAll(){
        const resp = await this.repo.selectAll();
        return resp;
    }
    
    async create(newUser){
        try {
            
        } catch (error) {
            
        }
    }

    async get(id){
        try {
            
        } catch (error) {
            
        }
    }

    async edit(id, user){
        try {
            
        } catch (error) {
            
        }
    }

    async delete(id){
        try {
            
        } catch (error) {
            
        }
    }

}