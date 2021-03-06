const utilities = require("../misc/utilities");
const logger = utilities.getLogger();
require("dotenv").config();
let mysql = require('mysql');
const validateInputs = require("../misc/validateInputs");

const pool = mysql.createPool({
    connectionLimit: 10,    // the number of connections node.js will hold open to our database
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST
 
});

pool.getConnection(function(err, connection) {
	if (err) {
		throw err;
	}
	else
		console.log("Connected to the database.");
});

module.exports = {
	fetchProperties: () => {
		let sql = `SELECT * FROM property`;
		var ret = null;

		return new Promise((resolve, reject)=>{
			pool.query(sql, (error, result)=>{
				if(error){
					return reject(error);
				}
				  console.log("All properties fetched.");
				  return resolve(result);
			 
			});
		});

	},
	fetchProperty: (request) => {
	 	let id = request.query.propertyId;
		let sql = `SELECT * FROM property WHERE property_id = ?`; 
		
		return new Promise((resolve, reject)=>{
			pool.query(sql, id, (error, result)=>{
				if(error){
					return reject(error);
				}
				  
				if (!result.length) {
					if (result)
						return reject(error);
				}
				
				console.log("1 record fetched, ID: " + id);
				return resolve(result);
			 
			});
		});

	},
	insert: (request) => {
		let id;
		let address = request.query.address;
		let city = request.query.city;
		let state = request.query.state;
		let zip = request.query.zip;
		let row = [address, city, state, zip];
		let sql = `INSERT INTO property(address,city,state,zip)
           VALUES(?)`;

		return new Promise((resolve, reject)=>{
			pool.query(sql,[row], (error, result)=>{
				if(error){
					return reject(error);
				}
				  console.log("1 record inserted, ID: " + result.insertId);
				  return resolve(result.insertId);
			 
			});
		});
	}
	,delete: (request) => {
		let id = request.params.propertyId;
		let sql = `DELETE FROM property WHERE property_id = ?`; 
			
		return new Promise((resolve, reject)=>{
			pool.query(sql,id, (error, result)=>{
				if(error){
					return reject(error);
				}
				if(result.affectedRows <= 0){
					return reject(error);
				}

				console.log("1 record deleted, ID: " + id);
				console.log("affected rows: " + result.affectedRows);

				return resolve(id);
			
			});
		});
	}
	,update: (columnsToBeUpdated, request) => {

		let id = request.params.propertyId;
		let sql = `UPDATE property SET ? WHERE property_id = ?`;
		return new Promise((resolve, reject)=>{
			pool.query(sql, [columnsToBeUpdated, id], (error, result)=>{
				if(error){
					return reject(error);
				}
				console.log("1 record updated, ID: " + id);
				return resolve(id);
			
			});
		});
	
	}
};