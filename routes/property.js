let express = require('express');
let router = express.Router();
const gateway = require("../gateways/propertydb");
const utilities = require("../misc/utilities");
const accessControl = require("../misc/accessControl");
const logger = utilities.getLogger();


// I like to log who is calling the web services
router.use(function (req, res, next) {
    const ip = utilities.getRequestIPAddress(req);
    logger.info("Properties request route " + req.originalUrl + " from " + ip);
    next();
});

// this is the top-level GET route for the /properties router
router.get('/',
  async function(request, response) {
  		const result = gateway.fetchProperties();
        logger.info("success");
        utilities.sendResponse(response, 200, result);
    }
);

router.post('/',
  async function(request, response) {
        
        if(accessControl.validateAPIKey(request) == false){
            logger.info("error");  
            utilities.sendResponse(response, 401, "Invalid API key"); 
        }else{
            const result = await gateway.insert(request);
            logger.info("success");
            utilities.sendResponse(response, 200, "Inserted property Id:" + result); 
        }
    }
);


router.get('/:propertyId',
  async function(request, response) {
        
        const result = gateway.fetchProperty(request);
        logger.info("success");
        utilities.sendResponse(response, 200,result);
    }
);

router.delete('/:propertyId',
  async function(request, response) {

        if(accessControl.validateAPIKey(request) == false){
            logger.info("error");  
            utilities.sendResponse(response, 401, "Invalid API key"); 
        }
        else{
            const result = gateway.delete(request);
            let propertyId = request.params.propertyId;
            logger.info("success");
            utilities.sendResponse(response, 200, "deleted property Id:" + propertyId);
        }
        
    }
);

router.put('/:propertyId',
  async function(request, response) {
        //get propertyId from the path
        //let id = request.params.propertyId;

        if(accessControl.validateAPIKey(request) == false){
            logger.info("error");  
            utilities.sendResponse(response, 401, "Invalid API key"); 
        }
        else{
            const result = gateway.update(request);
            logger.info("success");
            utilities.sendResponse(response, 200, "”updated”");
        }
    }
);


module.exports = router;