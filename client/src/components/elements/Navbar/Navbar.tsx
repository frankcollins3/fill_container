import { connect, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import './navbar.css';
import { animated, useSpring } from 'react-spring';
import $ from 'jquery'
import LogInOutGoogle from '../LogInOutGoogle/LogInOutGoogle'
import store from '../../../redux/store'

import CSS from '../../../utility/CSS'
import timeoutFunc from '../../../utility/timeoutFunc'
import PromiseFunc from '../../../utility/PromiseFunc'
import allUrl from '../../../utility/fetch/allDBurl'
import userSignup from '../../../utility/fetch/userSignup'

import { TOGGLE_HYDRO_SETTINGS } from '../../../redux/actions'
import ConnectedSignupLoginChecker from '../SignupLoginChecker';

// import $ from 'jquery'

// import Profile from '../Profile';
 function Navbar(props:any) {
  const dispatch = useDispatch()

  const { 
    USERNAME_INPUT, PASSWORD_INPUT, EMAIL_INPUT, AGE_INPUT, GOOGLE_IMG_URL, GOOGLE_ID_INPUT,
    HYDRO_SETTINGS, LOG_IN_OUT_TYPE, GOOGLE_LINK_ACCT_SCREEN,
    TOGGLE_HYDRO_SETTINGS, SET_LOG_IN_OUT_TYPE,
   } = props

  // let navbardropletJQ = $('.navbar-droplet')
  // let msgbottleJQ = $('.msg-bottle')

  const [loginType, setLoginType] = useState("")
  let location = window.location
  let href:string = location.href;
  let pathname:string = location.pathname;


  let navbardropletJQ:any;
  let navbardropletID:string
  let msgbottleJQ:any;
  let msgbottleID:string
  let bothElemById:any
  
  if (typeof window !== 'undefined') {
    CSS($('*'), 'cursor', `url('/water_img/mouse_droplet.png')`)   
      $('*').on('mouseenter', (event:any) => { CSS($(event.target), 'cursor', 'normal') })
  }

//   const Boop = ({ rotation, timing, children }) => {
    const [isBooped, setIsBooped] = useState(false);

    // const style = useSpring({
    //   display: 'inline-block',
    //   backfaceVisibility: 'hidden',
    //   transform: isBooped ? `rotate(${rotation}deg)` : `rotate(0deg)`,
    //   config: {
    //     tension: 300,
    //     friction: 10,
    //   },
    // });

    // useEffect(() => {
    //   if (!isBooped) {
    //     return;
    //   }
    //   const timeoutId = window.setTimeout(() => {
    //     setIsBooped(false);
    //   }, timing);
    //   return () => {
    //     window.clearTimeout(timeoutId);
    //   };
    // }, [isBooped, timing]);

    // const trigger = () => {
      // setIsBooped(true);
    // };

    // return (
    //   <animated.div onMouseEnter={trigger} style={style}>
        // {children}
    //   </animated.div>
    // );
  // };

  useEffect( () => {
    navbardropletJQ = $('#navbar-droplet')[0]
    navbardropletID = navbardropletJQ.id
    msgbottleJQ = $('#msg-bottle')[0]
    msgbottleID = msgbottleJQ.id
    bothElemById = [navbardropletID,msgbottleID].join(" ")

  }, [])

const homeclick = () => { window.location.href = "/"}
  const statclick = () => {  window.location.href = "/dashboard" }
  const doorclick = () => { window.location.href = "/loginoutgoogle"}

  const settingsclick = () => {  
    let noslashregex = /\//
      let slashlesspathname:string = pathname.replace(noslashregex, '')            
    if (slashlesspathname === "dashboard") {    // i dont want to redirect to settings if one were to click on the gear from the login screen. it doesn't make sense you should be logged in.
      localStorage.setItem('settingsDuringDashboard', 'yes')
      window.location.href = "/"
    } else {
      TOGGLE_HYDRO_SETTINGS()
    } 
  }

  // email
// "fwc3rd@gmail.com"
// familyName
// "Collins"
// givenName
// "Frank"
// googleId
// "117827387775507687118"
// imageUrl
// "https://lh3.googleusercontent.com/a/AAcHTtd_55dRY1mQ1-GP5R4PHEgjmSRGTZNK7aGM8-82=s96-c"
// name
// "Frank Collins"

  const test = async () => {
    console.log("test click")
    let urlbank = await allUrl()
    let env = urlbank.ENVdata.data.ENV
    let miz:string = "mastermizery".replace(/\s/g, '')
    let googleId:string = '117827387775507687118'.replace(/\s/g, '')
    let icon:string = 'https://lh3.googleusercontent.com/a/AAcHTtd_55dRY1mQ1-GP5R4PHEgjmSRGTZNK7aGM8-82=s96-c'.replace(/\s/g, '')
    await localStorage.setItem("icon", icon)
    let storageIcon = await localStorage.getItem("icon")
    console.log('storageIcon')
    console.log(storageIcon)

    console.log('icon')
    console.log(icon)

    
    let href:string = `http://localhost:5000/`
    let args = `(name:"mastermizery",googleId:"117827387775507687118",imageUrl:"https://lh3.googleusercontent.com/a/AAcHTtd_55dRY1mQ1-GP5R4PHEgjmSRGTZNK7aGM8-82=s96-c")`

const predata = await fetch(`http://localhost:5000/fill_cont?query={linkUserWithGoogle(username:"${encodeURIComponent(`${miz}`)}",googleId:"${encodeURIComponent(`${storageIcon}`)}",icon:"${encodeURIComponent(`${icon}`)}"){id,googleId,icon,username,email,age}}`)   // W O R K S !!!!!

// const predata = await fetch(`http://localhost:5000/fill_cont?query={linkUserWithGoogle(username:"${encodeURIComponent(`${miz}`)}",googleId:"${encodeURIComponent(`${googleId}`)}",icon:"${encodeURIComponent(`${icon}`)}"){id,googleId,icon,username,email,age}}`)   // W O R K S !!!!!
    const data = await predata.json()
    console.log('data')
    console.log(data)
    // const predata = await fetch(`http://localhost:5000/fill_cont?query={userSignup{id,googleId,icon,username,email,age}}`)
  }

  const test2 = async () => {
    let icon:string = 'icon'
    const iconFromStorage:any|undefined = localStorage.getItem('icon') 
    // const iconFromStorage:any|undefined = localStorage.getItem('icon') !== undefined ? localStorage.getItem('icon') : ''
    const failure = "-____-"    
    const retrieveIcon = await PromiseFunc(iconFromStorage, failure)
    console.log('retrieveIcon')
    console.log(retrieveIcon)

  }

    const testuser = { username: 'test', email: 'test', password: 'test', age: 'test', GOOGLE_ID: 'GOOGLE_ID' }

  return (
    <div className="navbar-container" 
    // style={{
    //   display: GOOGLE_LINK_ACCT_SCREEN ? "flex" : "",
    //   flexDirection: GOOGLE_LINK_ACCT_SCREEN ? "row" : "row",
    //   justifyContent: GOOGLE_LINK_ACCT_SCREEN ? "center" : "space-between",
    //   alignItems: GOOGLE_LINK_ACCT_SCREEN ? "center" : "center"
    // }}
    >
    <div className="logo">
    <img style={{ border: 'none' }} className={bothElemById} id="navbar-droplet" src={ GOOGLE_LINK_ACCT_SCREEN ? "/google_img/google_big_g.png" : "/water_img/small_droplet.png"} />    

    <img style={{ border: 'none' }} className={bothElemById} id="msg-bottle"  src={ GOOGLE_LINK_ACCT_SCREEN ? "/google_img/google_red_o.png" : "/water_img/msg-bottle.png"} />
    <button onClick={test} style={{ margin: '1em', backgroundColor: 'limegreen', border: '1px dashed hotpink', transform: 'scale(2.0)' }}> </button>
    <button onClick={test2} style={{ margin: '1em', backgroundColor: 'coral', border: 'salmon', transform: 'scale(2.0)' }}> </button>
    </div>

    <div className="middle-navbar">
    {/* <img style={{ display: loginType === "login" ? "" : "none" }} src="/water_img/panda.png"/> */}
    {/* <img  src="/water_img/panda.png"/> */}
    </div>
      
      <div className="logo">
        {/* <Boop rotation={10} timing={150}> */}
          <img onClick={homeclick} src={ GOOGLE_LINK_ACCT_SCREEN ? "/google_img/google_yellow_o.png" : "/water_img/home.png"} />
          <img onClick={statclick} src={ GOOGLE_LINK_ACCT_SCREEN ? "/google_img/google_lil_g.png" : "/water_img/statistics.png"} />
          <img onClick={settingsclick} src={ GOOGLE_LINK_ACCT_SCREEN ? "/google_img/google_l.png" : "/water_img/settings.png"} />

          
          {/* <LogInOutGoogle user={testuser}/> */}
          <img onClick={doorclick} src={ GOOGLE_LINK_ACCT_SCREEN ? "/google_img/google_e.png" : "/water_img/exit.png"} />
          
 
        {/* </Boop> */}
      </div>
      {/* <Profile /> */}
 
    </div>
  );
}

const mapStateToProps = (state:any) => ({
    HYDRO_SETTINGS: state.HYDRO_SETTINGS,
    HYDRO_DATA: state.HYDRO_DATA,
    LOG_IN_OUT_TYPE: state.LOG_IN_OUT_TYPE,
    GOOGLE_LINK_ACCT_SCREEN: state.GOOGLE_LINK_ACCT_SCREEN,


    USERNAME_INPUT: state.USERNAME_INPUT,
    PASSWORD_INPUT: state.PASSWORD_INPUT,
    GOOGLE_ID_INPUT: state.GOOGLE_ID_INPUT,
    EMAIL_INPUT: state.EMAIL_INPUT,
    AGE_INPUT: state.AGE_INPUT,
    GOOGLE_IMG_URL: state.GOOGLE_IMG_URL
    
})

const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS())
})

const ConnectedNavbar = connect(mapStateToProps, mapDispatchToProps)(Navbar)

export default ConnectedNavbar

// const mapStateToProps = (state: any) => ({
//   water: state.water,
//   API_URL: state.API_URL,
//   settings: state.settings,
//   LOGIN_TYPE: state.LOGIN_TYPE,
//   ENV: state.ENV,
//   USER: state.USER
// });

// const mapDispatchToProps = (dispatch:any) => ({
//       togglesettings: (setting:any) => dispatch(TOGGLE_SETTINGS(setting))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
