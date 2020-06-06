const db = require('../connection');
const { User } = require('../model');
const { isFilledString } = require('../util/typeChecks/typeCheck');
const DatabaseError = require('../error/databaseError');
const InvalidParamError = require('../error/invalidParamError');

/**
 * @typedef {Object} UserRepository
 * @description Repository class for User entity. Repository functions must only receive and/or return
 * instances of entities classes
 * @see {User} for more info
 */
module.exports = class UserRepository {

    constructor() {
        this.db = () => db('users');
    }

    /**
     * @param {User} user to be inserted
     * @returns {Promise<User>} inserted User with id and username populated
     * @throws {InvalidParamError} if not instance of User
     * @throws {DatabaseError} if database acess throw any error
     */
    async insert(user) {
        if (!(user instanceof User))
            throw new InvalidParamError('Param must be instanceof User');

        const { username, password } = user;
        if (!isFilledString(username) || !isFilledString(password))
            throw new InvalidParamError('Username and Password must be valid strings')

        try {
            const [inserted] = await this.db()
                .insert({ username, password })
                .returning(['id', 'username']);

            if(inserted)    
                return new User(inserted);
        } catch (error) {
            throw new DatabaseError(error.message);
        }
        throw new DatabaseError('Username already exists', 403);
    }

    /**
     * @param {User} user with valid id or username. 
     * @returns {Promise<User>} Deleted User with id and username populated
     * @throws {InvalidParamError} if user not instance of User or user.id is not valid
     * @throws {DatabaseError} if database acess throw any error
     */
    async delete(user) {
        if (!(user instanceof User))
            throw new InvalidParamError('user must be instance of User');

        const { id, username } = user;
        const isValidId = !isNaN(id) && id > 0;
        const isValidName = isFilledString(username);
        if (!isValidId && !isValidName)
            throw new InvalidParamError('User doesnt have a valid neither id nor username');

        const propName = isValidId ? 'id' : 'username';
        const content = isValidId ? parseInt(id) : username;

        try {
            const [deleted] = await this.db().where(propName, content).delete().returning(['id', 'username']);

            if(deleted)
                return new User(deleted);
        } catch (error) {
            throw new DatabaseError(error.message);
        }
        throw new DatabaseError('user id not found', 404);
    }

    /**
     * @param {User} user with a valid id and a new username and/or password
     * @returns {Promise<User>} with id and username populated 
     * @throws {DatabaseError} if database acess throw any error
     */
    async update(user) {
        if (!(user instanceof User))
            throw new InvalidParamError('Param must be instanceof User');

        if (isNaN(user.id))
            throw new InvalidParamError('user.id must be a valid number!');

        const { username, password } = user;
        const isValidName = isFilledString(username);
        const isValidPass = isFilledString(password);
        if (!isValidName && !isValidPass)
            throw new InvalidParamError('User username and password must be valid strings');

        const propsToAdd = {};
        if (isValidPass)
            propsToAdd.password = password;

        if (isValidName)
            propsToAdd.username = username;

        try {
            const [updatedUser] = await this.db()
                .where('id', user.id)
                .update(propsToAdd)
                .returning(['id', 'username']);
            
            if(updatedUser)
                return new User(updatedUser);
        } catch (error) {
            throw new DatabaseError(error.message);
        }
        throw new DatabaseError('user id not found.', 404);
    }

    /**
     * Returns User with specified id or username. if both are present id is utilized
     * @param {User} user with id or username to get
     * @returns {Promise<User>} specified user
     * @throws {DatabaseError} if database acess throw any error
     */
    async select(user) {
        if (!(user instanceof User))
            throw new InvalidParamError('user must be instanceof User');

        const { id, username } = user;
        const isValidId = !isNaN(id) && id > 0;
        const isValidName = isFilledString(username);
        if (!isValidId && !isValidName)
            throw new DatabaseError('Neither id nor username are valid!');

        const propName = isValidId ? 'id' : 'username';
        const content = isValidId ? parseInt(id) : username;

        try {
            const [selected] = await this.db().where(propName, content);
            if(selected){
                return new User({
                    id: selected.id,
                    username: selected.username
                });
            }
        } catch (error) {
            throw new DatabaseError(error);
        }
        throw new DatabaseError(`user ${propName} not found.`, 404);
    }

    /**
     * @param {User[]} users with id or username to find
     * @returns {Promise<User[]>} all found users with id and username 
     */
    async selectAllWhereId(users){
        if(users.some(user => !(user instanceof User)))
            throw new InvalidParamError('All users must be instance of User');
        
        try {
            const selected = await this.db().whereIn(users).select('id', 'username');
            const selectedUsers = selected.map(user => new User(user));
            return selectedUsers;
        } catch (error) {
            throw new DatabaseError(error);
        }
    }

    /**
     * @returns {Promise<User[]>} All users with ids and names populated
     * @throws {DatabaseError} if database acess throw any error
     */
    async selectAll() {
        try {
            const users = await this.db().select('id', 'username');
            return users.map(user => new User(user));
        } catch (error) {
            throw new DatabaseError(error.message);
        }
    }

}