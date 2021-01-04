export {};
const Sequelize = require('sequelize');
const _config = require("../config/keys.ts")
const Event = require("./EventModel.ts")
const User = require("../users/Model.ts")

const sequelize = new Sequelize(_config.database, _config.user, _config.pass, {
    dialect: 'mariadb',
    logging: false
})

const EventMember = sequelize.define('eventmember', {
    // Event: {type: Event, allowNull: false}
    User:{
            type: Sequelize.INTEGER,
            references:{
                    model: User
                    ,key: "id"
                    ,allowNull:false
            }
    }
    ,Event:{
            type: Sequelize.INTEGER,
            references:{
                    model: Event
                    ,key: "id"
                    ,allowNull:false
            }
    }
    ,Attended: {type: Sequelize.BOOLEAN, allowNull: false}
    ,RSVP: {type: Sequelize.BOOLEAN, allowNull: false}
    ,Manager: {type: Sequelize.BOOLEAN, allowNull: false}
})

// EventMember.hasOne(User)
// User.hasOne(EventMember)
// EventMember.hasOne(Event)
// console.log(Event)



module.exports = EventMember
