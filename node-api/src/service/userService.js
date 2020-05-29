const UserRepository = require('../repository/userRepository');
const InvalidParamError = require('../error/invalidParamError');
const { User } = require('../model');

module.exports = class UserService {

    constructor(){
        this.repo = new UserRepository();
    }

    /**
     * Gets all users with id and username populated
     * @returns {Promise<User[]>} all users
     */
    async getAll(){
        const resp = await this.repo.selectAll();
        return resp;
    }
    
    /**
     * Creates new user
     * @param {User|String} newUser string with username is expected if second parameter is passed, otherwise {User}
     * with username and password expected
     * @param {String} [password] user password
     */
    async create(newUser, password){
        let user;
        if(typeof newUser === 'string' || newUser instanceof String){
            
        }

        if(!(newUser instanceof User)) throw new InvalidParamError("Param: NewUser Must be instanceof User");

        const resp = await this.repo.insert(newUser);
        return resp;
    }

    /**
     * @param {(Number|User|String)} id Either a instanceOf User with a valid id prop or the id itself
     * @returns {Promise<User>} selected user
     * @throws {InvalidParamError} if negative number or invalid {id} type 
     */
    async get(id){
        if(isNaN(id) && !(id instanceof User))
            throw new InvalidParamError('Param: id is neither a number nor instanceof User.');

        if(id <= 0)
            throw new InvalidParamError('Param: id must be a positive number');

        const userId = isNaN(id) ? user.id : parseInt(id);
        const resp = await this.repo.select(userId);
        return resp;
    }

    async edit(user){
        if(!(user instanceof User)) throw new InvalidParamError('')

        const { id } = user;
        if(isNaN(id) || id <= 0) throw new InvalidParamError('')
        
    }

    async delete(id){
        
    }

}