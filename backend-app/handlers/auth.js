const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
	try{
		let user = await db.User.findOne({
			walletID: req.body.walletID
			});
		let {walletID, username, pictureID} = user
		if(username !=null){
			let token = jwt.sign({
				walletID,
				username,
				pictureID
				}, process.env.SECRET_KEY
			);
			return res.status(200).json({
				walletID,
				username,
				pictureID,
				token
			});
		} else {
			return next({
				status:400,
				message: "User not registered"
			});
		}
	} catch(e){
		return next({ status: 400, message: "Invalid walletID"});
	}
}

exports.signup = async function(req, res, next) {
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
		return next({
			status: 400,
			message: err.message
		});
	}
};