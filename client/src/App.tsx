import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React, {useState, useEffect, useContext, createContext, ReactNode } from "react"
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
import {useImage} from './utility/Contexts/ImgContext'

// * components from src/components *
import Navbar from './components/elements/Navbar'
import Dashboard from './components/elements/Dashboard/Dashboard'
import ConnectedCredits from './components/elements/Credits/Credits.tsx'
import ConnectedLogInOutGoogle from './components/elements/LogInOutGoogle/LogInOutGoogle'
import ConnectedMeIcon from './components/elements/MeIcon/'
import HomeTS from './components/webpage/home/homeTS'


// context Providers!
import {ImgProvider} from './utility/Contexts/ImgContext'   // src/utility/ContextsImgContext -> <img src={all-img-src-paths-for-the-app}
import {RegexProvider} from './utility/Contexts/RegexMenu'  // regex bank wrapped around the app.

// <GoogleLogin> and googleAPI components and variables.
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {gapi} from 'gapi-script'

// redux / global state management 
import { SET_LOG_IN_OUT_FLASH_MSG, SET_NON_GOOGLE_IMG_URL, TOGGLE_USER_ICON_CONFIRM, SET_USERNAME_INPUT, SET_CURRENT_USER, SET_GOOGLE_IMG_URL, TOGGLE_APP_PAGE_ICON_CONFIRM } from './redux/actions'
import store from './redux/store'
import ConnectedSignupLoginChecker from './components/elements/SignupLoginChecker/SignupLoginChecker.tsx';

let env:any;
let clientId:string;
let API:string = ''
let urlbank:any;


function App( props:any ) {

  const dispatch = useDispatch()
  setCursor($('*'))   

  const { 
    HYDRO_SETTINGS, LOG_IN_OUT_TYPE, CURRENT_USER, GOOGLE_IMAGE_URL, ICON_NOT_INPUT, LOG_IN_OUT_FLASH_MSG, FLIP_FLOP_ICON, NON_GOOGLE_IMG_URL, USER_ICON_CONFIRM, APP_PAGE_ICON_CONFIRM,       // state from mapStateToProps above the export app statement.
    TOGGLE_HYDRO_SETTINGS, SET_LOG_IN_OUT_TYPE, SET_LOG_IN_OUT_FLASH_MSG, SET_NON_GOOGLE_IMG_URL, TOGGLE_USER_ICON_CONFIRM, SET_USERNAME_INPUT, SET_CURRENT_USER, TOGGLE_APP_PAGE_ICON_CONFIRM, SET_GOOGLE_IMG_URL,
  } = props    // object destructuring props haven't done this before.

  const [currentUserInit, setCurrentUserInit] = useState(false)

  const { bite } = useImage()

  useEffect( () => {

    (async() => {
      urlbank = await allDBurl()

      API = urlbank.API      
      env = urlbank.ENVdata.data.ENV   
            
      clientId = env.GOOGLE_ID
            function start() {
        gapi.client.init({
          clientId: clientId,
          scope: ""
        })
      };
    const loadgoogle = () => { gapi.load('client:auth2', start) }
    loadgoogle()
    })()
  }, [])

  const onSuccess = (res:any) =>  { console.log(res.profileObj) }
  const onFailure = (res:any) => { console.log("hey failure") }
  const nothing = () => { return }

  // onClick on the <App>
  const CurrentUserInit = async () => {
    console.log("hey curentuser")
    if (!currentUserInit) {
      const localUser:any = await localStorage.getItem('wateruser')      
      const googletokencheck = await localStorage.getItem('GTOKEN')
      console.log('localUser right here !')
      
      if (googletokencheck === null) {

        if (localUser != null) {
          let preuser = await JSON.parse(localUser)        
          console.log('preuser')
          console.log(preuser)
          let preuservalue = JSON.parse(preuser.value)
          
          console.log('preuservalue')
          console.log(preuservalue)
          
          let clone = preuservalue.clone
          if (clone) {
            console.log('clone in the CurrentUserInit')
            console.log(clone)
            console.log('clone')
            console.log(clone)
            let currentUser = clone.data.userSignup
            console.log('currentUser')
            console.log(currentUser)
            let currentIcon:string = currentUser.icon          
            console.log('currentIcon')
            console.log(currentIcon)
            let currentUsername:string = currentUser.username                    
            SET_CURRENT_USER({ payload: currentUser})
            TOGGLE_APP_PAGE_ICON_CONFIRM()
            SET_NON_GOOGLE_IMG_URL( { payload: currentIcon || bite })
            TOGGLE_USER_ICON_CONFIRM()
            setCurrentUserInit(true)
          }
        } else {
          
        }
      } else {        
        if (localUser != null) {
          let pre_user = JSON.parse(localUser)
          let icon:string = pre_user.icon.trim()          
          TOGGLE_USER_ICON_CONFIRM()
          SET_NON_GOOGLE_IMG_URL( { payload: icon || bite })          
          TOGGLE_APP_PAGE_ICON_CONFIRM()
          setCurrentUserInit(true)
        }        
      }
    }
    return
  }

  const renderApp = () => {
      return (
        <div className="main">        
    <Router>
    <Routes>
    <Route path={'/'} element={ < HomeTS /> } />
    {/* <Route path={'/settings'} element={ < Settings /> } /> */}
    {/*   settings needs redux state. [ SETTINGS_DISPLAY | TOGGLE_SETTINGS_DISPLAY ]   */}

    {/* <Route path={'/loginoutgoogle'} element={ ICON_NOT_INPUT ? <ConnectedLogInOutGoogle/> : <ConnectedMeIcon googleImageUrl={GOOGLE_IMAGE_URL}/>  } /> */}
    <Route path={'/loginoutgoogle'} element={ ICON_NOT_INPUT ? <ConnectedMeIcon /> : <ConnectedLogInOutGoogle/>  } />

    <Route path={'/dashboard'} element={ < Dashboard /> } />
    </Routes>
    </Router>  
      </div>
      )
  }

  return (
    // <GoogleUserContext.Provider value={googleUser} >
    <ImgProvider>
    <RegexProvider>
    {/* <div onClick={CurrentUserInit} className="App"> */}
    <div onMouseEnter={!currentUserInit ? CurrentUserInit : nothing} className="App">
      <div className="navbar">              
        <Navbar />
        <h1 className="lifewater" dangerouslySetInnerHTML={{ __html: CURRENT_USER.username  ? `${CURRENT_USER.username}<br> is Water` : "Life is Water" }}></h1>          
        {/* water you during the selection of these elements */}
      </div>
        {renderApp()}
      <div className="credits" >              
        <h1 className="lifewater" dangerouslySetInnerHTML={{ __html: ICON_NOT_INPUT && FLIP_FLOP_ICON ? "Water <br> You" : LOG_IN_OUT_FLASH_MSG ? LOG_IN_OUT_FLASH_MSG : 'Water is Life' }}        
        // <h1 className="lifewater" dangerouslySetInnerHTML={{ __html: ICON_NOT_INPUT && FLIP_FLOP_ICON ? "Water You?<br>Water Thoughs" : LOG_IN_OUT_FLASH_MSG ? LOG_IN_OUT_FLASH_MSG : 'Water is Life' }}        
        style={{  
          color: LOG_IN_OUT_FLASH_MSG ? 'silver' : '#73defe', fontSize: LOG_IN_OUT_FLASH_MSG ? '13px' : '32px', fontFamily: LOG_IN_OUT_FLASH_MSG ? 'Poppins' : 'Moon Dance',
          letterSpacing: LOG_IN_OUT_FLASH_MSG ? '0.25em' : '1.175em',
        }}>
        </h1>
        {/* className="lifewater"> {ICON_NOT_INPUT ? "Water You?" : LOG_IN_OUT_FLASH_MSG ? LOG_IN_OUT_FLASH_MSG : FLIP_FLOP_ICON ? "Water Thoughs" : 'Water is Life' } </h1> */}
        <ConnectedCredits  />    
      </div>
    </div>
          </RegexProvider>
        </ImgProvider>
  );
}

//  global redux variables from '/redux/store to be manipulated by the actions dispatch object that are sent to props from mapDispatchToProps below
const mapStateToProps = (state:any) => ({
    API_URL: state.API_URL,
    ENV: state.ENV,
    USER: state.USER,
    
    // regular app props
    LOG_IN_OUT_TYPE: state.LOG_IN_OUT_TYPE,
    LOG_IN_OUT_FLASH_MSG: state.LOG_IN_OUT_FLASH_MSG,
    HYDRO_SETTINGS: state.HYDRO_SETTINGS,

    CURRENT_USER: state.CURRENT_USER,
    GOOGLE_IMAGE_URL: state.GOOGLE_IMAGE_URL,

    ICON_NOT_INPUT: state.ICON_NOT_INPUT,
    APP_PAGE_ICON_CONFIRM: state.APP_PAGE_ICON_CONFIRM,
    FLIP_FLOP_ICON: state.FLIP_FLOP_ICON,    
    NON_GOOGLE_IMG_URL: state.NON_GOOGLE_IMG_URL,
});

// global redux actions. these are the state-mutating actions being mapped to props
const mapDispatchToProps = (dispatch: any) => ({
    SET_LOG_IN_OUT_FLASH_MSG: () => dispatch(SET_LOG_IN_OUT_FLASH_MSG()),
    SET_NON_GOOGLE_IMG_URL: (action:any) => dispatch(SET_NON_GOOGLE_IMG_URL(action)),
    TOGGLE_USER_ICON_CONFIRM: () => dispatch(TOGGLE_USER_ICON_CONFIRM()),
    TOGGLE_APP_PAGE_ICON_CONFIRM: () => dispatch(TOGGLE_APP_PAGE_ICON_CONFIRM()),
    SET_USERNAME_INPUT: (action:any) => dispatch(SET_USERNAME_INPUT(action)),
    SET_CURRENT_USER: (action:any) => dispatch(SET_CURRENT_USER(action)),
    SET_GOOGLE_IMG_URL: (action:any) => dispatch(SET_GOOGLE_IMG_URL(action))
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const Root = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default Root;
