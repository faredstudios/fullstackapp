import React, {Component} from 'react';
import './styles/Leaderboard.css';


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
				<div className="leaderboard">
					<ul>
						<li className="titleRow">
							<span className="rowBalance">RANK</span>
							<span className="rowBalance">PLAYER</span>
							<span className="rowMiddle">MMR</span>
							<span className="rowMiddle">WINS</span>
						</li>
						<li className="userRow">
							<span className="rowBalance">1</span>
							<div className="userImage"></div>
							<span className="rowBalance">ExamplePlayer1</span>
							<span className="rowMiddle">1400</span>
							<span className="rowMiddle">10</span>
						</li>
						<li className="userRow">
							<span className="rowBalance">2</span>
							<div className="userImage"></div>
							<span className="rowBalance">ExamplePlayer2</span>
							<span className="rowMiddle">1350</span>
							<span className="rowMiddle">7</span>
						</li>
						<li className="userRow">
							<span className="rowBalance">3</span>
							<div className="userImage"></div>
							<span className="rowBalance">ExamplePlayer3</span>
							<span className="rowMiddle">1300</span>
							<span className="rowMiddle">6</span>
						</li>
						<li className="userRow">
							<span className="rowBalance">4</span>
							<div className="userImage"></div>
							<span className="rowBalance">ExamplePlayer4</span>
							<span className="rowMiddle">1250</span>
							<span className="rowMiddle">5</span>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}
export default Marketplace;