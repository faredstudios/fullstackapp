import React, {Component} from 'react';
import './styles/Marketplace.css';


class Marketplace extends Component {
	constructor(props){
		super(props);
		this.state = {
		item: []
		}
	}

	componentDidlMount(){
		fetch('/api/item')
		.then(data => data.json())
		.then(lot => this.setState({lot}));
	}

	render(){
		return(
			<div>
				<div className="filterbar">
					<div className="arrow">></div>
					Filter Marketplace:
					<input className="searchbar" type="text" placeholder="Search"></input>
					<div className="sort">
						<select name="sortSelect">
							<option value="lowestprice">Lowest Price</option>
							<option value="highestprice">Highest Price</option>
							<option value="latest">Latest</option>
							<option value="oldest">Oldest</option>
						</select>
					</div>
					<div className="searchbar">
					</div>

				</div>
				<div className="container">
					<div className="storeItem">
						<div className="storeImage">
						</div>
						<div className="storeTextContainer">
							<h3>NFT ITEM 1<span className="storeItemPrice">0.05 SOL</span></h3>
							Example NFT Game Character that can be bought for auction sold by users.
						</div>
					</div>
					<div className="storeItem">
						<div className="storeImage">
						</div>
						<div className="storeTextContainer">
							<h3>NFT ITEM 2<span className="storeItemPrice">0.05 SOL</span></h3>
							Example NFT Game Character that can be bought for auction sold by users.
						</div>
					</div>
					<div className="storeItem">
						<div className="storeImage">
						</div>
						<div className="storeTextContainer">
							<h3>NFT ITEM 3<span className="storeItemPrice">0.05 SOL</span></h3>
							Example NFT Game Character that can be bought for auction sold by users.
						</div>
					</div>
					<div className="storeItem">
						<div className="storeImage">
						</div>
						<div className="storeTextContainer">
							<h3>NFT ITEM 4<span className="storeItemPrice">0.05 SOL</span></h3>
							Example NFT Game Character that can be bought for auction sold by users.
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Marketplace;