const express = require('express');
const router = express.Router();
const Userr = require("../users/Model.ts");
const Group = require("./GroupModel.ts");
const GroupMember = require("./GroupMember.ts");
const Sequelize = require("sequelize")
const {or, and, gt, lt} = Sequelize.Op;
/* @route GET api/groups/getgroup
 * @desc Get all groups a member is from
 * @query: Id of the user
 */
router.get("/getgroup", async(req,res)=>{
        GroupMember.findAll({ where: {User:req.query.id}})
        .then(ret=>{  res.status(200).send(ret) })
        .catch(err => res.status(404).send(err))
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
                if(user.role_id==1){
                        let retme = await Group.create({Name:req.body.name, ContactInfo:req.body.info})
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
                console.log(err)
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
        if(user.role_id==1){
                let ret=await Group.destroy({where:{id:req.body.id}})
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
        if(user.role_id==1){
                var ret=undefined
                console.log(req.body)
                if( req.body.name != undefined  && req.body.name != null  && req.body.name != ""  && req.body.name != '' && req.body.info != undefined  && req.body.info != null  && req.body.info != "" && req.body.info != ''){
                        ret=await Group.update({Name:req.body.name, ContactInfo:req.body.info}, {where:{id:req.body.id}})
                }
                else if( req.body.name !== undefined  && req.body.name !== null  && req.body.name !== ""&& req.body.name !== ''  ){
                        ret=await Group.update({Name:req.body.name}, {where:{id:req.body.id}})
                }

                else if( req.body.info !== undefined  && req.body.info !== null  && req.body.info !== "" && req.body.info !== ''  ){
                        ret=await Group.update({ContactInfo:req.body.info}, {where:{id:req.body.id}})
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
        console.log(req.body)
        if(_tmp==undefined){
                res.status(404).send("Owner is not even exist")
                return;
        }
        let user = _tmp.dataValues
        if(user.role_id==1){
                var _tmp = await Userr.findOne({where:{id:req.body.member}})
                if(_tmp==undefined){
                        res.status(404).send("Member is not even exist")
                        return;
                }
                let addmember = _tmp.dataValues
                var _tmp = await Group.findOne({where:{id:req.body.group}})
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

                console.log(_tmp)
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
        if(user.role_id==1){
                var _tmp = await Userr.findOne({where:{id:req.body.member}})
                if(_tmp==undefined){
                        res.status(404).send("Member is not even exist")
                        return;
                }
                let addmember = _tmp.dataValues
                var _tmp = await Group.findOne({where:{id:req.body.group}})
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
module.exports = router;
