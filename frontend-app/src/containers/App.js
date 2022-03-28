import React, {Component, useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import '../components/styles/App.css';
import { Provider } from "react-redux";
import { configureStore } from '../store';
import SwitchRoute from './SwitchRoute';
import background from '../components/images/daytoner2.jpg';
import Navbar from './Navbar';
import { authUser } from "../store/actions/auth";
import { apiCall } from "../services/api";

const isPhantomInstalled = window.solana && window.solana.isPhantom
const store = configureStore()

const App = () => {
	const [walletAddress, setWalletAddress] = useState(null);
	const [username, setUsername] = useState(null);

	const navigate = useNavigate()

	const checkIfWalletIsConnected = async () => {
		try {
			const { solana } = window;

			if (solana) {
				if (solana.isPhantom) {
					console.log('Phantom wallet found!');
					const response = await solana.connect({ onlyIfTrusted: true });
					const userData = {walletID: response.publicKey.toString()}
					console.log('Connected with Public Key:',userData.walletID);
					setWalletAddress(userData.walletID);
					apiCall("post", `/api/auth/signin`, userData).then(({token, ...user}) => {
						setUsername(user.username);
						console.log("User found:",username);
					}).catch(err => {
						console.log("User not registered");
						navigate("/register");
					});
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
			const userData = {walletID: response.publicKey.toString()}
			console.log('Connected with Public Key:', userData.walletID);
			setWalletAddress(userData.walletID);
			apiCall("post", `/api/auth/signin`, userData).then(({token, ...user}) => {
				setUsername(user.username);
				console.log("User found:",username);
			}).catch(err => {
				console.log("User not registered");
				navigate("/register");
			});
		}
	};
	function logout(){
		setWalletAddress(null);
		window.solana.request({ method: "disconnect" });
		window.solana.on('disconnect', () => console.log("disconnected!"));
	}
	const renderNotConnectedContainer = () => (
		<div>
			<button class="connectbtn fullwidth" onClick={connectWallet}>CONNECT</button>
			<div>Connect to Phantom Wallet to log in your account.</div>
		</div>
	 );
	 const renderConnectedUser = () => (
	     <div>
			<ul>
				<li>
					<a href="#" className="userName"><div className="userDP"></div>{username}</a>
					<ul className="dropdown">
						{!username && <li className="settingsli" onClick={connectWallet}><a href="#">Register Account</a></li>}
						<li className="settingsli" onClick={connectWallet}><a href="#">Change Username</a></li>
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
		<Provider store={store}>
			<div className="background">
				<div className="fadetop">
					<div className = "App">
						<Navbar/>
						<SwitchRoute walletID={walletAddress} username={username}/>
					</div>
				</div>
				<div className="sideBar">
					{walletAddress && renderConnectedUser()}
					{!walletAddress && renderNotConnectedContainer()}
				</div>
			</div>
		</Provider>
		);
}

export default App;
