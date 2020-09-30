const Sequelize = require('sequelize');
const _config = require("../config/keys.ts")

const sequelize = new Sequelize(_config.database, _config.user, _config.pass, {
	dialect: 'mariadb'
})
const Project = sequelize.define('project', {
  title: Sequelize.STRING,
  jotario: Sequelize.STRING,
  nani: Sequelize.STRING,
  description: Sequelize.TEXT

},{
	tableName: "dio"
})



module.exports = Project
