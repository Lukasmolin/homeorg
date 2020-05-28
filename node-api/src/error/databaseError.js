class DatabaseError extends Error {

    constructor(message, httpStatus = 500){
        super(message);
        this.name = "Database Error";
        this.status = httpStatus;
    }

}