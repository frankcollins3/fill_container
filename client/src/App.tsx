import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React from "react"
import {useState, useEffect, useContext, createContext } from 'react';
import {connect} from "react-redux"
import $ from 'jquery'
import dotenv from "dotenv"
import WaterRequest from './utils.js'

// * components from src/components ---?
import Navbar from './components/elements/Navbar/Navbar'
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
  
  const heyguys = {
    hey: 'hi',
    guys: 'guys'
  }
  
  const [googleUser, setGoogleUser] = useState<any>({})
  const GoogleUserContext = createContext<any>({})

  useEffect( () => {
    (async() => {
      let urlbank = await allurl()
      console.log('urlbank')
      console.log(urlbank)
      GLOBAL_STORE = await store.getState()
      API = urlbank.API      
      env = urlbank.ENVdata.data.ENV      
      
      clientId = env.GOOGLE_ID
      console.log('env')
      console.log(env)
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
     console.log('Promise success') 
     console.log('res')
     console.log(res)
     console.log(res.profileObj)
    }

const onFailure = (res:any) => { console.log("hey failure") }

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

const test2 = async () => {
  console.log('env')
  console.log(env)

  console.log('API')
  console.log(API)
  
  console.log("hey how are you guys from test2");

  let h20 = await WaterRequest('testurl', { headers: 'headers' })
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
