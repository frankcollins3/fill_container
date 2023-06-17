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
import userSettingsFetch from './utility/fetch/userSettings'
import setScheduleWithSettings from './utility/setScheduleWithSettings'
import setCursor from './utility/setCursor'
import waterIntakeWeightFormula from './utility/waterIntakeWeightFormula'
import {useImage} from './utility/Contexts/ImgContext'
import {useRegex} from './utility/Contexts/RegexMenu'

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
import { SET_LOG_IN_OUT_FLASH_MSG, SET_NON_GOOGLE_IMG_URL, TOGGLE_USER_ICON_CONFIRM, SET_USERNAME_INPUT, SET_CURRENT_USER, SET_GOOGLE_IMG_URL, TOGGLE_APP_PAGE_ICON_CONFIRM, SET_NODE_ENV, SET_API, SET_HYDRO_DATA, SET_HYDRO_INTAKE, SET_HYDRO_SCHEDULE, SET_SETTINGS_HYDRO, SET_DATE, TOGGLE_RELOAD } from './redux/actions'
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
    CURRENT_USER, GOOGLE_IMAGE_URL, ICON_NOT_INPUT, LOG_IN_OUT_FLASH_MSG, FLIP_FLOP_ICON, NON_GOOGLE_IMG_URL, USER_ICON_CONFIRM, APP_PAGE_ICON_CONFIRM, NODE_ENV, API, HYDRO_DATA, HYDRO_INTAKE, SETTINGS_HYDRO, HYDRO_SCHEDULE, DATE, RELOAD,
    TOGGLE_HYDRO_SETTINGS, SET_LOG_IN_OUT_TYPE, SET_LOG_IN_OUT_FLASH_MSG, SET_NON_GOOGLE_IMG_URL, TOGGLE_USER_ICON_CONFIRM, SET_USERNAME_INPUT, SET_CURRENT_USER, TOGGLE_APP_PAGE_ICON_CONFIRM, SET_GOOGLE_IMG_URL, SET_NODE_ENV, SET_API, SET_HYDRO_DATA, SET_HYDRO_INTAKE, SET_HYDRO_SCHEDULE, SET_SETTINGS_HYDRO, SET_DATE, TOGGLE_RELOAD
  } = props    // object destructuring props haven't done this before.

  const [currentUserInit, setCurrentUserInit] = useState(false)

  const { bite, multiColorG, hand } = useImage()
  const { APIsplit } = useRegex()

  useEffect( () => {

    (async() => {
      urlbank = await allDBurl() 
      env = urlbank.ENVdata.data.ENV  
      let pre_api = env.API.split(APIsplit)
      SET_API( {payload: env.NODE_ENV === 'development' ? pre_api[0] : pre_api[1]})      
            
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

    // parse for database icon here. if there's no database go down the lane!
    console.log("hey curentuser")
    if (!currentUserInit) {
      const localUser:any = await localStorage.getItem('wateruser')      
      const googletokencheck = await localStorage.getItem('GTOKEN')
      const logincheck = await localStorage.getItem("login")
      
      if (googletokencheck === null) {     
        if (logincheck != null) {
          console.log("right in here wittit")
          const preuser = await localStorage.getItem("loginuser")
          if (preuser != null) {
            const preuserParse = await JSON.parse(preuser)
            let user = preuserParse.data.userLogin
            let icon:string = user.icon
            
            let mySettings:any = await userSettingsFetch(user.id)                        
            mySettings = mySettings.data.userSettings
            let setSchedule = await setScheduleWithSettings(mySettings, SET_HYDRO_SCHEDULE)            
                        
            SET_CURRENT_USER({ payload: user })
            localStorage.setItem('currentuser', JSON.stringify(user))
            TOGGLE_APP_PAGE_ICON_CONFIRM()
            SET_NON_GOOGLE_IMG_URL( { payload: icon || hand })
            TOGGLE_USER_ICON_CONFIRM()
            setCurrentUserInit(true)
           
          }

        } else {
          if (localUser != null) {
            console.log("googletokencheck === null and localUser != null")
            let preuser = await JSON.parse(localUser) 
            console.log(preuser)                
            let preuservalue = JSON.parse(preuser.value)                
            let clone = preuservalue.clone
            if (clone) {            
                let currentUser = clone.data.userSignup || clone.data.userLogin                      
                let currentIcon:string = currentUser.icon                      
                let currentUsername:string = currentUser.username                    
                let currentId = currentUser.id

                // settings might need update
                let mySettings:any = await userSettingsFetch(currentId)                        
                mySettings = mySettings.data.userSettings
                let setSchedule = await setScheduleWithSettings(mySettings, SET_HYDRO_SCHEDULE)         
                // settings might need update

                let predata = await fetch(`${API}fill_cont?query={idArgsReturnIcon(id:${parseInt(currentId)})}`)
                let data = await predata.json()
                let DBicon:string = data.data.idArgsReturnIcon
                // if there's an icon in the datbase for the user use that. 
                if (DBicon) {
                  SET_NON_GOOGLE_IMG_URL( { payload: DBicon })
                  localStorage.setItem('currentuser', JSON.stringify(data))
                  TOGGLE_APP_PAGE_ICON_CONFIRM()
                  TOGGLE_USER_ICON_CONFIRM()
                  setCurrentUserInit(true)
                  // no icon in db
                } else {          
                  SET_CURRENT_USER({ payload: currentUser})
                  localStorage.setItem('currentuser', JSON.stringify(currentUser))
                  TOGGLE_APP_PAGE_ICON_CONFIRM()
                  SET_NON_GOOGLE_IMG_URL( { payload: currentIcon || hand })
                  TOGGLE_USER_ICON_CONFIRM()
                  setCurrentUserInit(true)
                }            
            } 
          }
        } 
         
      } else {         
              //   if (googletokenncheck === null) if there is no localStorage.getItem('google") which means 
        if (localUser != null) {
          let pre_user = JSON.parse(localUser)
          console.log('pre_user')
          console.log(pre_user)
          SET_CURRENT_USER( { payload: pre_user })
          localStorage.setItem('currentuser', JSON.stringify(pre_user))
          let icon:string = pre_user.icon.trim()          
          TOGGLE_USER_ICON_CONFIRM()
          SET_NON_GOOGLE_IMG_URL( { payload: icon || multiColorG } )          
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
    ENV: state.ENV,
    USER: state.USER,
    NODE_ENV: state.NODE_ENV,
    API: state.API,
    
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
    
    // water settings 
    HYDRO_DATA: state.HYDRO_DATA,           // postgres.table.data           
    HYDRO_INTAKE: state.HYDRO_INTAKE, 
    HYDRO_SCHEDULE: state.HYDRO_SCHEDULE,
    SETTINGS_HYDRO: state.SETTINGS_HYDRO,
    DATE: state.DATE,
    RELOAD: state.reload
});

// global redux actions. these are the state-mutating actions being mapped to props
const mapDispatchToProps = (dispatch: any) => ({
    SET_LOG_IN_OUT_FLASH_MSG: () => dispatch(SET_LOG_IN_OUT_FLASH_MSG()),
    SET_NON_GOOGLE_IMG_URL: (action:any) => dispatch(SET_NON_GOOGLE_IMG_URL(action)),
    TOGGLE_USER_ICON_CONFIRM: () => dispatch(TOGGLE_USER_ICON_CONFIRM()),
    TOGGLE_APP_PAGE_ICON_CONFIRM: () => dispatch(TOGGLE_APP_PAGE_ICON_CONFIRM()),
    SET_USERNAME_INPUT: (action:any) => dispatch(SET_USERNAME_INPUT(action)),
    SET_CURRENT_USER: (action:any) => dispatch(SET_CURRENT_USER(action)),
    SET_GOOGLE_IMG_URL: (action:any) => dispatch(SET_GOOGLE_IMG_URL(action)),
    SET_NODE_ENV: (action:any) => dispatch(SET_NODE_ENV(action)),
    SET_API: (action:any) => dispatch(SET_API(action)),

    SET_HYDRO_DATA: (action:any) => dispatch(SET_HYDRO_DATA(action)),
    SET_HYDRO_INTAKE: (action:any) => dispatch(SET_HYDRO_INTAKE(action)),
    SET_HYDRO_SCHEDULE: (action:any) => dispatch(SET_HYDRO_SCHEDULE(action)),
    SET_SETTINGS_HYDRO: (action:any) => dispatch(SET_SETTINGS_HYDRO(action)),
    SET_DATE: (action:any) => dispatch(SET_DATE(action)),
    TOGGLE_RELOAD: () => dispatch(TOGGLE_RELOAD())

});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

const Root = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default Root;
