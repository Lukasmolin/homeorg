const UserService = require('../service/userService');
const jsonfy = require('../json/jsonApiProcessor');
const userService = new UserService();

module.exports = {
    async index(req, res){
        try {
            const resp = await userService.getAll();
            const json = jsonfy(resp);
            return res.json(json);
        } catch (error) {
            const json = jsonfy(error);
            return res.status(500).json(json);
        }
    },
    async info(req, res){
        return res.status(501).json({});
    },
    async create(req, res){
        return res.status(501).json({});
    },
    async edit(req, res){
        return res.status(501).json({});
    },
    async delete(req, res){
        return res.status(501).json({});
    }
}