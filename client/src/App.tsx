import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React from "react"
import {useState, useEffect} from 'react';
import {connect} from "react-redux"
import $ from 'jquery'
import dotenv from "dotenv"
// import {GoogleAuth} from "google-auth-library"



// * components from src/components ---?
import Navbar from './components/elements/Navbar/Navbar'
import Dashboard from './components/elements/Dashboard/Dashboard'
import Credits from './components/elements/Credits/Credits'
import Settings from './components/elements/Settings/Settings'
import HomeTS from './components/webpage/home/homeTS'

import {GoogleLogin} from 'react-google-login'
const clientId = '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com'

const onSuccess = (res:any) => {
  console.log(`Login success: ${res.profileObj}`)
}

const onFailure = (res:any) => {
  console.log("hey guys guess we fucked up somehow")
}

function App() {

  if (typeof window === 'undefined') {
    // dotenv.config()
  } else {
    $('*').css('cursor', `url('/water_img/mouse_droplet.png'), auto`)
    $('*').on('mouseenter', (event:any) => {
      $(event.target).css('cursor', `normal`)
  })
}

  const renderApp = () => {
      return (
        <div className="main">

        
    <Router>
    <Routes>
    <Route path={'/'} element={ < HomeTS /> } />
    <Route path={'/settings'} element={ < Settings /> } />
    <Route path={'/dashboard'} element={ < Dashboard /> } />
    </Routes>
    </Router>  
      </div>
      )
  }

  return (
    <div className="App">
      <div className="navbar">
        {/* <h1> were up here for now </h1> */}
        <GoogleLogin  
        onSuccess={onSuccess}
        onFailure={onFailure}
        clientId={clientId}
        buttonText=""
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        >
        

        </GoogleLogin>
        <Navbar />
      </div>
        {renderApp()}
      <div className="credits">
        <Credits />
      </div>
    </div>
  );




}

export default App;
