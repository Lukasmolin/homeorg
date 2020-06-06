module.exports = function (error, res) {
    console.error(error);
    const json = jsonfy(error);
    const status = error.status || 500;
    res.status(status).json(json);
};