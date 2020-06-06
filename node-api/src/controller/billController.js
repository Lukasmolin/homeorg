const UserService = require('../service/userService');
const BillService = require('../service/billService');
const DebtService = require('../service/debtService');
const jsonfy = require('../util/json/jsonApiProcessor');
const BadRequestError = require('../error/BadRequestError');
const { User, Bill } = require('../model');
const { isFilledString } = require('../util/typeChecks/typeCheck');
const handleError = require('../error/handleError');

const userService = new UserService();
const billService = new BillService();

module.exports = {
    async create(req, res) {
        if (!req.body.data)
            return handleError(new BadRequestError('No data prop inside body'), res);

        if (!req.headers.user_id)
            return handleError(new BadRequestError('No data pro inside body'), res);

        const userId = new User({ id: req.headers.user_id });
        let user;
        try {
            const resp = await userService.get(userId);
            user = resp;
        } catch (error) {
            return handleError(error, res);
        }

        if (!user)
            return handleError(new Error('Unknown server error'), res);

        const { data } = req.body;
        try {
            const toCreate = billService.parse(data, true);
            const resp = billService.save(toCreate);
            const json = jsonfy(resp);
            return res.json(json);
        } catch (error) {
            return handleError(error, res)
        }
    }
}