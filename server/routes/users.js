const express = require('express');
const router = express.Router();

// @route GET api/user
// @desc Get all user
// @access publc
router.get('/', (req,res)=>{
	User.find()
		.then(user => res.json(user))

});


module.exports = router;

