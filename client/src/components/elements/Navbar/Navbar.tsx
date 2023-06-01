import { connect, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import './navbar.css';
import { animated, useSpring } from 'react-spring';
import $ from 'jquery'
import LogInOutGoogle from '../LogInOutGoogle/LogInOutGoogle'
import store from '../../../redux/store'

import CSS from '../../../utility/CSS'
import timeoutFunc from '../../../utility/timeoutFunc'

import { TOGGLE_HYDRO_SETTINGS, SET_LOG_IN_OUT_TYPE } from '../../../redux/actions'

// import $ from 'jquery'

// import Profile from '../Profile';
 function Navbar(props:any) {
  const dispatch = useDispatch()

  const { 
    HYDRO_SETTINGS, LOG_IN_OUT_TYPE,
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
      console.log('slashlesspathname')
      console.log(slashlesspathname)
    if (slashlesspathname === "dashboard" || slashlesspathname === "loginoutgoogle") {
      localStorage.setItem('settingsDuringDashboard', 'yes')
      window.location.href = "/"
    } else {
      TOGGLE_HYDRO_SETTINGS()
    } 
  }

  const test = async () => {
      console.log('HYDRO_SETTINGS from navbar')
      console.log(HYDRO_SETTINGS)

      console.log('LOG_IN_OUT_TYPE')
      console.log(LOG_IN_OUT_TYPE)

    // TOGGLE_HYDRO_SETTINGS()
  }

    const testuser = { username: 'test', email: 'test', password: 'test', age: 'test', GOOGLE_ID: 'GOOGLE_ID' }

  return (
    <div className="navbar-container">
    <div className="logo">
    <img style={{ border: 'none' }} className={bothElemById} id="navbar-droplet" src="/water_img/small_droplet.png" />
    <img style={{ border: 'none' }} className={bothElemById} id="msg-bottle"  src="/water_img/msg-bottle.png" />
    <button onClick={test} style={{backgroundColor: 'limegreen', border: '1px dashed hotpink' }}> </button>
    </div>

    <div className="middle-navbar">
    {/* <img style={{ display: loginType === "login" ? "" : "none" }} src="/water_img/panda.png"/> */}
    {/* <img  src="/water_img/panda.png"/> */}
    </div>
      
      <div className="logo">
        {/* <Boop rotation={10} timing={150}> */}
          <img onClick={homeclick} src="/water_img/home.png" />
          <img onClick={statclick} src="/water_img/statistics.png" />
          <img onClick={settingsclick} src="/water_img/settings.png" />

          
          {/* <LogInOutGoogle user={testuser}/> */}
          <img onClick={doorclick} src="/water_img/exit.png" />
          
 
        {/* </Boop> */}
      </div>
      {/* <Profile /> */}
 
    </div>
  );
}

const mapStateToProps = (state:any) => ({
    HYDRO_SETTINGS: state.HYDRO_SETTINGS,
    HYDRO_DATA: state.HYDRO_DATA,
    LOG_IN_OUT_TYPE: state.LOG_IN_OUT_TYPE
})

const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS()),
    SET_LOG_IN_OUT_TYPE: () => dispatch(SET_LOG_IN_OUT_TYPE())
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
