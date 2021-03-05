const utilities = require("../misc/utilities");
const logger = utilities.getLogger();

//check to validate the input values
//and handle errors
module.exports = {
	validatePost: (request, response) => {
        let address = request.query.address;
        let city = request.query.city;
        let state = request.query.state;
        let zip = request.query.zip;
        let flag = true;
        
        if (String(address).length > 1024 || String(address).length < 1 || address == null) {
            logger.info("error");  
            utilities.sendResponse(response, 400, "address is not between 1 and 1024 characters"); 
            flag = false;
        }

        if (String(city).length > 255 || String(city).length < 1 || city == null){
            logger.info("error");  
            utilities.sendResponse(response, 400, "city is not between 1 and 255 characters"); 
            flag = false;
        }

        if (String(state).length > 2 || String(state).length < 2 || state == null){
            logger.info("error");  
            utilities.sendResponse(response, 400, "state is not 2 characters"); 
            flag = false;
        }

        if (String(zip).length > 10 || String(zip).length < 5 || zip == null){
            logger.info("error");  
            utilities.sendResponse(response, 400, "zip is not between 5 and 10 characters"); 
            flag = false;
        }
        return flag;
    },
    validatePut: (columnsToBeUpdated, request, response) => {

        let flag = true;
        
        if (columnsToBeUpdated['address'] != null && String(columnsToBeUpdated['address']).length > 1024 || String(columnsToBeUpdated['address']).length < 1) {
            logger.info("error");  
            utilities.sendResponse(response, 400, "address is not between 1 and 1024 characters"); 
            flag = false;
        }

        if (columnsToBeUpdated['city'] != null && String(columnsToBeUpdated['city']).length > 255 || String(columnsToBeUpdated['city']).length < 1){
            logger.info("error");  
            utilities.sendResponse(response, 400, "city is not between 1 and 255 characters"); 
            flag = false;
        }

        if (columnsToBeUpdated['state'] != null && String(columnsToBeUpdated['state']).length > 2 || String(columnsToBeUpdated['state'] ).length < 2){
            logger.info("error");  
            utilities.sendResponse(response, 400, "state is not 2 characters"); 
            flag = false;
        }

        if (columnsToBeUpdated['zip'] != null && String(columnsToBeUpdated['zip']).length > 10 || String(columnsToBeUpdated['zip']).length < 5){
            logger.info("error");  
            utilities.sendResponse(response, 400, "zip is not between 5 and 10 characters"); 
            flag = false;
        }
        
        return flag;
    }
};


