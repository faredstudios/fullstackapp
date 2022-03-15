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
				<div class="leaderboard">
					<ul>
						<li class="titleRow">
							<span class="rowBalance">RANK</span>
							<span class="rowBalance">PLAYER</span>
							<span class="rowMiddle">MMR</span>
							<span class="rowMiddle">WINS</span>
						</li>
						<li class="userRow">
							<span class="rowBalance">1</span>
							<div class="userImage"></div>
							<span class="rowBalance">ExamplePlayer1</span>
							<span class="rowMiddle">1400</span>
							<span class="rowMiddle">10</span>
						</li>
						<li class="userRow">
							<span class="rowBalance">2</span>
							<div class="userImage"></div>
							<span class="rowBalance">ExamplePlayer2</span>
							<span class="rowMiddle">1350</span>
							<span class="rowMiddle">7</span>
						</li>
						<li class="userRow">
							<span class="rowBalance">3</span>
							<div class="userImage"></div>
							<span class="rowBalance">ExamplePlayer3</span>
							<span class="rowMiddle">1300</span>
							<span class="rowMiddle">6</span>
						</li>
						<li class="userRow">
							<span class="rowBalance">4</span>
							<div class="userImage"></div>
							<span class="rowBalance">ExamplePlayer4</span>
							<span class="rowMiddle">1250</span>
							<span class="rowMiddle">5</span>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}
export default Marketplace;