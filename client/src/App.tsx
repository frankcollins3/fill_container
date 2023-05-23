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

import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {gapi} from 'gapi-script'
const clientId = '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com'

function App() {

  useEffect( () => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);  
  }, [])



  const onSuccess = (res:any) => {
  // console.log(`Login success: ${res.profileObj}`)
  console.log("success")
  console.log('res')
  console.log(res)
}

const onFailure = (res:any) => {
  // console.log("that didnt work")
  console.log("hey failure")
}

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
        buttonText="text"
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
        <GoogleLogout clientId={clientId}/>
        


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
