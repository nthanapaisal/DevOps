let express = require('express');
let router = express.Router();

const gateway = require("../gateways/propertydb");

const utilities = require("../misc/utilities");
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


router.get('/:propertyId',
  async function(request, response) {
        //add parameters in propertydb.js will ---
        const result = gateway.fetchProperties();
          
        //get propertyId from the path
        let id = request.params.propertyId;
        
        logger.info("success");

        utilities.sendResponse(response, 200, "returning a property number: " + id);
    }
);

module.exports = router;