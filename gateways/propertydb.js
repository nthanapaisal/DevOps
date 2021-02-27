const utilities = require("../misc/utilities");
const logger = utilities.getLogger();
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: '129.114.27.152',
    user: 'iaf873',
    password: 'C6L7Xf2GvpeySBMn1XYf',
    database: 'cs4783_iaf873'
});

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });

module.exports = {
	fetchProperties: () => {
		let sql = `SELECT * FROM property`;
		var ret = null;
		// execute the insert statment
		connection.query(sql, function (err, result) {
			if (err) throw err;
			ret = JSON.stringify(result);
			console.log("All properties fetched");
			
		});
		connection.end();
		return ret;

	},


	fetchProperty: (request) => {
	 	let id = request.query.id;
		let sql = `SELECT * FROM property WHERE id = ?`; 
		
		// execute the insert statment
		connection.query(sql,[id], function (err, result) {
			if (err) throw err;
			ret = JSON.stringify(result);
			console.log("1 record fetched, ID: " + id);
		});
		connection.end();
		return ret; //return the whole table

	},
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
			ret = JSON.stringify(result);
			console.log("1 record inserted, ID: " + result.insertId);
		  });

		connection.end();
		return ret;
	}
	,delete: (request) => {
		let id = request.query.id;
		let sql = `DELETE FROM property WHERE id = ?`; 

		// execute the insert statment
		connection.query(sql,[id],function (err, result) {
			if (err) throw err;
			ret = JSON.stringify(result);
			console.log("1 record deleted, ID: " + id);
		});
		connection.end();
		return ret; //return deleted row 
	}
	,update: (request) => {
		let id = request.query.id;
		let address = request.query.address;
		let city = request.query.city;
		let state = request.query.state;
		let zip = request.query.zip;
		let row = [address, city, state, zip, id];
		let sql = `UPDATE property SET address = ?, city = ?, city = ?, zip = ? WHERE id = ?`;

		// execute the insert statment
		connection.query(sql,row,function (err, result) {
			if (err) throw err;
			ret = JSON.stringify(result);
			console.log("1 record update, ID: " + id);
		});
		
		connection.end();
		return ret; 

	}
};