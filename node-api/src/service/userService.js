const UserRepository = require('../repository/userRepository');
const InvalidParamError = require('../error/invalidParamError');
const { User } = require('../model');
const { isString, isFilledString } = require('../util/typeChecks/typeCheck');

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
     * @param {User} newUser
     */
    async create(newUser){
        if(!(newUser instanceof User))
            throw new InvalidParamError('New user must be instance of User')

        const resp = await this.repo.insert(newUser);
        return resp;
    }

    /**
     * @param {User} user with valid id or username, id is used if both present
     * @returns {Promise<User>} selected user
     * @throws {InvalidParamError} if not instance of User or invalid id 
     */
    async get(user){
        if(!(user instanceof User))
            throw new InvalidParamError('user must be instance of User');

        const resp = await this.repo.select(user);
        return resp;
    }

    /**
     * Edits User with a given id acording to its proprieties
     * @param {User} user with existing id and new username and/or new password
     * @returns {Promise<User>} after edited with id and username populated
     */
    async edit(user){
        if(!(user instanceof User))
            throw new InvalidParamError('user must be instance of User');
        
        const resp = await this.repo.update(user);
        return resp;
    }

    /**
     * @param {User} user with id or username to be deleted, id is used if both present
     * @returns {Promise<User>} with id and username populated
     */
    async delete(user){
        if(!(user instanceof User))
            throw new InvalidParamError('user must be instance of user');

        const resp = await this.repo.delete(user);
        return resp;
    }

}