import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React from "react"
import {useState, useEffect, useContext, createContext } from 'react';
import { connect, Provider } from "react-redux"
import $ from 'jquery'
import dotenv from "dotenv"

// utility functions
import WaterRequest from './utility/WaterRequest'
import CSS from './utility/CSS'
import EVENT from './utility/EVENT'
import allurl from './utility/allurl'
import setCursor from './utility/setCursor'

// * components from src/components *
import Navbar from './components/elements/Navbar'
import Dashboard from './components/elements/Dashboard/Dashboard'
import Credits from './components/elements/Credits/Credits'
import Settings from './components/elements/Settings/Settings'
import HomeTS from './components/webpage/home/homeTS'

// <GoogleLogin> and googleAPI components and variables.
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {gapi} from 'gapi-script'

// redux / global state management 
import store from './redux/store'
import { TOGGLE_HYDRO_SETTINGS, SET_LOG_IN_OUT_TYPE } from './redux/actions'

function App( props:any ) {
  setCursor()

  const { 
    HYDRO_SETTINGS, LOG_IN_OUT_TYPE,            // state from mapStateToProps above the export app statement.
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
      urlbank = await allurl()
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
  
  const test = async () => {
    // await TOGGLE_HYDRO_SETTINGS()
    let mydata = await fetch(`${urlbank.data}`)
    // let mydata = await fetch(`${API}fill_cont?query={data(users_id:1){google_id,access_token,refresh_token,expiry_date,users_id}}`)
    let data = await mydata.json()
    console.log('data')
    console.log(data)
    // `${API}fill_cont?query={allDBsettings(users_id: 1){id,age,height,weight,reminder,activity,start_time,end_time,users_id}}`;
  };

  const test2 = async () => {
    // let allDBsettings:string = urlbank.allDBsettingsURL
    // let h20 = await WaterRequest(allDBsettings, { headers: 'headers' })
    // console.log(await store.getState())   
    console.log(urlbank) 
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
    // <GoogleUserContext.Provider value={googleUser} >
    <div className="App">
      <div className="navbar">
        
        <GoogleLogin  
        onSuccess={onSuccess} onFailure={onFailure} buttonText="text" cookiePolicy={'single_host_origin'} isSignedIn={true}
        clientId='569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com'
        // clientId={clientId.length > 3 ? clientId : ''}        
        />
        <button style={{ backgroundColor: 'maroon', color: 'olive'}} onClick={test}>test</button>
        <button style={{ backgroundColor: 'orange', color: 'maroon'}} onClick={test2}>test2</button>
        
        <Navbar />
      </div>
        {renderApp()}
      <div className="credits">
        <Credits />
      <p style={{ textAlign: 'center' }}> settings: { HYDRO_SETTINGS ? 'on' : 'off' } </p>
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
});

// global redux actions. these are the state-mutating actions being mapped to props
const mapDispatchToProps = (dispatch:any) => ({
  TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS()),
  SET_LOG_IN_OUT_TYPE: () => dispatch(SET_LOG_IN_OUT_TYPE()),
})

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const Root = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default Root;
