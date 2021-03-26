const utilities = require("../misc/utilities");
const logger = utilities.getLogger();

// check to validate the input values
// and handle errors
module.exports = {
	validatePost: (address, city, state, zip) => {

        let parameter = 0;
        
        if (String(address).length > 1024 || String(address).length < 1 || address == null) {
         parameter = 1;
        }

        else if (String(city).length > 255 || String(city).length < 1 || city == null){
         parameter = 2;
        }

        else if (String(state).length > 2 || String(state).length < 2 || state == null){
         parameter = 3;
        }

        else if (String(zip).length > 10 || String(zip).length < 5 || zip == null){ 
         parameter = 4;
        }
        return parameter;
    },
    sendResponseMessage: (parameter, response) => {
        switch(parameter) {
            case 1:
                logger.info("error"); 
                utilities.sendResponse(response, 400, "address is not between 1 and 1024 characters"); 
                break;
            case 2:
                logger.info("error"); 
                utilities.sendResponse(response, 400, "city is not between 1 and 255 characters"); 
                break;
            case 3:
                logger.info("error"); 
                utilities.sendResponse(response, 400, "state is not 2 characters"); 
                break;
            case 4:
                logger.info("error"); 
                utilities.sendResponse(response, 400, "zip is not between 5 and 10 characters"); 
                break;
            default:
                logger.info("error"); 
                console.log("ERROR: tag is not a valid value.");
        }
    },
    validatePut: (columnsToBeUpdated) => {

        let parameter = 0;
        
        if (columnsToBeUpdated['address'] != null && String(columnsToBeUpdated['address']).length > 1024 || String(columnsToBeUpdated['address']).length < 1) {
            parameter = 1;
        }

        else if (columnsToBeUpdated['city'] != null && String(columnsToBeUpdated['city']).length > 255 || String(columnsToBeUpdated['city']).length < 1){
            parameter = 2;
        }

        else if (columnsToBeUpdated['state'] != null && String(columnsToBeUpdated['state']).length > 2 || String(columnsToBeUpdated['state'] ).length < 2){; 
            parameter = 3;
        }

        else if (columnsToBeUpdated['zip'] != null && String(columnsToBeUpdated['zip']).length > 10 || String(columnsToBeUpdated['zip']).length < 5){
            parameter = 4;
        }
        
        return parameter;
    }
};


