/**
 * Represents an User
 * @typedef {Object} User
 */
class User {
    /**
     * @param {(String | User)} user either user name or the full user object 
     * @param {String} [password] user password
     * @param {Number} [id] user id
     */
    constructor(user, password, id){
        this.modelClass = "User";
        this.id;
        this.username;
        this.password;
        
        if(arguments.length === 1){
            if(typeof user === 'string' || user instanceof String){
                this.username = user;
            } else {
                this.username = user.username;
                this.password = user.password;
                this.id = user.id;
            }
        } else {
            this.username = user;
            this.password = password;
            this.id = id;
        }        
    }
}

module.exports = User;