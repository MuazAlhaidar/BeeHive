const express = require('express');
const router = express.Router();
const User = require("../users/Model.ts");
const Event = require("./EventModel.ts");
const EventMember = require("./EventMember.ts");
const Sequelize = require("sequelize")
const {or, and, gt, lt} = Sequelize.Op;
const _config = require("../config/keys.ts")
const lib = require("../lib.ts");
const sequelize = new Sequelize(_config.database, _config.user, _config.pass, {
    dialect: 'mariadb',
    logging: false
})

/* @route GET api/events
 * @desc Get all the events
 */
router.get("/getall", (req,res)=>{
        const id = parseInt(req.query.id)
        if(! isNaN(id) && id!=-1){
                const query = sequelize.query(`select events.*,  eventmembers.RSVP from events join eventmembers on events.id= eventmembers.Event ;`)
                .then(ret => {
                        console.log(ret[0])
                        res.status(200).send(ret[0]);
                        return;
                })
                .catch(err => {res.sendStatus(404)})
        }
        else{
                console.log("SUN")
                Event.findAll()
                .then(ret => {
                        const values = ret.map(x => x.dataValues);
                        console.log(values)
                        res.status(200).send(values);
                })
                .catch(err => {res.sendStatus(404)})
        }
        // .catch(err => {res.sendStatus(404)})

})
/* @route POST api/events/new
 * @desc Create a new event
false*/
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

/* @route POST api/events/signin
 * @desc Sign in a number of people
 * @body {Event:EventId, Invited:[User1Id, User2Id]}
 */
router.post("/signin", (req, res)=>{
        let users = req.body.Invited
        let Event = req.body.Event
        users.forEach((value)=> {
        })
        res.sendStatus(200)

})


/* @route GET api/events/ami_rsvp
 * @desc Check if user is rsvp or not or manager
 * @query: {id: id of event, user: user id}*/
router.get("/ami_rsvp", async (req,res)=>{
        try{
                const event = await EventMember.findOne(
                        {where:{User:req.query.user, Event:req.query.id}}
                )
                if(event === null){                      res.send({status:2}).status(200) }
                else if(event.dataValues["Manager"]){    res.send({status:0}).status(200) }
                else{                                    res.send({status:1}).status(200) }


        }
        catch(err){
                console.log(err)
                res.sendStatus(404)
        }


})

/* @route POST api/envite/rsvp
 * @desc User signs in to an event
 *@body {Event:EventId, User:UserId} */
router.post("/rsvp", (req, res)=>{
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
 * @route POST api/events/getmembersevents?=id
 * @desc Get all events that an eventmember is invited to
 * body {id:User's id}
 */
router.post("/man", async (req, res)=>{
        let id = req.body.id
        if(id===undefined){
                console.log("FUCK", req.query, req.body);
                res.sendStatus(404)
        }
        else{
                console.log("First date------------")
                let invited = await EventMember.findAll({where:{User:id, Manager:true}})
                let eventsid=(invited.map((i)=> i.dataValues.Event))
                console.log(invited)
                console.log(eventsid)

                let events = []
                Promise.all(eventsid.map(async (id)=> Event.findOne({where:{id:id}})))
                .then(ret=>{
                        res.status(200).send(ret)
                })

        }
})

/* 
 * @route GET api/events/leaderboard
 * @desc Get all users and hteri poitns
 */
router.get("/leaderboard", async(req, res)=>{
        let users = await User.findAll({attributes:["username", "points"]});
        res.send(users).status(200)
})

/* @route POST api/events/email
 * @desc Send an email to all those who are RSVP to an event
 * @body {id:event's id, subject, body}
 */
router.post("/email", async(req,res)=>{
        const query = await sequelize.query(`select users.email from users JOIN eventmembers ON eventmembers.User=users.id AND eventmembers.Event=${req.body.id} AND eventmembers.RSVP=true;`)
        const emails = query[0].map(i=> i.email)
        lib.email(emails)
        res.sendStatus(200)

})

// @route POST api/users/get_members
// @desc Get those who are RSVP to an event, and those that aren't
// @return {RSVP:[user], not:[user]}
router.post("/get_members", async (req, res)=>{
        let users = await sequelize.query("select users.username, eventmembers.id from eventmembers  join users on users.id=eventmembers.User ;")
        users=users[0];
        // TODO get user's name
        users=users.map(i => { i["name"]=i.username+" ahmed"; return i})
        res.status(200).send(users)


})

export {}
module.exports = router;
