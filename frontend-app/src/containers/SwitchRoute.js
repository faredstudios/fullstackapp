import React, {Component} from 'react';
import {Routes, Route, Redirect, useNavigate, Navigate} from 'react-router-dom';
import { connect } from "react-redux";
import AuthForm from "../components/AuthForm";
import Marketplace from '../components/Marketplace';
import Leaderboard from '../components/Leaderboard';
import Homepage from '../components/Homepage';
import Profile from '../components/Profile';
import { authUser } from "../store/actions/auth";


const SwitchRoute = props => {
    const { authUser, walletID, username, errors } = props;
	const navigate = useNavigate();


    return (
    <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={walletID ? <AuthForm navigate={navigate} onAuth={authUser} walletID={walletID} errors={errors}/> : <Navigate to="/"/>}/>
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/profile" element={<Profile username={username}/>}/>
    </Routes>
    );
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
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