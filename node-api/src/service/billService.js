const BillRepository = require('../repository/billRepository');

module.exports = class BillService {

    constructor(){
        this.repo = new BillRepository();
    }

    

}