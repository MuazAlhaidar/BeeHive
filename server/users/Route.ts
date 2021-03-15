const express = require('express');
const router = express.Router();
const User = require("./Model.ts");
const Sequelize = require("sequelize")
const {or, and, gt, lt} = Sequelize.Op;
const Other = require("./Other.ts")
const nodemailer = require("nodemailer")
const _config = require("../config/keys.ts")
const sequelize = new Sequelize(_config.database, _config.user, _config.pass, {
    dialect: 'mariadb',
    logging: false
})

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
                console.log("1")
	    res.status(401).send("Incorrect username/password")
	    return;
	}
	else{
                console.log(found.dataValues.id)
	    res.status(200).send({id:found.dataValues.id, owner:found.dataValues.role_id})
        }
    })
	.catch(err => {
                console.log("3")
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
    let test= req.body.test
    if(req.body.test === undefined){
            test=false;
    }

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
                    const re=/\S+@\S+\.\S+/
                    if(! re.test(_email)){
                            console.log("WRONG EMAIL FORMAT" + _email)
                            res.status(404).send("Wrong email format")
                            return;
                    }
                        

                    try{
                            if(test===true){
                                    // https://www.w3schools.com/nodejs/nodejs_email.asp
                                    // Once we have an email server/other shit, we will use this
                                    var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                    user: '12xx.supersussupersus.xx21@gmail.com',
                                                    pass: '~j5Gfs!:~qOL&Wla6rf>V[$_?'
                                            }
                                    });
                                    var mailOptions = {
                                            from: '12xx.supersussupersus.xx21@gmail.com',
                                            to:_email,
                                            subject:"Beehvie password reset",
                                            text: 'Hello user, you have made a request to reset your password. In '+new Date(result.setDate(result.getDate()+ days_till_expiry))+" this password reset request will be invalid. \n if you did indeed made the request, go to http://localhost:3000/resetpassword?token="+token
                                    };

                                    transporter.sendMail(mailOptions, function(error, info){
                                            if (error) {
                                                    console.log(error);
                                            } else {
                                                    console.log('Email sent: ' + info.response);
                                            }
                                    }); 
                                    console.log("JOJO")
                            }
                            res.status(200).send(token)
                    }
                    catch(e){
                            console.log("dio")
                            res.status(404).send(e)
                    }
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
                        console.log("NOT FOUND", _token)

                        res.sendStatus(404)
                        return;
                }
                else{
                        res.sendStatus(200)
                        return;
                }
        })
        .catch(err => {console.log("welp FUCK",err); res.sendStatus(404)})

})

// @route POST api/users/points
// @desc Change user's points
// @body {id:id of the user, points:new points ot set the user to}
router.post("/points", async (req,res)=>{
    let test = await User.update({points:req.body.points}, {where:{id:req.body.id}})
    console.log(test)
    res.sendStatus(200);
})


export {}
module.exports = router;
