const express = require('express');
const cors = require('cors');


// Setting stuff up
const app = express();
app.use( cors());
app.use(express.json())

function main(){
	// // Routing
	// Routes setup
	// const users = require('./routes/users.ts'); app.use('/api/users', users);
	const test = require('./routes/test.ts'); app.use('/api/test', test);

	const port = process.env.PORT || 4200;

	console.log("darkness");
	app.listen(port, () => console.log(`Server started at ${port}`));
}

// DB setup
/* In the event the tables/database is not setup/wrong size, this should take care of that */
/* Note: this means that if the models get change, then the program will delete the table*/
/* And replace it with the new model */
/* TODO once we get this in production, we have to disable this behavior. Otherwise*/
/* We will be made an example of for crap developers */
/* So be wary of this section in production: please please please please please*/
/* remember this, and don't gloss over it */

// DB Models
const Test = require('./model/Test.ts');
async function initialize() {
	// create db if it doesn't already exist
	const db = require('./config/keys.ts');
	const {Sequelize} = require('sequelize');
	const mariadb = require('mariadb')
	const pool = mariadb.createPool({
		host: db.host,
		user: db.user,
		password: db.pass,
		connectionLimit: 5
	});
	pool.getConnection()
	.then(conn => {
		conn.query(`CREATE database if not exists  ${db.database} ;`)
		const sequelize = new Sequelize(db.database, db.user, db.pass,{
			dialect: 'mariadb',
			logging: console.log
		})
		// Creating tables based on models


		// sequelize.sync()
		sequelize.sync({force:true})
		.then(() => {
			// Model synicng
			if(Test == sequelize.models.Project)
				console.log("NICE");
			else{
				console.log("The table is not equal to the sql represntation: migrate?")
			}
			Test.sync({force:true});
		});
	})
	.catch(err =>{
		console.log(err);
	});




	// For ecah table in database
	// If table is not same as model, override table
}

initialize();
export {}
