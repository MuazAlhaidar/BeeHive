export {};
const Sequelize = require('sequelize');
const _config = require("../config/keys.ts")

const sequelize = new Sequelize(_config.database, _config.user, _config.pass, {
    dialect: 'mariadb',
    logging: false
})

const Event = sequelize.define('event', {
    Name: {type: Sequelize.STRING, allowNull: false}
    ,Description: {type: Sequelize.STRING, allowNull: false}
    ,Address: {type: Sequelize.STRING, allowNull: false}
    ,Time: {type: Sequelize.DATE, allowNull: false}
})




module.exports = Event
