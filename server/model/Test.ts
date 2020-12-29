export {};
const Sequelize = require('sequelize');
const _config = require("../config/keys.ts")

const sequelize = new Sequelize(_config.database, _config.user, _config.pass, {
	dialect: 'mariadb'
})


const Project = sequelize.define('project', {

	stand_user: {
		type: Sequelize.STRING,
		allowNull: false
	},
	homo:{
		type: Sequelize.INTEGER,
		allowNull: false
	},
	stand:{
		type: Sequelize.TEXT,
		allowNull: false
        }
                
})



module.exports = Project
