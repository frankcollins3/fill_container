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
import { toggleSettings } from './redux/actions'

function App(props:any) {

  let togglesettingsprops = props.togglesettings  
  const settings = props.settings
  console.log('settings from App.tsx')
  console.log(settings)

  // const [googler, setGoogler] = useState(null)
  let env:any;
  // let clientId = ''
  let clientId:string;
  let API:string = ''
  let GLOBAL_STORE;
  let urlbank:any;
  // let TOGGLE_SETTINGS = actionObject.TOGGLE_SETTINGS
  
  const [googleUser, setGoogleUser] = useState<any>({})
  const GoogleUserContext = createContext<any>({})

  useEffect( () => {
    (async() => {
      urlbank = await allurl()
      GLOBAL_STORE = await store.getState()
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

  const onSuccess = (res:any) =>  {
     console.log('res')
     console.log(res)
     console.log(res.profileObj)
    }

const onFailure = (res:any) => { console.log("hey failure") }

  if (typeof window !== 'undefined') {
    let eventassertions = [ {property: 'cursor', value: `normal`}]
    CSS($('*'), 'cursor', `url('/water_img/mouse_droplet.png')`)   
    // EVENT($('*'), 'mouseenter', eventassertions) 
      $('*').on('mouseenter', (event:any) => { CSS($(event.target), 'cursor', 'normal') })
    // let eventassertions = [CSS(target, 'cursor', normal)]
  }
  
  const test = async () => {
    togglesettingsprops()
  };

  const test2 = async () => {
    // let allDBsettings:string = urlbank.allDBsettingsURL
    // let h20 = await WaterRequest(allDBsettings, { headers: 'headers' })
    console.log(await store.getState())    
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
        onSuccess={onSuccess}
        onFailure={onFailure}
        clientId='569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com'
        // clientId={clientId.length > 3 ? clientId : ''}
        // clientId={GOOGLE_clientId}
        buttonText="text"
        cookiePolicy={'single_host_origin'}
        // isSignedIn={true}
        />
        <button style={{ backgroundColor: 'maroon', color: 'olive'}} onClick={test}>test</button>
        <button style={{ backgroundColor: 'orange', color: 'maroon'}} onClick={test2}>test2</button>
        {/* <GoogleLogout clientId={clientId}/> */}
        
        <Navbar />
      </div>
        {renderApp()}
      <div className="credits">
        <Credits />
      <p style={{ textAlign: 'center' }}> settings: { settings ? 'on' : 'off' } </p>
      </div>
    </div>
    // </GoogleUserContext.Provider>
  );
}

const mapStateToProps = (state:any) => ({
    water: state.water,
    API_URL: state.API_URL,
    settings: state.settings,
    LOGIN_TYPE: state.LOGIN_TYPE,
    ENV: state.ENV,
    USER: state.USER
});

const mapDispatchToProps = (dispatch:any) => ({
  togglesettings: () => dispatch(toggleSettings())
})

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const Root = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default Root;

// export default connect(null, mapDispatchToProps)(App);
