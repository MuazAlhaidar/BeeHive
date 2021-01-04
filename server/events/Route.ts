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
                                ,Manager:true
                        })
                        .then(() => res.sendStatus(200))
                        .catch(err => {console.log(err); res.status(404).send(err)})
                })
                .catch(err => res.status(403).send(err) )
                // .catch(err => {console.log(err); res.status(404).send(err)})

        })
        .catch(err => res.status(404).send(err))


})


/* @route GET api/events/get/$id
 * @desc Retrieve infromation about an event
 */
router.get("/get", (req, res)=>{
    Event.findOne({
	where:{id:req.query.id}
    })
	.then(ret =>{
	    res.status(200).send(ret)
	})
	.catch(err =>  res.status(404).send(err))
})


/* @route Post api/events/update/$id
 * @desc Update a specific event
 */
router.post("/update", (req, res)=>{
    Event.update({
	Name: req.body.Name
	,Description: req.body.Desc
	,Address: req.body.Address
	,Time: req.body.Time
    }, {where:{
	id:req.body.id
    }})
	.then(ret => res.status(200).send(ret))
	.catch(err => res.status(404).send("Unable to update event") )

})
export {}
module.exports = router;
