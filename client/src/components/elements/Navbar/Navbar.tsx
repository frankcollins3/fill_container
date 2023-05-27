import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react';
import './navbar.css';
import { animated, useSpring } from 'react-spring';
import $ from 'jquery'
import CSS from '../../../utility/CSS'
import LogInOutGoogle from '../LogInOutGoogle/LogInOutGoogle'
import store from '../../../redux/store'
import actionsObject from '../../../redux/actionsJS'
// import $ from 'jquery'

// import Profile from '../Profile';


 function Navbar(props:any) {

  console.log('props')
  console.log(props)

  // let navbardropletJQ = $('.navbar-droplet')
  // let msgbottleJQ = $('.msg-bottle')

  const [loginType, setLoginType] = useState("")

  let navbardropletJQ:any;
  let navbardropletID:string
  let msgbottleJQ:any;
  let msgbottleID:string
  let bothElemById:any
  
  let TOGGLE_SETTINGS = actionsObject.TOGGLE_SETTINGS

  
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
  const settingsclick = () => {  window.location.href = "/settings" }

  const test = async () => {
      // let navsettings = await TOGGLE_SETTINGS()
      // console.log('navsettings')
      // console.log(navsettings.payload)
      console.log(await store.getState())

      console.log('props')
      console.log(props)
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
    <img  src="/water_img/panda.png"/>
    </div>
      
      <div className="logo">
        {/* <Boop rotation={10} timing={150}> */}
          <img onClick={homeclick} src="/water_img/home.png" />
          <img onClick={statclick} src="/water_img/statistics.png" />
          <img onClick={settingsclick} src="/water_img/settings.png" />

          
          <LogInOutGoogle user={testuser}/>
          {/* <img src="/water_img/exit.png" /> */}
          
 
        {/* </Boop> */}
      </div>
      {/* <Profile /> */}
 
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  water: state.water,
  API_URL: state.API_URL,
  settings: state.settings,
  LOGIN_TYPE: state.LOGIN_TYPE,
  ENV: state.ENV,
  USER: state.USER
});

export default connect(mapStateToProps)(Navbar);
