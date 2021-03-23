export {};
const Sequelize = require('sequelize');
const _config = require("../config/keys.ts")

const sequelize = new Sequelize(_config.database, _config.user, _config.pass, {
    dialect: 'mariadb'
})

const User = sequelize.define('user', {
    username: {type: Sequelize.STRING, allowNull: false}
    ,password:{type: Sequelize.STRING, allowNull: false}
    ,email:{type: Sequelize.STRING, allowNull: false}
    ,firstname:{type: Sequelize.STRING, allowNull: false}
    ,lastname:{type: Sequelize.STRING, allowNull: false}
   
    

    // NOTE:  This will only worked iwth MySQL/MariaDB, as explaiend in https://sequelize.org/master/manual/model-basics.html#data-types
    // If this cannot be allowed, make type for poins BIGINT(11)

    ,points:{type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue:0}
    ,role_id:{type: Sequelize.INTEGER, allowNull: false,  defaultValue:0}
    
    // For reseting password only
    ,resetPassword_token:{type: Sequelize.STRING, allowNull: true}

    // NOTE: https://sequelize.org/master/manual/model-basics.html a weird mention to DataType.Date for mysql/sqlite, thing. I'm not sure, so just make note of this
    ,resetPassword_expiry:{type: Sequelize.DATE, allowNull: true}

    ,isOwner:{type: Sequelize.BOOLEAN, allowNull: true, defaultValue:false}
})




module.exports = User
