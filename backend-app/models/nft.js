const mongoose = require("mongoose");

const nftItemSchema = new mongoose.Schema({
	nftItemID: {
		type: Number,
		unique: true
	}
	sellingPrice{
		type: Number
	}
});

const nftSchema = new mongoose.Schema({
	nftID: {
		type: Number,
		unique: true
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true,
		unique: true
	},
	floorPrice:{
		type:Number
	}
	nftItems: [nftItemSchema],
	nftItemsSale:[{type:Number}],
	pictureID: {
		type: Number,
	}
});

const NFTitem = mongoose.model("nftItem", nftItemSchema);
const NFT = mongoose.model("nft", nftSchema);

module.exports = {
	NFTitem:NFTitem,
	NFT:NFT
};