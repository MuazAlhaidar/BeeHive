export {};
const Sequelize = require('sequelize');
const _config = require("../config/keys.ts")
const Group = require("./GroupModel.ts")
const User = require("../users/Model.ts")



const sequelize = new Sequelize(_config.database, _config.user, _config.pass, {
        dialect: 'mariadb',
        logging: false
})

const GroupMember = sequelize.define('groupmember', {
        User:{
                type: Sequelize.INTEGER,
                references:{
                        model: User
                    ,key: "id"
                    ,allowNull:false
                }
        }
    ,Group:{
            type: Sequelize.INTEGER,
            references:{
                    model: Group
                    ,key: "id"
                    ,allowNull:false
            }
    }
    ,Manager: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue:false}

})




module.exports = GroupMember
