import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React from "react"
import {useState, useEffect, useContext, createContext } from 'react';
import {connect} from "react-redux"
import $ from 'jquery'
import dotenv from "dotenv"

// utility functions
import WaterRequest from './utility/WaterRequest'
import CSS from './utility/CSS'
import EVENT from './utility/EVENT'

// * components from src/components ---?
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
import actionObject from './redux/actions'
import allurl from './utility/allurl'


function App() {

  // const [googler, setGoogler] = useState(null)
  let env:any;
  // let clientId = ''
  let clientId:string;
  let API:string = ''
  let GLOBAL_STORE;
  let urlbank:any;
  
  const [googleUser, setGoogleUser] = useState<any>({})
  const GoogleUserContext = createContext<any>({})

  useEffect( () => {
    (async() => {
      urlbank = await allurl()
      GLOBAL_STORE = await store.getState()
      API = urlbank.API      
      env = urlbank.ENVdata.data.ENV      
      
      clientId = env.GOOGLE_ID
      // let data = await pre_env.json()
      // console.log('data')
      // console.log(data)

            function start() {
        gapi.client.init({
          // clientId: clientId ,
          clientId: clientId,
          // clientId: clientId || '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com',
          // clientId: clientId 
          scope: ""
        })
      };
    const loadgoogle = () => { gapi.load('client:auth2', start) }
    loadgoogle()
    })()
  }, [])

//   useEffect( () => {
//     (async() => {  
//       // fetch(`http://localhost:5000/fill_cont?query={ENV}`)

// // * * CHANGE LOCALHOST FOR PRODUCTION! * * func accesses GraphQL: client/index.js RootQueryType -> ENV { resolve: {process.env}}
//       const fetchAndReassignGlobals = () => {
//         fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API,REACT_APP_NODE_ENV,REACT_APP_GOOGLE_ID}}`)
//         .then(async(processenv:any) => {
//           let envdata = await processenv.json()
//           env = envdata.data.ENV[0]
//           clientId = env.REACT_APP_GOOGLE_ID
//           const preAPI = env.REACT_APP_API
//           const splitAPI = preAPI.split("***")
//           const api = env.REACT_APP_NODE_ENV === 'development' ?  splitAPI[0] : splitAPI[1]
//         })      
//       }
//       // fetchAndReassignGlobals()
      
//       const reassignGlobalGoogleId = () => {
//         fetch(`${API}/fill_cont?query={clientId}`)
//         .then(async(predata:any) => {
//           if (predata) {
//             let data = await predata.json()
//             console.log(data)
//           } else { return } // } else { throw new Error("no please") }        
//         })
//       }
          
//       function start() {
//         gapi.client.init({
//           // clientId: clientId ,
//           clientId: clientId || '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com',
//           // clientId: clientId 
//           scope: ""
//         })
//       };
//     const loadgoogle = () => { gapi.load('client:auth2', start) }
//     // const promises = [ fetchAndReassignGlobals, reassignGlobalGoogleId, ] let promise_array:any[] = [fetchAndReassignGlobals()]
      

//       let ServerPromise = new Promise( (resolve, reject) => {
//         resolve(fetchAndReassignGlobals())
//         reject(console.log('ServerPromise'))
//       })
//       ServerPromise
//       .then( () => {
//         reassignGlobalGoogleId()
//         loadgoogle()
//       })      
//     })()


//   }, [])


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
    console.log('test one');
  }

  const test2 = async () => {
    let allDBsettings:string = urlbank.allDBsettingsURL

    let h20 = await WaterRequest(allDBsettings, { headers: 'headers' })
    console.log('h20')
    console.log(h20)
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

      {/* <div className="navbar">
        {clientId.length
        ?
        <GoogleLogin  
        onSuccess={onSuccess}
        onFailure={onFailure}
        clientId={clientId}
        // clientId={GOOGLE_clientId}
        buttonText="text"
        cookiePolicy={'single_host_origin'}
        // isSignedIn={true}
        />
        :
        <pre></pre>
        } */}

        <button style={{ backgroundColor: 'maroon', color: 'olive'}} onClick={test}>test</button>
        <button style={{ backgroundColor: 'orange', color: 'maroon'}} onClick={test2}>test2</button>
        {/* <GoogleLogout clientId={clientId}/> */}
        
        <Navbar />
      </div>
        {renderApp()}
      <div className="credits">
        <Credits />
      </div>
    </div>
    // </GoogleUserContext.Provider>
  );
}

export default App;
