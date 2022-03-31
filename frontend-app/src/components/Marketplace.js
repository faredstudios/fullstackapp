import React, {Component} from 'react';
import './styles/Marketplace.css';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip, Legend);

class Marketplace extends Component {
	constructor(props){
		super(props);
		this.state = {
		showPage: false,
		modalTab:0,
		item: []
		}
	}

	componentDidlMount(){
		fetch('/api/item')
		.then(data => data.json())
		.then(lot => this.setState({lot}));
	}
	
	render(){
		const showModal = () => this.setState({showPage:true});
		const hideModal = () => this.setState({showPage:false});
		const tabInfo = () => this.setState({modalTab:0});
		const tabTrade = () => this.setState({modalTab:1});
		const tabBid = () => this.setState({modalTab:-1});
		const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
		const options = {
		  responsive: true,
		  plugins: {
			legend: {
			  position: 'top'
			},
			title: {
			  display: true,
			  text: 'Price History in USD',
			},
		  },
		};
		const data = {
			labels,
			datasets: [
			{
				label: 'Avg',
				data: [4, 3.2, 3.5, 4.5, 5.3, 6.2, 5.5],
				borderColor: 'rgba(255, 199, 232, 0.5)',
				backgroundColor: 'rgba(255, 199, 232, 0.1)',
			},
			{
				label: 'All Avg',
				data:[4, 3.7, 3.9, 4.2, 4.7, 5.3, 5.1],
				borderColor: 'rgba(153, 212, 235, 0.5)',
				backgroundColor: 'rgba(153, 212, 235, 0.2)',
			},
			],
		};
		const nftPage = () => (
			<React.Fragment>
				<div className="modalbg" onClick={() => { hideModal(); tabInfo();}}>
				</div>
				<div className="modalFighter">
					<div className="modalSideNav">
						<div className={this.state.modalTab<=0 ? "modalTab modalTabSelected" : "modalTab"} onClick={tabInfo}>INFO</div>
						<div className={this.state.modalTab==1 ? "modalTab modalTabSelected" : "modalTab"} onClick={tabTrade}>TRADE</div>
					</div>
					{this.state.modalTab<=0 &&  <React.Fragment>
					<div className="charlieFull">
						<div className="nftMoves">
							<div className="nftMovesTitle">Moves List</div>
							<ul>
								<li className="nftMove">Right Punch</li>
								<li className="nftMove">High Kick</li>
								<li className="nftMove">Rocket Arm Launch</li>
								<li className="nftMove">Charge Shield</li>
							</ul>
						</div>
					</div>
					<div className="nftDetails">
						<label className="nftName">CHARLIE</label>
						<div className="nftDescription">
							Created for the Omeda City military, Charlie was sent to the junkyard when newer biotech androids took his place. 
							After months in rest mode, Charlie followed the sounds of battle to an underground fighting ring, started punching, and became an immediate hit with the crowd.
						</div>
						<div className="nftDescription">
							<div className="flexItem">Total Supply: 500</div>
							<div className="flexItem">Available Market Supply: 500/500</div>
						</div>
						<Line options={options} data={data} />
						<button className="connectbtn nftButton right" onClick={tabTrade}>BUY</button>
						<button className="connectbtn nftButton right" onClick={tabBid}>PLACE BID</button>
						{this.state.modalTab==-1 &&  
						<div className="nftBid">
							Enter Starting Bid amount for this NFT:<br/>
							<label htmlFor="bid">Bid:</label>
							<input id="bid"
									className="nftInput"
									placeholder="0.01"
									name="bid"
									type="number" min="0.01" step="0.01"
								/><select name="currencySelect">
									<option value="USD">USD</option>
									<option value="SOL">SOL</option>
								</select>
							<div className="sort">
								<label htmlFor="sortSelect">Selected NFT #:</label>
								<select name="sortSelect" className="nftInput">
									<option value="lowestprice">Bid for All NFTs</option>
									<option value="highestprice">#001</option>
									<option value="latest">#002</option>
									<option value="oldest">#003</option>
								</select>
								<button className="connectbtn nftButton" onClick={tabInfo}>BID</button>
							</div>
						</div>
						}
					</div>
					</React.Fragment>}
					{this.state.modalTab==1 &&  <React.Fragment>
						<div className="nftTrade">
						<table>
						<thead>
							<tr>
								<th>Preview</th>
								<th>ID</th>
								<th>No# of 500</th>
								<th>Price in SOL</th>
								<th>Price in USD</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
						<tr>
							<td className="charlie"></td>
							<td>1001</td>
							<td>1</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1002</td>
							<td>2</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1003</td>
							<td>3</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1004</td>
							<td>4</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1001</td>
							<td>1</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1001</td>
							<td>1</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1001</td>
							<td>1</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1001</td>
							<td>1</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1001</td>
							<td>1</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1001</td>
							<td>1</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1001</td>
							<td>1</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1001</td>
							<td>1</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						<tr>
							<td className="charlie"></td>
							<td>1001</td>
							<td>1</td>
							<td>0.05 SOL</td>
							<td>$5.10</td>
							<td><button className="connectbtn">Buy Now</button></td>
						</tr>
						</tbody>
						</table>
						</div>
					</React.Fragment>}
				</div>
			</React.Fragment>
		 );
		return(
			<React.Fragment>
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
					<div className="storeItem" onClick={showModal}>
						<div className="storeImage alpha">
						</div>
						<div className="storeTextContainer">
							<h3>ALPHA<span className="storeItemPrice">0.05 SOL</span></h3>
							Example NFT Game Character that can be bought for auction sold by users.
						</div>
					</div>
					<div className="storeItem" onClick={showModal}>
						<div className="storeImage bravo">
						</div>
						<div className="storeTextContainer">
							<h3>BRAVO<span className="storeItemPrice">0.05 SOL</span></h3>
							Example NFT Game Character that can be bought for auction sold by users.
						</div>
					</div>
					<div className="storeItem" onClick={showModal}>
						<div className="storeImage charlie">
						</div>
						<div className="storeTextContainer">
							<h3>CHARLIE<span className="storeItemPrice">0.05 SOL</span></h3>
							Example NFT Game Character that can be bought for auction sold by users.
						</div>
					</div>
					<div className="storeItem" onClick={showModal}>
						<div className="storeImage delta">
						</div>
						<div className="storeTextContainer">
							<h3>DELTA<span className="storeItemPrice">0.05 SOL</span></h3>
							Example NFT Game Character that can be bought for auction sold by users.
						</div>
					</div>
				</div>
				{this.state.showPage && nftPage()}
			</React.Fragment>
		)
	}
}
export default Marketplace;