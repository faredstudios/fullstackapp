import React, {Component} from 'react';
import {Routes, Route} from 'react-router-dom';
import Market from './Components/Marketplace';
import Leaderboards from './Components/Leaderboard';
import Home from './Components/Homepage';
import Profiles from './Components/Profile';


const Homepage = () => (<Home/>);
const Marketplace = () => (<Market/>);
const Leaderboard = () => (<Leaderboards/>);
const Profile = () => (<Profiles/>);

const SwitchRoute = () => (
    <Routes>
        <Route path="/" component={<Homepage/>}/>
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
    </Routes>
);
export default SwitchRoute;