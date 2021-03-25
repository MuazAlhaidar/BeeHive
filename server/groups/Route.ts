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
    console.clear()
    // TODO This doesn't get all people NOT in any group
    const _groups = await sequelize.query("select groups.id, groups.Name as name, groups.ContactInfo as contactInfo,  groupmembers.User, users.username, users.firstname, users.lastname from groups left join groupmembers on groupmembers.Group = groups.id left join users on groupmembers.User = users.id order by groups.id;")
    let users  = await Userr.findAll()
    users = users.map(x=>x.dataValues)
    

    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    var allmembers= []
    let  groups:any[]=Object.values((groupBy(_groups[0], 'id')))
    let ret_group =groups.map((x,index)=>{
        let members= x.reduce((acc,value)=>{
            if(value.User===null)
                return []
            var tmp= ({username:value.username, id:value.User, firstname:value.firstname, lastname:value.lastname})
            allmembers.push(tmp)
            acc.push(tmp)
            return acc
        },[])
        return {id:x[0].id, name:x[0].name, contactInfo:x[0].contactInfo, members:members}

    })
    allmembers = (Object.values(groupBy(allmembers, 'id')).map(x=>{
        return x[0]
    }))
    
    console.log(users)
    res.status(200).send({groups:ret_group, users:users}) 
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

/* @route POST api/groups/set_members
 * @desc Set the members in a list
 * @body id:id of the group, memberlist: [users.id]
 */



router.post("/set_members", async(req,res)=>{
    const id = req.body.id
    console.log(id, req.body.memberList)
    const memList = req.body.memberList.map(x=>{
        return {User:x.id, Group:id, Manager:false}
    })
    await GroupMember.destroy({where:{ Group: id}})

    await GroupMember.bulkCreate(memList);
    console.log("NICE")
    res.sendStatus(200)




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
