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
					<div className="profileBanner">
						<div>
						</div>
						<div className="storeTextContainer">
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