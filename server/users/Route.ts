const express = require('express');
const router = express.Router();
const User = require("./Model.ts");
const Sequelize = require("sequelize")
const {or, and, gt, lt} = Sequelize.Op;
const Other = require("./Other.ts")

// @route POST api/users/new
// @desc Crete a new user
// @access publc
router.post("/new", (req,res)=>{

    // Checking if the fields are valid
    // let fields=["username", "password", "email", "points", "role_id"]
    let fields=["username", "password", "email"]

    for(let field in fields){
	if(req.body[fields[field]] === undefined){
	    res.status(402).send("Fields have been changed")
	    return;
	}
    }

    // Check if user/email is already in database

    User.findOrCreate({where:{
	[or]: [
	    {email: req.body.email}
	    ,{username: req.body.username}
	]
    }, defaults:{
	username: req.body.username
	,password:req.body.password
	,email:req.body.email
	,points:req.body.points
	,role_id:req.body.role_id
    }}).then(ret => {
	var indatabase=(ret[0]["_options"]["isNewRecord"])
	if(!indatabase){
	    res.status(401).send("User/email already in database")
	}
	else{
	    res.status(200).send({id:ret[0].dataValues.id})
	    return;
	    
	}
    })
	.catch(err => { console.log(err); res.status(403).send(err)})


});

// @route GET api/users/login
// @desc Check if credeitnals are in databse
router.post("/login", (req, res)=>{
    let user = req.body.username;
    let pass = req.body.password;
    User.findOne({
	where:{
	    username:  user,
	    password:  pass

	}
    }).then(found =>{
	if(found === null){
	    res.status(401).send("Incorrect username/password")
	    return;
	}
	else
	    res.status(200).send({id:found.dataValues.id})
    })
	.catch(err => {
	    res.status(404).send(err)
	})


});

// @route POST api/users/reset_request
// @desc Send an email to make a request to reset password
/* NOTE:
 * Obviosuly at this time (30-Dec-2020) we are unable to have email support.
 * As such, some things that wil be implemented here will change.
 * In partiuclar, reset_request shoudl only return the status code, not the url to reqest the password
 * NOTE 
 */
router.post("/reset_request", (req, res)=>{
    let _email = req.body.email;
    const token = Other.resetPassword_token(_email);
    const days_till_expiry = 3
    if(_email==undefined){
	res.sendStatus(401);
	return;
    }
    var result = new Date()
    User.update({ resetPassword_token:token,
		  resetPassword_expiry:(new Date(result.setDate(result.getDate()+ days_till_expiry))) 

		},
		{where:{
		    email:  _email,
		}
		})
	.then(ret => {
	    if(ret[0] === 0){
		res.sendStatus(403)
	    }
	    else{
		res.status(200).send(token)
	    }
	}
	     )
	.catch(ret => res.status(404).send(ret))
})
// @route POST api/users/reset_token
// @desc Once given a token, reset the password
router.post("/reset_token", (req, res)=>{
    let _token = req.body.token;
    let _newpass = req.body.password;
    User.update({
	password:_newpass,
	resetPassword_token:null,
	resetPassword_expiry:null
    }, {where:{
	    resetPassword_token: _token
	    // Used to make sure resetPasswords exprie. 
	    // Can't be unit tested, so just do a check in the database
	    // Maybe manually change this entry in the database?
	    ,resetPassword_expiry: {[gt]: new Date()} 
	
    }})
    .then(ret =>{

            if(ret[0] === 0){
                    res.sendStatus(404)
                    return;
            }
            else{
                    res.sendStatus(200)
                    return;
            }

    })
    .catch(err => {console.log(err); res.sendStatus(404)})

})


// @route POST api/users/url
// @desc Give user power to reset the password
router.post("/reset_url" , (req, res)=>{
        let _token = req.body.token;
        User.findOne({ where:{
                [and]:[
                        {resetPassword_token: _token}
                        ,{resetPassword_expiry: {[gt]: new Date()}} 
                ]
        }} )
        .then(ret => {
                if(ret===null){
                        res.sendStatus(404)
                        return;
                }
                else{
                        // console.log(ret.dataValues);
                        res.sendStatus(200)
                        return;
                }
        })
        .catch(err => {console.log("welp FUCK",err); res.sendStatus(404)})

})
export {}
module.exports = router;
