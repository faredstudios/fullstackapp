import React, {Component} from 'react';
import {Routes, Route} from 'react-router-dom';
import Market from './Components/Marketplace';
import Leaderboards from './Components/Leaderboard';
import Home from './Components/Homepage';


const Homepage = () => (<Home/>);
const Marketplace = () => (<Market/>);
const Leaderboard = () => (<Leaderboards/>);

const SwitchRoute = () => (
    <Routes>
        <Route path="/" component={<Homepage/>}/>
        <Route path="/marketplace" element={<Marketplace/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
    </Routes>
);
export default SwitchRoute;