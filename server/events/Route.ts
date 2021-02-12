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
        .catch(err => {res.sendStatus(404)})
        // .catch(err => {res.sendStatus(404)})

})
/* @route POST api/events/new
 * @desc Create a new event
 */
router.post("/new", (req,res)=>{
        let fields=["Name", "Description", "Address", "Time", "Manager"]
        for(let field in fields){
                if(req.body[fields[field]] === undefined){
                        res.status(402).send("The field "+fields[field]+" does not appeear")
                        return;
                }
        }
        Event.create({ Name: req.body.Name ,Description: req.body.Description ,Address: req.body.Address ,Time: req.body.Time })
        .then(ret =>   {
                EventMember.create({ User: req.body.Manager ,Event: ret.dataValues.id ,Attended: false ,RSVP: false ,Manager:true })
                .then(ret2 => { res.status(200).send({Event:ret.dataValues, Member:ret2.dataValues})})
                .catch(err => {res.status(403).send(err)})

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
        .then(ret => {
                if(ret===null){
                        res.status(200).send("");
                }
                else
                        res.status(200).send(ret)
        })
        .catch(err =>  res.status(403).send(err))
})


router.post("/update", (req, res)=>{
        Event.findOne({where:{id:req.body.id}})
        .then(ret => {
                Event.update({Name: req.body.Name ,Description: req.body.Description ,Address: req.body.Address ,Time: req.body.Time}, {where:{id:req.body.id}})
                .then(ret2=>{
                        if(ret2[0]===0)
                                res.status(404).send("Didn't found event")
                        else
                                res.status(200).send({Event:{ Name: req.body.Name ,Description: req.body.Description ,Address: req.body.Address ,Time: req.body.Time} })
                })
        })
        .catch(err => res.status(404).send("Unable to update event") )

})

router.post("/delete", (req, res)=>{
        // NOTE
        // At this poitn, I cant be fecking bothered to get 
        // notifications ot members when an event is deleted in.
        EventMember.destroy({ where: {Event: req.body.id}})
        .then( ret=>{
                Event.destroy({where:{id: req.body.id}})
                .then(ret => {
                        if(ret===0) {res.sendStatus(404)}
                                else res.sendStatus(200);
                        return
                })
                .catch( err => { res.status(404).send(err); return})
        })
        .catch( err => { res.status(404).send(err); return})
})

/* @route POST api/events/invite
 * @desc Invite a set of users to an event
 * @body {Event:EventId, Invited:[User1Id, User2Id]}
 */
router.post("/invite", (req, res)=>{
        let users = req.body.Invited
        let Event = req.body.Event
        users.forEach((value)=> {
                EventMember.create({ User: value,Event: Event,Attended: false ,RSVP: true ,Manager:false })
                .catch(err => res.status(404).send("Error in RSVPing people"))
        })
        res.sendStatus(200)

})

/* @route POST api/envite/signin
 * @desc User signs in to an event
 *@body {Event:EventId, User:UserId} */
router.post("/signin", (req, res)=>{
        let user = req.body.User
        let event = req.body.Event
        EventMember.update({Attended:true}, {where:{Event:event, user:user}})
        .then(ret=>{
                if(ret[0] === 0){
                        EventMember.create({Attended:true, Manager:false, RSVP:false, User:user, Event:event}, {where:{Event:event, user:user}})

                }
                res.sendStatus(200)
        })
        .catch(err => {console.log(err);  res.sendStatus(200)});
})


// TODO This can lead to security exploit, of people transfering event ot yourself
/* @route POST api/events/transfer
 * @desc Transfer event to another user
 * @body {Event:EventId, Manager:UserId}
 */
router.post("/transfer", (req, res)=>{
        let user = req.body.Manager
        let event = req.body.Event;
        EventMember.update({Manager:false}, {where:{Manager:true, Event:event}})
                .then(ret =>{
                        if(ret[0]===0){
                                console.log("Error: no events found");
                                res.sendStatus(404);
                        }
                        else{
                                EventMember.update({Manager:true}, {where:{User:user, Event:event}})
                                .then(ret2=>{
                                        if(ret2[0]===0){
                                                EventMember.create({Manager:true, User:user, Event:event, RSVP:false, Attended:false} )
                                                res.sendStatus(200);
                                        }
                                        else
                                                res.sendStatus(200);
                                })
                        }
                })
                .catch(err => {console.log(err); res.sendStatus(404)})
})

/*
 * @route GET api/events/getmembersevents?=id
 * @desc Get all events that an eventmember is invited to
 * body {id:User's id}
 */
router.get("/man", async (req, res)=>{
        let id = req.query.id
        console.log("WOW")
        if(id===undefined)
                res.sendStatus(404)
        else{
                let invited = await EventMember.findAll({where:{User:id, Manager:true}})
                let eventsid=(invited.map((i)=> i.dataValues.Event))
                console.log(invited)
                console.log(eventsid)

                let events = []
                await Promise.all(eventsid.map(async (id)=> Event.findOne({where:{id:id}})))
                .then(ret=>{
                        console.log(ret)
                        res.status(200).send(ret)
                })

        }
})
export {}
module.exports = router;
