const express = require('express');
const router = express.Router();
const Project = require("../model/Test.ts");
// @route GET api/user
// @desc Get all user
// @access publc
router.get('/', (req,res)=>{
	console.log("Cover in glitter")
	res.json({"x":"y"})

});

router.post("/new", (req,res)=>{
	const newProject = Project.build({
		title: "Joesph joestar",
		description: "Hermit a purple"
	});
	newProject.save().then(pos => console.log("Wowee")).catch(err => console.log(err));


});


export {}
module.exports = router;
