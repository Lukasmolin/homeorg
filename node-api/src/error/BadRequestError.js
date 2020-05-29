class BadRequestError extends Error {

    constructor(message = "BadRequestError", httpStatus = 400){
        super(message);
        this.name = "BadRequestError";
        this.status = httpStatus;  
    }

}

module.exports = BadRequestError;