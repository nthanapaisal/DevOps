let express = require('express');
let router = express.Router();
const gateway = require("../gateways/propertydb");
const utilities = require("../misc/utilities");
const accessControl = require("../misc/accessControl");
const validateInputs = require("../misc/validateInputs");
var bodyParser = require('body-parser');
const { validateAPIKey } = require('../misc/accessControl');

const logger = utilities.getLogger();

var jsonParser = bodyParser.json();

// I like to log who is calling the web services
router.use(function (req, res, next) {
    const ip = utilities.getRequestIPAddress(req);
    logger.info("Properties request route " + req.originalUrl + " from " + ip);
    next();
});

// this is the top-level GET route for the /properties router
router.get('/',
  async function(request, response) {
  		const result = await gateway.fetchProperties();
        logger.info("success");
        utilities.sendResponse(response, 200, result);
    }
);

router.post('/',
  async function(request, response) {

        let key = request.headers.api_key; 
        let address = request.query.address;
        let city = request.query.city;
        let state = request.query.state;
        let zip = request.query.zip;

        if(accessControl.validateAPIKey(key) == false){
            logger.info("error");  
            utilities.sendResponse(response, 401, "Invalid API key"); 
        }
        else if (validateInputs.validatePost(address, city, state, zip) != 0){
            console.log("POST Request Failed.");
            validateInputs.sendResponse(validateInputs.validatePost(address, city, state, zip), response);
        }
        else{
            const result = await gateway.insert(request);
            logger.info("success");
            utilities.sendResponse(response, 200, "Inserted property Id: " + result); 
        }
    }
);


router.get('/:propertyId',
  async function(request, response) {
        try{
            const result = await gateway.fetchProperty(request);
            logger.info("success");
            utilities.sendResponse(response, 200,result);
        }
        catch(error){
            logger.info("error");
            utilities.sendResponse(response, 404, "Retrieving an invalid property.");
        }
    }
);

router.delete('/:propertyId',
  async function(request, response) {

        let key = request.headers.api_key; 
        if(accessControl.validateAPIKey(key) == false){
            logger.info("error");  
            utilities.sendResponse(response, 401, "Invalid API key"); 
        }
        else{
            try{
                const result = await gateway.delete(request);
                logger.info("success");
                utilities.sendResponse(response, 200, "Deleted property: " + result);
            }
            catch(error){
                logger.info("error");
                utilities.sendResponse(response, 404,"Deleting an invalid property.");
            }
            
        }
        
    }
);

router.put('/:propertyId',
  jsonParser,
  async function(request, response) {

        let key = request.headers.api_key; 
        if(accessControl.validateAPIKey(key) == false){
            logger.info("error");  
            utilities.sendResponse(response, 401, "Invalid API key"); 
        }
        else{
            let columnsToBeUpdated = {};
            // get all parameters in request.body and add to map 
            for (const [key, value] of Object.entries(request.body)) {
                //console.log(key, value);
                columnsToBeUpdated[key] = value;
            }		    

            if (validateInputs.validatePut(columnsToBeUpdated) != 0){
                console.log("PUT Request Failed.");
                validateInputs.sendResponse(validateInputs.validatePut(columnsToBeUpdated));
            }
            else{
                const result = await gateway.update(columnsToBeUpdated, request);
                logger.info("success");
                utilities.sendResponse(response, 200, "Updated property: " + result);
            }
        }
    }
);


module.exports = router;