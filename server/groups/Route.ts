const express = require('express');
const router = express.Router();
const Userr = require("../users/Model.ts");
const Groupp = require("./GroupModel.ts");
const GroupMember = require("./GroupMember.ts");
const Sequelize = require("sequelize")
const lib = require("../lib.ts");
const {or, and, gt, lt} = Sequelize.Op;
/* @route GET api/groups/getgroup
 * @desc Get all groups a member is from
 * @query: Id of the user
 */

const _config = require("../config/keys.ts")
const sequelize = new Sequelize(_config.database, _config.user, _config.pass, {
    dialect: 'mariadb',
    logging: false
})

async function verify_owner(_id:number){
        var _tmp = await Userr.findOne({where:{id:_id}})
        if(_tmp==undefined){
            return false;
        }
        if(_tmp.role_id==0)
                return false
        return true;


}
router.get("/getgroup", async(req,res)=>{
    GroupMember.findAll({ where: {User:req.query.id}})
        .then(async ret=> { 
            let _groups = await Promise.all(ret.map(async i => {
                let _id=i.dataValues.Group
                let meme= await Groupp.findOne({where:{id:_id}}) 
                return (meme.dataValues)
            }))

            let id = req.query.id
            let _groupmembers = await sequelize.query(`select users.username, users.id as userid, groups.id as groupid from groupmembers inner join users on users.id=groupmembers.User and not users.id=${id}  inner join groups on groupmembers.Group=groups.id;`)


            res.status(200).send({groups:_groups, groupmembers:_groupmembers[0]}) 
            // res.status(200).send({groups:_groups}) 
        })
        .catch(err => {console.log(err); res.status(404).send(err)} )
})

/* @route POST api/groups/new
 * @desc Make a new group
 * @body: {id:"user making the group", name:"Name of group", info:"Contact Info"}
 */
router.post("/new", async(req,res)=>{
    try{
        var _tmp = await Userr.findOne({where:{id:req.body.id}})
        if(_tmp==undefined){
            res.status(404).send("Owner is not even exist")
            return;
        }
        let user = _tmp.dataValues
        if( req.body.name === undefined  || req.body.name === null  || req.body.name === ""  || req.body.info === undefined  || req.body.info === null  || req.body.info === "" ){
            res.status(404).send("Name or info is not defiend")
            return
        }
        //if(user.role_id==1){ 
 if(true){
            let retme = await Groupp.create({Name:req.body.name, ContactInfo:req.body.info})
            await GroupMember.create({User:req.body.id, Group:retme.id, Manager:true})
            res.status(200).send(retme)
            return;
        }
        else{
            res.status(404).send("User is not an owner")
            return
        }
        /*
         */
        res.sendStatus(404)
    }
    catch(err){
        res.status(404).send("Other Error has happen")
    }
})

/* @route POST api/groups/remove
 * @desc Remove a group (notify users)
 * body: {id:id of the group, userid: id of the user deleting this group}
 */
router.post("/remove", async(req,res)=>{
    var _tmp = await Userr.findOne({where:{id:req.body.userid}})
    let user = _tmp.dataValues
    //if(user.role_id==1){ 
 if(true){

        let _tmp = await GroupMember.destroy({where:{Group:req.body.id}})
        console.log(_tmp)
        
        let ret=await Groupp.destroy({where:{id:req.body.id}})
        if(ret==1)
            res.send("Deleted Group").status(200)
        else
            res.status(404).send("Group does not exist")
        return;

    }
    else{
        res.status(404).send("User is not grup")
        return
    }
    return
})

/* @route POST api/groups/update
 * @desc Update a group's name and contact info
 * @body {id:id of the group, userid: id of the user, name: name of the group, info:updated info of the group}
 */
router.post("/update", async(req,res)=>{
    var _tmp = await Userr.findOne({where:{id:req.body.userid}})
    let user = _tmp.dataValues
    //if(user.role_id==1){ 
 if(true){
        var ret=undefined
        if( req.body.name != undefined  && req.body.name != null  && req.body.name != ""  && req.body.name != '' && req.body.info != undefined  && req.body.info != null  && req.body.info != "" && req.body.info != ''){
            ret=await Groupp.update({Name:req.body.name, ContactInfo:req.body.info}, {where:{id:req.body.id}})
        }
        else if( req.body.name !== undefined  && req.body.name !== null  && req.body.name !== ""&& req.body.name !== ''  ){
            ret=await Groupp.update({Name:req.body.name}, {where:{id:req.body.id}})
        }

        else if( req.body.info !== undefined  && req.body.info !== null  && req.body.info !== "" && req.body.info !== ''  ){
            ret=await Groupp.update({ContactInfo:req.body.info}, {where:{id:req.body.id}})
        }
        else{
            res.status(404).send("Info and name isn't defined")
            return
        }
        if(ret[0] == 0){
            res.status(404).send("Group wasnt' found")
            return
        }
        else{
            res.status(200).send(ret)
        }

        return;

    }
    else{
        res.status(404).send("User is not owner");
        return
    }

})
/* @route POST api/groups/addmembers
 * @desc Add people to a group
 * @body {id:id of the group, userid: id of the user, member:id of the user to add, group:id of the group to add to}
 */
router.post("/addmembers", async(req,res)=>{
    var _tmp = await Userr.findOne({where:{id:req.body.userid}})
    if(_tmp==undefined){
        res.status(404).send("Owner is not even exist")
        return;
    }
    let user = _tmp.dataValues
    //if(user.role_id==1){ 
 if(true){
        var _tmp = await Userr.findOne({where:{id:req.body.member}})
        if(_tmp==undefined){
            res.status(404).send("Member is not even exist")
            return;
        }
        let addmember = _tmp.dataValues
        var _tmp = await Groupp.findOne({where:{id:req.body.group}})
        if(_tmp==undefined){
            res.status(404).send("Group does not exist")
            return;
        }
        let group = _tmp.dataValues
        // var _tmp= await GroupMember.findOrCreate({{where:{User:req.body.member, Group:req.body.group}}, defaults:{
        //         User:req.body.member, Group:req.body.group
        // }})
        var _tmp = await GroupMember.findOrCreate({where:{
            User: req.body.member
            ,Group: req.body.group
        }, defaults:{
            User: req.body.member
            ,Group:req.body.group}})

        res.send(_tmp).status(200)
        return

    }
    else{
        res.status(404).send("Owner is not owner")
        return
    }
    res.status(404).send("Some other error happen")
    return


})

/* @route POST api/groups/rmmembers
 * @desc Remove people to a group
 * @body {id:id of the group, userid: id of the user, member:id of the user to add, group:id of the group to add to}
 */

router.post("/rmmembers", async(req,res)=>{
    var _tmp = await Userr.findOne({where:{id:req.body.userid}})
    if(_tmp==undefined){
        res.status(404).send("Owner is not even exist")
        return;
    }
    let user = _tmp.dataValues
    //if(user.role_id==1){ 
 if(true){
        var _tmp = await Userr.findOne({where:{id:req.body.member}})
        if(_tmp==undefined){
            res.status(404).send("Member is not even exist")
            return;
        }
        let addmember = _tmp.dataValues
        var _tmp = await Groupp.findOne({where:{id:req.body.group}})
        if(_tmp==undefined){
            res.status(404).send("Group does not exist")
            return;
        }
        let group = _tmp.dataValues
        var _tmp = await GroupMember.destroy({where:{User:req.body.member, Group:req.body.group}})
        if(_tmp == 0){
            res.status(404).send("Member isn't even in group")
            return
        }
        else{
            res.send("Successfully delted member").status(200)
            return
        }
        return

    }
    else{
        res.status(404).send("Owner is not owner")
        return
    }
    res.status(404).send("Some other error happen")
    return

})
/* @route POST api/groups/email
 * @desc Email everyone in a gorup
 * @body {id:id of group, userid: id of the user,body:body of email, subject:subject of email}
*/
router.post("/email", async(req, res)=>{
        // if(verify_owner(req.body.userid)){
                const query=`SELECT email FROM users JOIN groupmembers ON  groupmembers.Group =${req.body.id}` 
                var _groupmembers = await sequelize.query(`SELECT email FROM users JOIN groupmembers ON  groupmembers.Group =${req.body.id} ; `)
                var _groupmembers = _groupmembers[0].map(i=> i.email)
                let ret = await lib.email(_groupmembers, req.body.subject, req.body.body)
                console.log(ret)
                res.sendStatus(200)

        // }
        // else{
        //         res.sendStatus(404);
        // }

})
module.exports = router;
