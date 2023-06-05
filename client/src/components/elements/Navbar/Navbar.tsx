import { connect, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import './navbar.css';
import { animated, useSpring } from 'react-spring';
import $ from 'jquery'
import LogInOutGoogle from '../LogInOutGoogle/LogInOutGoogle'
import store from '../../../redux/store'

import CSS from '../../../utility/CSS'
import timeoutFunc from '../../../utility/timeoutFunc'
import allUrl from '../../../utility/fetch/allDBurl'
import userSignup from '../../../utility/fetch/userSignup'

import { TOGGLE_HYDRO_SETTINGS } from '../../../redux/actions'

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

  const test = async () => {
    console.log("test click")
    let urlbank = await allUrl()
    let env = urlbank.ENVdata.data.ENV

    console.log('USERNAME_INPUT')
    console.log(USERNAME_INPUT)

    console.log('PASSWORD_INPUT')
    console.log(PASSWORD_INPUT)

    console.log('EMAIL_INPUT')
    console.log(EMAIL_INPUT)

    console.log('AGE_INPUT')
    console.log(AGE_INPUT)

    console.log('GOOGLE_IMG_URL')
    console.log(GOOGLE_IMG_URL)

    console.log('GOOGLE_ID_INPUT')
    console.log(GOOGLE_ID_INPUT)


    let nonREDUXUSERNAME = USERNAME_INPUT.length > 1 ? USERNAME_INPUT : '';
    let nonREDUXPASSWORD = PASSWORD_INPUT.length > 1 ? PASSWORD_INPUT : '';
    let nonREDUXEMAIL = EMAIL_INPUT.length > 1 ? EMAIL_INPUT : '';
    let nonREDUXAGE = AGE_INPUT.length > 1 ? AGE_INPUT : '';
    let nonREDUXGOOGLEID = GOOGLE_ID_INPUT ? GOOGLE_ID_INPUT.length > 1 ? GOOGLE_ID_INPUT : '' : 'nogoogleidinput';
    let nonREDUXICON = GOOGLE_IMG_URL.length > 1 ? GOOGLE_IMG_URL : 'myurl';
    
    

    let NODE_ENV = env.NODE_ENV

    let realuser = { googleId: GOOGLE_ID_INPUT, icon: GOOGLE_IMG_URL, username: USERNAME_INPUT || '', email: EMAIL_INPUT || '', password:  PASSWORD_INPUT || '', age: AGE_INPUT || 0}


    let testuser = { googleId: 'yup', icon: 'yes', username: 'yeah', password: 'surepass', email: 'sendaletter', age: 30 }
    const predata = await userSignup(testuser, NODE_ENV)
    
    console.log('predata')
    console.log(predata)

    const realuserfetch = await userSignup(realuser, NODE_ENV)
    console.log('realuserfetch')
    console.log(realuserfetch)



    // const predata = await fetch(`http://localhost:5000/fill_cont?query={userSignup{id,googleId,icon,username,email,age}}`)

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
    <button onClick={test} style={{backgroundColor: 'limegreen', border: '1px dashed hotpink', transform: 'scale(2.0)' }}> </button>
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
