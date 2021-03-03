const utilities = require("../misc/utilities");
const logger = utilities.getLogger();
require("dotenv").config();
let mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,    // the number of connections node.js will hold open to our database
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST
 
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
	 	let id = request.query.id;
		let sql = `SELECT * FROM property WHERE id = ?`; 
		
		return new Promise((resolve, reject)=>{
			pool.query(sql,[id], (error, result)=>{
				if(error){
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
		let id = request.query.id;
		let sql = `DELETE FROM property WHERE id = ?`; 

		return new Promise((resolve, reject)=>{
			pool.query(sql,[id], (error, result)=>{
				if(error){
					return reject(error);
				}
				  console.log("1 record deleted, ID: " + id);
				  return resolve(id);
			 
			});
		});
	}
	,update: (request) => {
		let id = request.query.id;
		let address = request.query.address;
		let city = request.query.city;
		let state = request.query.state;
		let zip = request.query.zip;
		let row = [address, city, state, zip, id];
		let sql = `UPDATE property SET address = ?, city = ?, state = ?, zip = ? WHERE id = ?`;
		
		return new Promise((resolve, reject)=>{
			pool.query(sql,[address, city, state, zip, id], (error, result)=>{
				if(error){
					return reject(error);
				}
				  console.log("1 record updated, ID: " + id);
				  return resolve(id);
			 
			});
		});

	}
};