import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React from "react"
import {useState, useEffect, useContext, createContext } from 'react';
import {connect} from "react-redux"
import $ from 'jquery'
import dotenv from "dotenv"

// * components from src/components ---?
import Navbar from './components/elements/Navbar/Navbar'
import Dashboard from './components/elements/Dashboard/Dashboard'
import Credits from './components/elements/Credits/Credits'
import Settings from './components/elements/Settings/Settings'
import HomeTS from './components/webpage/home/homeTS'

// <GoogleLogin> and googleAPI components and variables.
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {gapi} from 'gapi-script'
const clientId = '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com'

function App() {

  // const [googler, setGoogler] = useState(null)
  
  const heyguys = {
    hey: 'hi',
    guys: 'guys'
  }

  
  const [googleUser, setGoogleUser] = useState<any>({})
  const GoogleUserContext = createContext<any>({})
  // const [googleUser, setGoogleUser] = useState<object>({})
  // const GoogleUserContext = createContext<object>({})

  // useEffect to invoke the googleapi. without this the <GoogleLogin> button fails with a 400 error.
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
  console.log(res.profileObj)
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

const test =  () => {
  // this promise resolves as the SetState() for [googleUser, setGoogleUser] It is to set the <GoogleUserProvider> that wraps the {App}
  let testPromise = new Promise( (resolve, reject) => {
    let promises = [
      setGoogleUser(heyguys),
      console.log(setGoogleUser)
    ]
    
    resolve(promises[0])

    reject("hey whats the big idea here")
    // resolve(setGoogler(heyguys))
    
  });
  testPromise
  .then( (iwill) => {    
    let collins:string = googleUser.familyName 
    console.log('collins')
    console.log(collins)
  })
  .catch( (icant) => {
    console.log('icant')
    console.log(icant)
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
    <GoogleUserContext.Provider value={googleUser} >

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
        <button onClick={test}></button>
        {/* <GoogleLogout clientId={clientId}/> */}
        


        <Navbar />
      </div>
        {renderApp()}
      <div className="credits">
        <Credits />
      </div>
    </div>
    </GoogleUserContext.Provider>
  );




}

export default App;
