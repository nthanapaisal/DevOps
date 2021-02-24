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

        utilities.sendResponse(response, 200, "“id”:1,“address”:“501 Test Ave.”,”zip”:”78222”},{“id”:2,“address”:“123 Main Street”,”zip”:”78222”");
    }
);

router.post('/',
  async function(request, response) {
  		const result = gateway.fetchProperties();

        logger.info("success");

        utilities.sendResponse(response, 200, "”added”,”id”:<generated id for property>");
    }
);


router.get('/:propertyId',
  async function(request, response) {
        //get propertyId from the path
        let id = request.params.propertyId;

        //add parameters in propertydb.js will ---
        const result = gateway.fetchProperties(id);
          
        logger.info("success");

        utilities.sendResponse(response, 200, "“id”:1,“address”:“123 Test Ave.”,”city”:”San Antonio”,”state”:”TX”,”zip”:”78222”");
    }
);

router.delete('/:propertyId',
  async function(request, response) {
        //get propertyId from the path
        let id = request.params.propertyId;

        //add parameters in propertydb.js will ---
        const result = gateway.fetchProperties(id);
          
        logger.info("success");
        utilities.sendResponse(response, 200, "”deleted”");
        
    }
);

router.put('/:propertyId',
  async function(request, response) {
        const result = gateway.fetchProperties();

        logger.info("success");

        utilities.sendResponse(response, 200, "”updated”");
        
    }
);

module.exports = router;