import { connect, useDispatch } from 'react-redux'
import React, { useState, useEffect } from 'react';
import './navbar.css';
import { animated, useSpring } from 'react-spring';
import $ from 'jquery'

import CSS from '../../../utility/CSS'
import PromiseFunc from '../../../utility/PromiseFunc'
import MathRandom from '../../../utility/MathRandom'
import Boop from '../../../utility/ParentchildParent/Boop'
import {useImage} from '../../../utility/ImgContext'
import linkUserWithGoogle from '../../../utility/fetch/linkUserWithGoogle'

import allUrl from '../../../utility/fetch/allDBurl'

import { TOGGLE_HYDRO_SETTINGS, SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING } from '../../../redux/actions'
import ConnectedSignupLoginChecker from '../SignupLoginChecker';
// import $ from 'jquery'

// import Profile from '../Profile';
 function Navbar(props:any) {
  const dispatch = useDispatch()

  const { 
    USERNAME_INPUT, PASSWORD_INPUT, EMAIL_INPUT, AGE_INPUT, GOOGLE_IMG_URL, GOOGLE_ID_INPUT, SPIN_BOTTLE_IMG,

    HYDRO_SETTINGS, LOG_IN_OUT_TYPE, GOOGLE_LINK_ACCT_SCREEN, SPIN_BOTTLE_SEARCHING,
    TOGGLE_HYDRO_SETTINGS, SET_LOG_IN_OUT_TYPE, SET_SPIN_BOTTLE_IMG, TOGGLE_SPIN_BOTTLE_SEARCHING
   } = props

   const { 
    waterPark, mantaRay, aquaJogging, whale,
    msgBottle, smallDroplet, home, exit, statistics, settings, mouseWaterCup, cup, drink, bottle, bottles,
  } = useImage()



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
    let urlbank = await allUrl()
    let env = urlbank.ENVdata.data.ENV
    let miz:string = "mastermizery".replace(/\s/g, '')
    let googleId:string = '117827387775507687118'.replace(/\s/g, '')
    let icon:string = 'https://lh3.googleusercontent.com/a/AAcHTtd_55dRY1mQ1-GP5R4PHEgjmSRGTZNK7aGM8-82=s96-c'.replace(/\s/g, '')
    await localStorage.setItem("icon", icon)
    let storageIcon = await localStorage.getItem("icon")    
    let href:string = `http://localhost:5000/`

    let args = `(name:"mastermizery",googleId:"117827387775507687118",imageUrl:"https://lh3.googleusercontent.com/a/AAcHTtd_55dRY1mQ1-GP5R4PHEgjmSRGTZNK7aGM8-82=s96-c")`

    // const predata = await fetch(`http://localhost:5000/fill_cont?query={linkUserWithGoogle(username:"${encodeURIComponent(`${miz}`)}",icon:"${encodeURIComponent(`${storageIcon}`)}",googleId:"${encodeURIComponent(`${googleId}`)}"){id,googleId,icon,username,email,age}}`)   // W O R K S !!!!!
    let predata = await linkUserWithGoogle(miz, googleId, storageIcon)
    
    const data = await predata
    console.log('data')
    console.log(data)
    // const predata = await fetch(`http://localhost:5000/fill_cont?query={userSignup{id,googleId,icon,username,email,age}}`)
  }

  const test2 = () => {
    console.log('test2')
  }

    const testuser = { username: 'test', email: 'test', password: 'test', age: 'test', GOOGLE_ID: 'GOOGLE_ID' }

    const spinbottlefunc = async () => {
          const loadingicons:string[] = [cup, drink, bottle, bottles, mouseWaterCup]
          const randomIcon = MathRandom(loadingicons)
          console.log('randomIcon')
          console.log(randomIcon)          

          let allURL = await allUrl()
          let ENV = allURL.ENVdata.data.ENV
          let API:string = ENV.API
          let APIsplit = API.split('***')
          let localAPI = APIsplit[0]
          let prodAPI = APIsplit[1]

          const PuppetPromise = new Promise( (resolve, reject) => {
            let terms:string[] = ["ocean", "burger", "wendys", "burgerking", "water", "river", "seacreature", "fish"]
            let randomTerm = MathRandom(terms)
            console.log(randomTerm)
              TOGGLE_SPIN_BOTTLE_SEARCHING()
              resolve(fetch(`http://localhost:5000/fill_cont?query={puppeteer(searchTerm:"${randomTerm}")}`))    
              reject(SET_SPIN_BOTTLE_IMG( { payload: randomIcon || '/water_img/squid.png' }))  
          })
          PuppetPromise.then(async (data:any) => {
              if (data) {
                data = await data.json()
                console.log('data')
                console.log(data)
                let imgSrc:string = data.data.puppeteer
                SET_SPIN_BOTTLE_IMG( { payload: imgSrc })
                TOGGLE_SPIN_BOTTLE_SEARCHING()
              } else {
                TOGGLE_SPIN_BOTTLE_SEARCHING()
                SET_SPIN_BOTTLE_IMG( { payload: "/water_img/bite.png"})
              }
          })
          // const predata = await fetch(`http://localhost:5000/fill_cont?query={puppeteer(searchTerm:"${randomTerm}")}`)


          // const predata = await fetch(`http://localhost:5000/fill_cont?query={puppeteer(searchTerm:"${randomTerm}")}`)
          // let data = await predata.json()
          // let puppetImage = data.data.puppeteer
          // console.log('data')
          // console.log(data)
          // SET_SPIN_BOTTLE_IMG( { payload: puppetImage } )
          
                                                  

      // TOGGLE_SPIN_BOTTLE_SEARCHING()
      // console.log("dont be silly")
      



    }

  return (
    <div className="navbar-container" 
    >
    <div className="logo">
    <img style={{ border: 'none' }} className={bothElemById} id="navbar-droplet" src={smallDroplet} />    
    
    <img onClick={spinbottlefunc} className={pathname === "/loginoutgoogle" && !SPIN_BOTTLE_SEARCHING ? "Msg-Bottle-Animation" :  "" } style={{ border: 'none' }} id="msg-bottle"  src={msgBottle} />
    {/* <img onClick={spinbottlefunc} className={pathname === "/loginoutgoogle" && !SPIN_BOTTLE_SEARCHING ? "msg-bottle-animation" :  "msg-bottle-animation-slow" } style={{ border: 'none' }} id="msg-bottle"  src={msgBottle} /> */}


      <button onClick={test2} style={{ margin: '1em', backgroundColor: 'coral', border: 'salmon', transform: 'scale(2.0)' }}> </button> 
    
    </div>

    <div className="middle-navbar">
    {/* <img style={{ display: loginType === "login" ? "" : "none" }} src="/water_img/panda.png"/> */}
    {/* <img  src="/water_img/panda.png"/> */}
    </div>
      
      <div className="logo">
          <img onClick={homeclick} src={home} />
          <img onClick={statclick} src={statistics} />
          <img onClick={settingsclick} src={settings} />          
          <img onClick={doorclick} src={exit} />           
      </div>
 
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
    GOOGLE_IMG_URL: state.GOOGLE_IMG_URL,
    SPIN_BOTTLE_SEARCHING: state.SPIN_BOTTLE_SEARCHING,
    
})

const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS()),
    SET_SPIN_BOTTLE_IMG: (action:any) => dispatch(SET_SPIN_BOTTLE_IMG(action)),
    TOGGLE_SPIN_BOTTLE_SEARCHING: () => dispatch(TOGGLE_SPIN_BOTTLE_SEARCHING())
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
