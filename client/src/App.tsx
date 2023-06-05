import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React from "react"
import {useState, useEffect, useContext, createContext } from 'react';
import { connect, Provider, useDispatch } from "react-redux"

import $ from 'jquery'
import dotenv from "dotenv"

// utility functions
import WaterRequest from './utility/WaterRequest'
import CSS from './utility/CSS'
import EVENT from './utility/EVENT'
import allDBurl from './utility/fetch/allDBurl'
import setCursor from './utility/setCursor'
import waterIntakeWeightFormula from './utility/waterIntakeWeightFormula'

// * components from src/components *
import Navbar from './components/elements/Navbar'
import Dashboard from './components/elements/Dashboard/Dashboard'
import Credits from './components/elements/Credits/Credits'
import ConnectedLogInOutGoogle from './components/elements/LogInOutGoogle/LogInOutGoogle'
import ConnectedMeIcon from './components/elements/MeIcon/'
import HomeTS from './components/webpage/home/homeTS'

// <GoogleLogin> and googleAPI components and variables.
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {gapi} from 'gapi-script'

// redux / global state management 
import store from './redux/store'

function App( props:any ) {
  const dispatch = useDispatch()
  setCursor($('*'))   



  const { 
    HYDRO_SETTINGS, LOG_IN_OUT_TYPE, CURRENT_USER, ICON_NOT_INPUT,          // state from mapStateToProps above the export app statement.
    TOGGLE_HYDRO_SETTINGS, SET_LOG_IN_OUT_TYPE      // actions from mapDispatchToProps bottom of App.tsx
  } = props    // object destructuring props haven't done this before.

  let env:any;
  // let clientId = ''
  let clientId:string;
  let API:string = ''
  
  // let globalstate = { HYDRO_SETTINGS, HYDRO_DATA };
  let urlbank:any;

  const [googleUser, setGoogleUser] = useState<any>({})
  const GoogleUserContext = createContext<any>({})

  useEffect( () => {
    (async() => {
      urlbank = await allDBurl()
      // let {HYDRO_DATA, HYDRO_SETTINGS } = await store.getState()

      API = urlbank.API      
      env = urlbank.ENVdata.data.ENV   
            
      clientId = env.GOOGLE_ID
            function start() {
        gapi.client.init({
          clientId: clientId,
          // clientId: clientId || '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com',
          scope: ""
        })
      };
    const loadgoogle = () => { gapi.load('client:auth2', start) }
    loadgoogle()
    })()
  }, [])

  const onSuccess = (res:any) =>  { console.log(res.profileObj) }
  const onFailure = (res:any) => { console.log("hey failure") }


  const renderApp = () => {
      return (
        <div className="main">
        
    <Router>
    <Routes>
    <Route path={'/'} element={ < HomeTS /> } />
    {/* <Route path={'/settings'} element={ < Settings /> } /> */}
    {/*   settings needs redux state. [ SETTINGS_DISPLAY | TOGGLE_SETTINGS_DISPLAY ]   */}
    <Route path={'/loginoutgoogle'} element={ ICON_NOT_INPUT ? <ConnectedMeIcon/> : <ConnectedLogInOutGoogle/>  } />
    <Route path={'/dashboard'} element={ < Dashboard /> } />
    </Routes>
    </Router>  
      </div>
      )
  }

  return (
    // <GoogleUserContext.Provider value={googleUser} >
    <div className="App">
      <div className="navbar">      
        {/* <button style={{ backgroundColor: 'maroon', color: 'olive'}} onClick={test}>test</button>
        <button style={{ backgroundColor: 'orange', color: 'maroon'}} onClick={test2}>test2</button> */}
        <Navbar />
        <h1 className="lifewater"> Water is Life</h1>
      </div>
        {renderApp()}
      <div className="credits">
        <h1 className="lifewater"> {CURRENT_USER.username ? `${CURRENT_USER.username} is Water` : "Life is Water" } </h1>
        {/* <h1 className="lifewater"> Life is Water </h1> */}
        <Credits />
      {/* <p style={{ textAlign: 'center' }}> LOG_IN_OUT_TYPE: { LOG_IN_OUT_TYPE  } </p> */}
      {/* <p style={{ textAlign: 'center' }}> LOG_IN_OUT_TYPE: { LOG_IN_OUT_TYPE === 'login' ? 'login' : 'logout' } </p> */}
      {/* <p style={{ textAlign: 'center' }}> settings: { HYDRO_SETTINGS ? 'on' : 'off' } </p> */}
      </div>
    </div>
    // </GoogleUserContext.Provider>
  );
}

//  global redux variables from '/redux/store to be manipulated by the actions dispatch object that are sent to props from mapDispatchToProps below
const mapStateToProps = (state:any) => ({
    API_URL: state.API_URL,
    ENV: state.ENV,
    USER: state.USER,
    
    // regular app props
    LOG_IN_OUT_TYPE: state.LOG_IN_OUT_TYPE,
    HYDRO_SETTINGS: state.HYDRO_SETTINGS,

    CURRENT_USER: state.CURRENT_USER,
    ICON_NOT_INPUT: state.ICON_NOT_INPUT
});

// global redux actions. these are the state-mutating actions being mapped to props
const mapDispatchToProps = (dispatch: any) => ({
  
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const Root = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default Root;
