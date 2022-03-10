const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = function(){}

exports.signup = function(req, res, next) {
	try {
		let user = await db.User.create(req.body);
		let { walletID, username, pictureID } = user
		let token = jwt.sign({
			walletID,
			username,
			pictureID
			},
			process.env.SECRET_KEY
		);
		return res.status(200).json({
			walletID,
			username,
			pictureID,
			token
		});
	} catch(err){
		if(err.code === 11000){
			err.message = "Sorry, that username and/or email is taken"
		}
		return.next({
			status: 400,
			message: err.message
		});
	}
};