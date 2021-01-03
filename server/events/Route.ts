const express = require('express');
const router = express.Router();
const User = require("../users/Model.ts");
const Event = require("./EventModel.ts");
const EventMember = require("./EventMember.ts");
const Sequelize = require("sequelize")
const {or, and, gt, lt} = Sequelize.Op;

/* @route POST api/events/new
 * @desc Create a new event
 */
router.post("/new", (req,res)=>{
        let fields=["Name", "Description", "Address", "Time", "Manager"]
        for(let field in fields){
                if(req.body[fields[field]] === undefined){
                        res.status(402).send("Fields have been changed")
                        return;
                }
        }
        Event.create({
                Name: req.body.Name
                ,Description: req.body.Description
                ,Address: req.body.Address
                ,Time: req.body.Time
        })
        .then(ret =>   {
                User.findAll({where:{ username:req.body.Manager}})
                .then(ret2 => {
                        EventMember.create({
                                User: ret2[0].dataValues.id
                                ,Event: ret.dataValues.id
                                ,Attended: false
                                ,RSVP: false
                        })
                        .then(() => res.sendStatus(200))
                        .catch(err => {console.log(err); res.status(404).send(err)})
                })
                .catch(err => res.status(403).send(err) )
                // .catch(err => {console.log(err); res.status(404).send(err)})

        })
        .catch(err => res.status(404).send(err))


})


export {}
module.exports = router;
