const utilities = require("../misc/utilities");
const logger = utilities.getLogger();

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: '129.114.27.152',
    user: 'kvk745',
    password: '0FdnuBpjQGdoxyi8hSOt',
    database: 'cs4783_kvk745'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

module.exports = {
	insert: (request) => {
		let id = ""
		let address = request.query.address;
		let city = request.query.city;
		let state = request.query.state;
		let zip = request.query.zip;
		let row = [address, city, state, zip];
		let sql = `INSERT INTO property(address,city,state,zip)
           VALUES(?)`;

		// execute the insert statment
		connection.query(sql,[row], function (err, result) {
			if (err) throw err;
			console.log("1 record inserted, ID: " + result.insertId);
			id = result.insertId;
		  });

		connection.end();
		return id;
	}
};