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


function App() {

  // const [googler, setGoogler] = useState(null)
  let env:any;
  let clientId = ''
  let API:string = ''
  
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
    (async() => {  
      // fetch(`http://localhost:5000/fill_cont?query={ENV}`)

// * * CHANGE LOCALHOST FOR PRODUCTION! * * func accesses GraphQL: client/index.js RootQueryType -> ENV { resolve: {process.env}}
      const fetchAndReassignGlobals = () => {
        fetch(`http://localhost:5000/fill_cont?query={ENV{DATABASE_URL,REACT_APP_API,REACT_APP_NODE_ENV,REACT_APP_GOOGLE_ID}}`)
        .then(async(processenv:any) => {
          let envdata = await processenv.json()
          env = envdata.data.ENV[0]
          clientId = env.REACT_APP_GOOGLE_ID
          const preAPI = env.REACT_APP_API
          const splitAPI = preAPI.split("***")
          const api = env.REACT_APP_NODE_ENV === 'development' ?  splitAPI[0] : splitAPI[1]
          console.log('splitAPI')
          console.log(splitAPI)
  
          console.log('api')
          console.log(api)
          
          console.log('env')
          console.log(env)            
          
          console.log('clientId')
          console.log(clientId)
        })      
      }
      // fetchAndReassignGlobals()
      
      const reassignGlobalGoogleId = () => {
        fetch(`${API}/fill_cont?query={clientId}`)
        .then(async(predata:any) => {
          if (predata) {
            let data = await predata.json()
            console.log('data')
            console.log(data)
          } else { return } // } else { throw new Error("no please") }        
        })
      }
          
      function start() {
        gapi.client.init({
          // clientId: clientId ,
          clientId: clientId, 
          scope: ""
        })
      };
    const loadgoogle = () => { gapi.load('client:auth2', start) }
      
      const promises = [
        fetchAndReassignGlobals,
        reassignGlobalGoogleId,
        // loadgoogle
      ]

      let promise_array:any[] = [fetchAndReassignGlobals()]

      let ServerPromise = new Promise( (resolve, reject) => {
        resolve(fetchAndReassignGlobals())

        reject(console.log('ServerPromise'))
      })
      ServerPromise
      .then( () => {
        reassignGlobalGoogleId()
        loadgoogle()
      })
      
    })()


  }, [])


  const onSuccess = (res:any) => {
  console.log()
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

const test2 = async () => {
  console.log('env')
  console.log(env)

  console.log('API')
  console.log(API)
  // const pre_server_clientId = await fetch(`http://localhost:5000/fill_cont?query={clientId}`)
  // const server_clientId = await pre_server_clientId.json()

  // let pre_env = await fetch(`http://localhost:5000/fill_cont?query={ENV}`)
  // let env = await pre_env.json()
  // console.log('env')
  // console.log(env)
  
  // const pre_server_clientId = await fetch(`http://localhost:5000/fill_cont?query={clientId}`)
  // const ServerPromise = new Promise( (resolve, reject) => {
  //   const server_clientId = pre_server_clientId.json()
  //     resolve(server_clientId)
  //     // resolve(pre_server_clientId.json())
  //     reject(console.log("error encountered"))      
  //   })
  //   ServerPromise
  //   .then( (clientId:any) => {

  //   })
    
    // const server_clientId = await pre_server_clientId.json()
    // console.log('server_clientId')
    // console.log(server_clientId)
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
    </GoogleUserContext.Provider>
  );




}

export default App;
