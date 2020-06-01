const UserService = require('../service/userService');
const jsonfy = require('../util/json/jsonApiProcessor');
const BadRequestError = require('../error/BadRequestError');
const { User } = require('../model');
const { isFilledString } = require('../util/typeChecks/typeCheck');

const userService = new UserService();

function handleError(error, res){
    console.error(error);
    const json = jsonfy(error);
    const status = error.status || 500;
    res.status(status).json(json);
}

module.exports = {
    async index(req, res){
        try {
            const resp = await userService.getAll();
            const json = jsonfy(resp);
            return res.json(json);
        } catch (error) {
            return handleError(error, res);
        }
    },
    async info(req, res){
        const { id } = req.params;

        if(isNaN(id) || id <= 0)
            return handleError(new BadRequestError('Invalid Id'), res);

        const user = new User({id});
        try {
            const resp = await userService.get(user);
            const json = jsonfy(resp);
            return res.json(json);
        } catch (error) {
            return handleError(error, res);
        }
    },
    async create(req, res){
        if(!req.body.data)
            return handleError(new BadRequestError('No data prop inside payload'), res);

        const { username, password } = req.body.data;
        if(!username || !password || !isFilledString(username) || !isFilledString(username))
            return handleError(new BadRequestError('Data must contain valid non-empty string username and password'), res);

        try {
            const newUser = new User(username, password);
            const resp = await userService.create(newUser);
            const json = jsonfy(resp);
            return res.json(json);
        } catch (error) {
            return handleError(error, res);
        }
    },
    async edit(req, res){
        const { id } = req.params;
        if(isNaN(id) || id <= 0)
            return handleError(new BadRequestError('Invalid Id'), res);

        if(!req.body.data)
            return handleError(new BadRequestError('No data prop inside payload'), res);

        const { username, password } = req.body.data;
        if(!username || !password)
            return handleError(new BadRequestError('Data must contain username and password'), res);

        try {
            const editUser = new User(username, password, id);
            const resp = await userService.edit(editUser);
            const json = jsonfy(resp);
            return res.json(json);
        } catch (error) {
            return handleError(error, res);
        }
    },
    async delete(req, res){
        const { id } = req.params;
        const isValidId = !isNaN(id) && id > 0;
        if(!isValidId)
            return handleError(new BadRequestError('Must have valid id'));

        const user = new User({id});
        try {
            const resp = await userService.delete(user);
            const json = jsonfy(resp);
            return res.json(json);
        } catch (error) {
            return handleError(error, res);
        }
    }
}