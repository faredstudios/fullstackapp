import React, { Component } from 'react';

export default class AuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			walletID: props.walletID,
			email: "",
			username: "",
			password: ""
		};
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const authType = "signup";
		this.props.onAuth(authType, this.state).then(() => {
			console.log("SIGNED UP SUCCESFULLY");
		});
	};
	render() {
		const { walletID, email, username, password } = this.state
		return (
			<div className="modalbg">
				<div className="modal">
					<div className="cornerContainer">
						<form onSubmit={this.handleSubmit}>
							<label>Register your Account</label>
							<div>
							<label htmlFor="walletID">Wallet ID:</label>
							<input	className="input"
									id="walletID"
									name="walletID"
									onChange={this.handleChange}
									value={this.state.walletID}
									type="text"
									readonly="readonly"
								/>
							</div>
							<div>
								<label htmlFor="email">Email:</label>
								<input	className="input"
									id="email"
									name="email"
									onChange={this.handleChange}
									value={email}
									type="text"
								/>
							</div>
							<div>
							<label htmlFor="username">Account Name:</label>
							<input	className="input"
								id="username"
								name="username"
								onChange={this.handleChange}
								value={username}
								type="text"
							/>
							</div>
							<div>
							<label htmlFor="password">Password:</label>
							<input	className="input"
								id="password"
								name="password"
								onChange={this.handleChange}
								value={password}
								type="password"
							/>
							</div>
							<button className="connectbtn" type="submit">Register Account</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}