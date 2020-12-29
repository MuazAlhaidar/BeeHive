const express = require('express');
const cors = require('cors');


// Setting stuff up
const app = express();
app.use( cors());
app.use(express.json())


// DB setup
const User = require('./model/User.ts');
const Test = require('./model/Test.ts');

// Dtabase initalize
// async function initialize() {
// create db if it doesn't already exist
const db = require('./config/config.json')["development"];

const {Sequelize} = require('sequelize');
// const mariadb = require('mariadb')
// const pool = mariadb.createPool({
// 	host: db.host,
// 	user: db.username,
// 	password: db.password,
// 	connectionLimit: 5
// });
// pool.getConnection()
// 	.Then(conn => {
// 	    conn.query(`CREATE database if not exists  ${db.database} ;`)
const sequelize = new Sequelize("studentdev", "rwx", "I am Sofa King.", {
    logging:false,
    dialect:"mariadb"
})

// const sequelize = new Sequelize(db.database, db.username, db.password,{
// 	logging: false,
// 	dialect: 'mariadb'
// })
// Creating tables based on models

/* In the event the tables/database is not setup/ or change size, this overrides that */
/* Note: this means that if the models get change, then the program will delete the table*/
/* And replace it with the new model */
/* TODO once we get this in production, we have to disable this behavior. Otherwise*/
/* We will be made an example of for crap developers */
/* So be wary of this section in production: please please please please please*/
/* remember this, and don't gloss over it */

// sequelize.sync()
// If DEV=true, it will erase everything. 
//     if( process.env.DEV == "true"){
// 	// sequelize.sync()
// 	sequelize.sync({force:true})
// 	    .then(() => {
// 		Test.sync({force:true});
// 		User.sync({force:true});
// 	    });
//     }
//     else{
// 	sequelize.sync({force:false})
// 	    .then(() => {
// 		Test.sync({force:false});
// 		User.sync({force:false});
// 	    });
//     }
// })
// .catch(err =>{
//     console.log(err);
// });




// For ecah table in database
// If table is not same as model, override table
// }

// initialize();
// // Routing
// Routes setup
const users = require('./routes/users.ts'); app.use('/api/users', users);
// const test = require('./routes/test.ts'); app.use('/api/test', test);
// app.use('/api/user', users);

const port = process.env.PORT || 4200;

app.listen(port, () => console.log(`Server started at ${port}`));
export {}
