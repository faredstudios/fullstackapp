import React, {Component} from 'react';
import './styles/Profile.css';


class Profile extends Component {
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
				<div class="filterbar">
					<div class="arrow">></div>
					Filter Marketplace:
					<input class="searchbar" type="text" placeholder="Search"></input>
					<div class="sort">
						<select name="sortSelect">
							<option value="lowestprice">Lowest Price</option>
							<option value="highestprice">Highest Price</option>
							<option value="latest">Latest</option>
							<option value="oldest">Oldest</option>
						</select>
					</div>
					<div class="searchbar">
					</div>

				</div>
				<div class="container">
					<div class="profileBanner">
						<div>
						</div>
						<div class="storeTextContainer">
							<h3>ExamplePlayer1<span className="storeItemPrice">1200</span></h3>
							PlayerBio
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Profile;