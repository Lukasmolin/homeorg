class InvalidParamError extends Error {

    constructor(message, httpStatus = 500){
        super(message);
        this.status = httpStatus;
        this.name = "InvalidParamError"
    }

}