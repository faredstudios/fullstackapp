import React, {Component, useEffect, useState} from 'react';
import './Components/styles/App.css';
import {NavLink} from 'react-router-dom';
import SwitchRoute from './SwitchRoute';
import background from './Components/images/daytoner2.jpg';

const isPhantomInstalled = window.solana && window.solana.isPhantom

const App = () => {
	const [walletAddress, setWalletAddress] = useState(null);
	const checkIfWalletIsConnected = async () => {
		try {
			const { solana } = window;

			if (solana) {
				if (solana.isPhantom) {
					console.log('Phantom wallet found!');
					const response = await solana.connect({ onlyIfTrusted: true });
					console.log('Connected with Public Key:',response.publicKey.toString());
        
					setWalletAddress(response.publicKey.toString());
					}
				} else {
					alert('Solana object not found! Get a Phantom Wallet');
				}
			} catch (error) {
				console.error(error);
			}
		};

	const connectWallet = async () => {
		const { solana } = window;

		if (solana) {
			const response = await solana.connect();
			console.log('Connected with Public Key:', response.publicKey.toString());
			setWalletAddress(response.publicKey.toString());
		}
	};
	function logout(){
		setWalletAddress(null);
		window.solana.request({ method: "disconnect" });
		window.solana.on('disconnect', () => console.log("disconnected!"));
	}
	const renderNotConnectedContainer = () => (
		<div>
			<button class="connectbtn animated" onClick={connectWallet}>CONNECT</button>
			<div>Connect to Phantom Wallet to log in your account.</div>
		</div>
	 );
	 const renderConnectedUser = () => (
	     <div>
			<ul>
				<li>
					<a href="#" className="userName"><div className="userDP"></div> Username01</a>
					<ul className="dropdown">
						<li className="settingsli"><a href="#">Change Username</a></li>
						<li className="settingsli"><a href="#">Account Settings</a></li>
						<li className="settingsli" onClick={logout}><a href="#logout">Logout</a></li>
					</ul>
				</li>
			</ul>
			<div className="userCurrency">
				0.00 SOL
			</div>
			<div className="userSocial">
				Socials
			</div>
				<ul className="friendlist">
					<li className="friendName">
						<div className="friendDP"></div> ExampleFriend01
					</li>
					<li className="friendName">
						<div className="friendDP"></div> ExampleFriend02
					</li>
					<li className="friendName">
						<div className="friendDP"></div> ExampleFriend03
					</li>
					<li className="friendName">
						<div className="friendDP"></div> ExampleFriend04
					</li>
				</ul>
		 </div>
	 );

	useEffect(() => {
		const onLoad = async () => {
			  await checkIfWalletIsConnected();
		};
		window.addEventListener('load', onLoad);
		return () => window.removeEventListener('load', onLoad);
	}, []);
		return (
			<div className="background" style={{ backgroundImage: `url(${background})` }}>
				<div className="fadetop">
					<div className = "App">
						<NavLink className={(navData) => navData.isActive ? "nav-link-active nav-link" : "nav-link"} to="/">
						HOME
						</NavLink>
						<NavLink className={(navData) => navData.isActive ? "nav-link-active nav-link" : "nav-link"} to="/marketplace">
						MARKETPLACE
						</NavLink>
						<NavLink className={(navData) => navData.isActive ? "nav-link-active nav-link" : "nav-link"} to="/leaderboard">
						LEADERBOARD
						</NavLink>
						<NavLink className={(navData) => navData.isActive ? "nav-link-active nav-link" : "nav-link"} to="/about">
						ABOUT
						</NavLink>
						<NavLink className={(navData) => navData.isActive ? "nav-link-active nav-link" : "nav-link"} to="/profile">
						PROFILE
						</NavLink>
							<SwitchRoute/>
					</div>
				</div>
				<div className="sideBar">
					{!walletAddress && renderNotConnectedContainer()}
					{walletAddress && renderConnectedUser()}
				</div>
				<div className="modalbg">
					<div className="modal"></div>
				</div>
			</div>
		);
}

export default App;
