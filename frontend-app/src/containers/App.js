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
import {Connection,PublicKey,Transaction,clusterApiUrl,SystemProgram,Keypair,LAMPORTS_PER_SOL,sendAndConfirmTransaction} from "@solana/web3.js";
import { Coingecko, programs } from '@metaplex/js';

type PhantomEvent = "disconnect" | "connect" | "accountChanged";
interface ConnectOpts {
  onlyIfTrusted: boolean;
}
interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}
const NETWORK = clusterApiUrl("devnet");
const isPhantomInstalled = window.solana && window.solana.isPhantom
const store = configureStore()


const App = () => {
	const connection = new Connection(NETWORK);
	const { metadata: { Metadata } } = programs;
	const [, setConnected] = useState(false);
	const [publicKey, setPublicKey] = useState({publicKey:null});

	const [walletAddress, setWalletAddress] = useState(null);
	const [username, setUsername] = useState(null);
	const [balance, setBalance] = useState(0);
	const [balanceUSD, setBalanceUSD] = useState(0);
	
	const navigate = useNavigate()

	

	const checkIfWalletIsConnected = async () => {
		try {
			const { solana } = window;
			const connection = new Connection(clusterApiUrl('devnet'),'confirmed',);

			if (solana) {
				if (solana.isPhantom) {
					console.log('Phantom wallet found!');
					const response = await solana.connect({ onlyIfTrusted: true });
					getAccountData(response);

					//const airdropSignature = await connection.requestAirdrop(response.publicKey,LAMPORTS_PER_SOL,);
					//await connection.confirmTransaction(airdropSignature);
					}
				} else {
					alert('Solana object not found! Get a Phantom Wallet');
				}
			} catch (error) {
				console.error(error);
			}
		};
	const getAccountData = async (response: PublicKey) => {
		
		const publickey = {walletID: response.publicKey.toString()}
		
		console.log('Connected with Public Key:',publickey.walletID);

		setPublicKey(response.publicKey);
		setWalletAddress(publickey.walletID);
		setConnected(true);
		apiCall("post", `/api/auth/signin`, publickey).then(({token, ...user}) => {
			setUsername(user.username);
			console.log("User found:",user.username);
		}).catch(err => {
			console.log("User not registered");
			navigate("/register");
		});

		//Find wallet balance and convert to USD
		const account = await connection.getAccountInfo(response.publicKey);
		setBalance(account.lamports);
		const CoinGecko = new Coingecko();
		const solrate = CoinGecko.getRate("sol","usd").then(({result, ...rate}) => {
			var Rate = Object.values(rate)[0].rate;
			setBalanceUSD(((account.lamports/LAMPORTS_PER_SOL)*Rate).toFixed(2));
			}).catch( err => console.log(err));
	}

	const connectWallet = async () => {
	
		const { solana } = window;
		if (solana) {
			const response = await solana.connect();
			getAccountData(response);
		}
	};
	const sendSol = async () => {
		let fromKeypair = Keypair.generate();
		let toKeypair = Keypair.generate();
		let transaction = new Transaction();

		transaction.add(
		  SystemProgram.transfer({
			fromPubkey: fromKeypair.publicKey,
			toPubkey: toKeypair.publicKey,
			lamports: LAMPORTS_PER_SOL
		  })
		);
		sendAndConfirmTransaction(
		  connection,
		  transaction,
		  [walletAddress]
		);
	}
	function logout(){
		setWalletAddress(null);
		setPublicKey(null);
		setConnected(false);
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
						<li className="settingsli" onClick={sendSol}><a href="#">Send SOL</a></li>
						<li className="settingsli" onClick={logout}><a href="#logout">Logout</a></li>
					</ul>
				</li>
			</ul>
			<div className="userCurrency">
				{balanceUSD} USD	<br/>
				{Number(balance/LAMPORTS_PER_SOL).toFixed(4)} SOL
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
		/*if (!provider) return;

		provider.on("accountChanged", (publicKey: PublicKey | null) => {
		  setPublicKey(publicKey);
		  if (publicKey) {
			console.log("[accountChanged] Switched account to " + publicKey?.toBase58());
		  } else {
			console.log("[accountChanged] Switched unknown account");
			provider
			  .connect()
			  .then(() => console.log("[accountChanged] Reconnected successfully"))
			  .catch((err) => {
				console.log("[accountChanged] Failed to re-connect: " + err.message);
			  });
		  }
		});*/

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
