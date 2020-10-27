const Sequelize = require('sequelize');
const _config = require("../config/keys.ts")

const sequelize = new Sequelize(_config.database, _config.user, _config.pass, {
	dialect: 'mariadb'
})


const Project = sequelize.define('project', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	jotario:{
		type: Sequelize.STRING,
		allowNull: false
	},
	description:{
		type: Sequelize.TEXT,
		allowNull: false
	},

},{
	tableName: "user"
})



module.exports = Project
