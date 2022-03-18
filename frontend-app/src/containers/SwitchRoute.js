import React, {Component} from 'react';
import {Routes, Route, Redirect, useNavigate} from 'react-router-dom';
import { connect } from "react-redux";
import AuthForm from "../components/AuthForm";
import Marketplace from '../components/Marketplace';
import Leaderboard from '../components/Leaderboard';
import Homepage from '../components/Homepage';
import Profile from '../components/Profile';
import { authUser } from "../store/actions/auth";


const SwitchRoute = props => {
    const { authUser,walletID } = props;
    console.log(props.currentUser);
    return (
    <Routes>
        <Route path="/" render={props => <Homepage {...props} />} />
        <Route path="/register" element={<AuthForm onAuth={authUser} walletID={walletID}/>}/>
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
    </Routes>
    );
}

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
export default withRouter(connect(mapStateToProps,{ authUser })(SwitchRoute));