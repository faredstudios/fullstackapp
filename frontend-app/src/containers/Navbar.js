import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import SwitchRoute from './SwitchRoute';

class Navbar extends Component{
	render(){
		return(
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
		)
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser
	};
}

export default connect(mapStateToProps, null)(Navbar);