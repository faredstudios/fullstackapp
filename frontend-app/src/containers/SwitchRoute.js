import React, {Component} from 'react';
import {Routes, Route, Redirect, useNavigate} from 'react-router-dom';
import { connect } from "react-redux";
import Market from '../components/Marketplace';
import Leaderboards from '../components/Leaderboard';
import Home from '../components/Homepage';
import Profiles from '../components/Profile';


const Homepage = () => (<Home/>);
const Marketplace = () => (<Market/>);
const Leaderboard = () => (<Leaderboards/>);
const Profile = () => (<Profiles/>);

const SwitchRoute = props => (
    <Routes>
        <Route path="/" render={props => <Homepage {...props} />} />
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
    </Routes>
);

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
	};
}
export const withRouter = (Component) => {
	const Wrapper = (props) => {
		const history = useNavigate();
		return <Component history={history} {...props} />;
	};
	return Wrapper;
};
export default withRouter(connect(mapStateToProps,null)(SwitchRoute));