const BillRepository = require('../repository/userRepository');

module.exports = class BillService {

    constructor(){
        this.repo = new BillRepository();
    }

    

}