const express = require('express');
const router = express.Router();
const User = require("../users/Model.ts");
const Event = require("./EventModel.ts");
const EventMember = require("./EventMember.ts");
const Sequelize = require("sequelize")
const {or, and, gt, lt} = Sequelize.Op;

/* @route GET api/events
 * @desc Get all the events
 */
router.get("/getall", (req,res)=>{
    Event.findAll()
	.then(ret => {
                const values = ret.map(x => x.dataValues);
                res.status(200).send(values);
        })
        // .catch(err => {console.log(err); res.sendStatus(404)})
        .catch(err => {res.sendStatus(404)})
    
})
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
                // User.findAll({where:{ username:req.body.Manager}})
                EventMember.create({
                        User: req.body.Manager
                ,Event: ret.dataValues.id
                ,Attended: false
                ,RSVP: false
                ,Manager:true
                })
                .then(() =>{res.sendStatus(200)})
                .catch(err => {res.status(404).send(err)})

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
        .then(ret => res.status(200).send(ret))
        .catch(err =>  res.status(404).send(err))
})


/* @route Post api/events/update/$id
 * @desc Update a specific event
 */
/*
   router.post("/update", (req, res)=>{
// console.log(req.body)
Event.update({
Name: req.body.Name
,Description: req.body.Description
        ,Address: req.body.Address
,Time: req.body.Time
    }, {where:{
id:req.body.id
}})
.then(ret => {
// TODO update this to incldue event member
// EventMember.update({User: req.body.Manager},
// 		       where:{

// 		       })
// .then(() => res.status(200).send({Name: req.body.Name ,Description: req.body.Desc ,Address: req.body.Address ,Time: req.body.Time}) )
res.status(200).send() 
// .then(() => res.status(200).send() )
})
.catch(err => res.status(404).send("Unable to update event") )

})
*/

router.post("/update2", (req, res)=>{
        // console.log(req.body)
        Event.findOne({where:{id:req.body.id}})
        .then(ret => {
                EventMember.findOne({where:{Event:req.body.id}})
                .then(ret2 => {
                        // console.log("WHat is found in event and eventmember", ret, ret2)
                        // res.sendStatus(404)
                        Promise.all([Event.update({Name: req.body.Name ,Description: req.body.Description ,Address: req.body.Address ,Time: req.body.Time}, {where:{id:req.body.id}}), EventMember.update({User:req.body.Manager}, {where:{id:ret.dataValues.id}})])

                        // // TODO Try to fix this hack
                        res.status(200).send({Event:{ Name: req.body.Name ,Description: req.body.Description ,Address: req.body.Address ,Time: req.body.Time} , Manager:{User:req.body.Manager}})
                })
        })
        .catch(err => res.status(404).send("Unable to update event") )

})

router.post("/delete", (req, res)=>{
        EventMember.destroy({ where: {Event: req.body.id}})
        .then( ret=>{
                   Event.destroy({where:{id: req.body.id}})
                   .then( () => {res.sendStatus(200); return})
                   .catch( err => { res.status(404).send(err); return})
        })
        .catch( err => { res.status(404).send(err); return})
})

export {}
module.exports = router;
