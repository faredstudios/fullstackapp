import React, {Component} from 'react';
import '../components/styles/Profile.css';


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
					Search Players:
					<input className="searchbar" type="text" placeholder="Username"></input>
					<div className="sort">
						<select className="sortSelect">
							<option value="lowestprice">Lowest Price</option>
							<option value="highestprice">Highest Price</option>
							<option value="latest">Latest</option>
							<option value="oldest">Oldest</option>
						</select>
					</div>
					<div className="searchbar">
					</div>

				</div>
				<div className="containerProfile">
					<div className="profileBanner">
						<div className="profilePicture"></div>
						<div className="username">{this.props.username ? this.props.username : "PlayerNotFound"}</div>
						<div>PlayerBio</div>
					</div>
					<div className="profileDetails">
						<div className="matchHistory">
							<ul>
								<li className="matchListTitle">
									<span className="rowBalance">Match History</span>
								</li>
								<li className="matchRow">
									<div className="userImage"></div>
									<span className="rowBalance">vs ExamplePlayer1</span>
									<span className="win">VICTORY</span>
								</li>
								<li className="matchRow">
									<div className="userImage"></div>
									<span className="rowBalance">vs ExamplePlayer2</span>
									<span className="lose">DEFEAT</span>
								</li>
								<li className="matchRow">
									<div className="userImage"></div>
									<span className="rowBalance">vs ExamplePlayer3</span>
									<span className="win">VICTORY</span>
								</li>
								<li className="matchRow">
									<div className="userImage"></div>
									<span className="rowBalance">vs ExamplePlayer4</span>
									<span className="lose">DEFEAT</span>
								</li>
							</ul>
						</div>
						<div className="inventory"></div>
					</div>
				</div>
			</div>
		)
	}
}
export default Profile;