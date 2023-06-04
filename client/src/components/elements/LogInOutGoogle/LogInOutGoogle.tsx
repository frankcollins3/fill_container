import React from "react"
import "./LoginOutGoogle.css" 
// import  "./LogInOutGoogle.module.scss"
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {gapi} from 'gapi-script'
import {useState, useEffect} from 'react'

// utility functions
import allDBurl from '../../../utility/fetch/allDBurl'
import elemChildrenJQ from '../../../utility/elemChildrenJQ'
import attributeJQ from '../../../utility/attributeJQ'
import WaterRequest from '../../../utility/WaterRequest'
import setCursor from '../../../utility/setCursor'
import CSS from '../../../utility/CSS'
// import ghostText from '../../../utility/GhostText'

// components
import ConnectedPasswordInput from '../../../components/elements/PasswordInput'
import ConnectedUsernameInput from '../../../components/elements/UsernameInput'
import ConnectedEmailInput from '../../../components/elements/EmailInput'
import ConnectedAgeInput from '../../../components/elements/AgeInput'
import ConnectedSignupLoginChecker from '../../../components/elements/SignupLoginChecker'

import { connect, useDispatch } from 'react-redux'
import { TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_SUBMIT_INPUT_DATA, TOGGLE_SHOW_FORM , SET_PASSWORD_INPUT, SET_ALL_USERS, SET_ALL_USERNAMES, SET_ALL_EMAILS } from '../../../redux/actions'
import $ from 'jquery'
// client/src/components/elements/LogInOutGoogle/LogInOutGoogle.module.scss // relative path for import above 

 function LogInOutGoogle ( props:any ) {
    setCursor() 

    const { 
        LOGIN_SIGNUP_BTN, DISPLAY_FORM, INPUT_FOCUS, ALL_USERS, ALL_USERNAMES, USERNAME_INPUT, EMAIL_INPUT, PASSWORD_INPUT, AGE_INPUT, PARENT_CONFIRM, SUBMIT_INPUT_DATA, TOGGLE_SUBMIT_INPUT_DATA,
        TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_SHOW_FORM, SET_PASSWORD_INPUT, SET_ALL_USERS, SET_ALL_USERNAMES } = props
          

    const dispatch = useDispatch()

    let urlbank;
    let allDBusersURL
    let api;
    let env;
    let clientId:any;
    let API;


    const onSuccess = (res:any) =>  { 
        console.log(res.profileObj) 
        // create state and handle accessing user 

        // change the form in the middle to be the login user button. 
    }
    const onFailure = (res:any) => { console.log("hey failure") }

    useEffect( () => {
        (async() => {
          urlbank = await allDBurl()
          // let {HYDRO_DATA, HYDRO_SETTINGS } = await store.getState()
    
          API = urlbank.API      
          env = urlbank.ENVdata.data.ENV   
          allDBusersURL = urlbank.allDBusersURL
          
          let options = { headers: 'AllUsers' }

          let allUsers = await WaterRequest(allDBusersURL, options)
          let allUsersData = allUsers.data.allDBusers
          let allUsernames = allUsersData.filter((data:any) => data.hasOwnProperty('username')).map((data:any) => data.username);          
          
          SET_ALL_USERNAMES({ payload: allUsernames })

          let allEmails = allUsersData.filter((data:any) => data.hasOwnProperty('email')).map((data:any) => data.email)

          $('.submit-faucet').on('mouseenter', (event) => {
            CSS($('*'), 'cursor', `url('/water_img/mouseWaterCup.png'), auto`)           
          })
          $('.submit-faucet').on('mouseleave', (event) => {
            CSS($('*'), 'cursor', `url('/water_img/mouse_droplet.png'), auto`)           
          })
          
        
        //   SET_ALL_USERS( {payload: allUsersData })
          SET_ALL_USERNAMES( {payload: allUsernames })
          SET_ALL_EMAILS( { payload: allEmails })
            
        //   SET_ALL_USERS( {payload: allUsersData })
                
          clientId = env.GOOGLE_ID
                function start() {
            gapi.client.init({
              clientId: clientId,
              // clientId: clientId || '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com',
              scope: ""
            })
          };
        const loadgoogle = () => { gapi.load('client:auth2', start) }
        loadgoogle()
        })()

        
      }, [])

    // console.log(user.user.GOOGLE_ID)

    let InOutGoogleFunction:any;

    const showHideLoginSignupBtn = () => {        
        // robust code
        TOGGLE_LOGIN_SIGNUP_BTN()
        // if (!LOGIN_SIGNUP_BTN) TOGGLE_LOGIN_SIGNUP_BTN()        
        // TOGGLE_LOGIN_SIGNUP_BTN()
        if (DISPLAY_FORM !== "login" || DISPLAY_FORM !== "signup") TOGGLE_SHOW_FORM({payload: ""})

        if (DISPLAY_FORM === "login" || DISPLAY_FORM === "signup" && LOGIN_SIGNUP_BTN) {
            console.log("weve gottem both at the same time.")
        }
        

    }

    const showform = (event:any) => {
        let targetid:string = event.target.id
        // if (targetid === 'login') {
        //     TOGGLE_LOGIN_SIGNUP_BTN()
        //     TOGGLE_SHOW_FORM(targetid)
        // }
        // else if (targetid === 'signup') {
        //     TOGGLE_SHOW_FORM(targetid)
        // }
        TOGGLE_LOGIN_SIGNUP_BTN()
        TOGGLE_SHOW_FORM({payload: targetid})
    }



    const emailinputhandler = () => {}
    const ageinputhandler = () => {}

    const deleteValue = (event:any) => {
            let value:string = event.target.value
            console.log('event')
            console.log(event)
            console.log(event.target)
            console.log(value)   
            value = ""        
    }

    const formhover = async (event:any) => {
        let target:any = event.target
        let children = $(event.target).children()
    }

    const ghosttext = (event:any) => {
        let target:any = event.target
        let jqtarget:any = $(event.target)
        let targetId:string = event.target.id       
        if (targetId === 'password') {            
        } else {
            attributeJQ(target, 'value', targetId)         // $(event.target).attr('value', targetId)
        }        
    }

    const submitFaucetClick = async () => {
        let allUsernames = ALL_USERNAMES
        let username_good:boolean = true
        let email_good:boolean = true
        let password_good:boolean = true
        let age_good:boolean = true

        let usernameinputLength:number = USERNAME_INPUT.length

        
        const checkinputs = () => {

            if (allUsernames.includes(USERNAME_INPUT)) {
                username_good = !username_good; // toggle state 
                return 'username already exists'
            } else {
                if (usernameinputLength > 6 &&  usernameinputLength < 30 ) {
                    console.log("username length is good")
                } else {
                    console.log("username failed")
                    username_good = false
                }
            }
    
            if (EMAIL_INPUT.includes('@')) {
                console.log("email good with @")
                if (EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "com" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "net" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "org" ) {
                    console.log('good with .net .com')
                } else {
                    console.log("email good with @ but failed with .com .net .org etc")
                    email_good = false
                }
                // EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "com" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "net" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "org"
            } else {
                console.log("email failed")
                email_good = false
            }
    
            if (/[\!@#$%^&*\(\)]/.test(PASSWORD_INPUT)) {
                if (/[A-Z]/.test(PASSWORD_INPUT) && /[0-9]/.test(PASSWORD_INPUT)) {
                    console.log("nice the password input works.")
                } else {
                    password_good = false
                }
            } else {
                password_good = false
            }
    
            if (parseInt(AGE_INPUT) > 10) {
                console.log("age is good older than 10")
            } else {
                if (PARENT_CONFIRM) {
                    console.log("age is less than 10 but PARENT CONFIRM")
                } else {
                    console.log("age failed")
                    age_good = false
                }
            }


        }
        const inputCheckingPromise = new Promise( (resolve, reject) => {
            resolve(checkinputs())
            reject(console.log('hey weve got a problem my friend'))
        })

        inputCheckingPromise
        .then( () => {
            if (username_good === true && email_good === true && password_good === true && age_good === true) {
                // if (username_good && email_good && password_good && age_good) {
                console.log("all_good")
                TOGGLE_SUBMIT_INPUT_DATA()
            //     console.log("all_good")
            } else {
                console.log("NOT_ALL_GOOD!")
                console.log('username_good')
                console.log(username_good)

                console.log("email_good")
                console.log(email_good)

                console.log('password_good')
                console.log(password_good)

                console.log('age_good')
                console.log(age_good)
            }
        })
       


        // /[\!@#$%^&*\(\)]/.test(PASSWORD_INPUT)
        
        console.log('allUsernames')
        console.log(allUsernames)

        
        console.log('USERNAME_INPUT')
        console.log(USERNAME_INPUT)

        console.log('EMAIL_INPUT')
        console.log(EMAIL_INPUT)

        console.log('PASSWORD_INPUT')                                            
        console.log(PASSWORD_INPUT)    

        console.log('AGE_INPUT')
        console.log(AGE_INPUT)
        
        
    }

            return (
                <div className="login-container">
                <img onClick={showHideLoginSignupBtn} style={{ border: 'none' }} src="/water_img/hand.png"/>                
                {/* // clientId: clientId || '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com', */}            
                <img onClick={submitFaucetClick} style={{ transform: 'scale(0.50)' }} className="submit-faucet" src="/water_img/faucet.png"/>

                {
                    SUBMIT_INPUT_DATA === false
                        ?
                <div style={{ 
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
                    height: '300px', width: '200px',                 
                }}>

                   
                    {
                        LOGIN_SIGNUP_BTN 
                        ?                        
                        <>                            
                            <button onClick={showform} id="login" className="Login-Signup-Btn"><span>s</span>login<span>s</span></button>
                            <button onClick={showform} id="signup" className="Login-Signup-Btn">signup</button>                            
                        </>
                        :
                        <pre></pre>   
                    }
                    {
                        DISPLAY_FORM === "signup"
                        ?

                        <div className="Form-Container">
                        <form onMouseEnter={formhover}>                         
                        <ConnectedUsernameInput/>
                        <ConnectedEmailInput/>
                        <ConnectedPasswordInput/>
                        <ConnectedAgeInput/>
                        </form>
                        { INPUT_FOCUS ? <ConnectedSignupLoginChecker loginstate={INPUT_FOCUS} /> : <pre> </pre> }                                                
                        </div>
                        :
                        <pre></pre>
                    }
                    {
                        DISPLAY_FORM === "login"
                        ?
                        <div className="Form-Container">
                        <ConnectedEmailInput/>
                        <ConnectedPasswordInput/>                        
                        <form onMouseEnter={formhover}>
                            {/* <input onMouseEnter={ghosttext} onChange={usernameinputhandler} id="username" type="text"></input>
                            <input onMouseEnter={ghosttext} onChange={passwordinputhandler} id="password" type="text"></input> */}
                            <button> forgot password? possible empty cup lol </button>
                        </form>
                        </div>
                        :
                        <pre></pre>
                    }
                </div>
                :
                <pre></pre>
                }
                
<div className="google-container" style = {{ backgroundImage: `url('water_img/bluegoogle.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '50px', width: '50px', border: '5px solid #dedede73', zIndex: '2',transform: 'scale(0.25)' }}>
                    {/* <h1> blue text </h1> */}

                {/* <GoogleLogin
                className="Google-Button"
                clientId={'569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com'}
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
                buttonText=""
                >
                </GoogleLogin> */}            
                </div>

                </div>
        )    
}


const mapStateToProps = (state:any) => ({
    LOGIN_SIGNUP_BTN: state.LOGIN_SIGNUP_BTN,
    DISPLAY_FORM: state.DISPLAY_FORM,
    USERNAME_INPUT: state.USERNAME_INPUT,
    EMAIL_INPUT: state.EMAIL_INPUT,
    PASSWORD_INPUT: state.PASSWORD_INPUT,
    AGE_INPUT: state.AGE_INPUT,
    PARENT_CONFIRM: state.PARENT_CONFIRM,
    INPUT_FOCUS: state.INPUT_FOCUS,
    ALL_USERS: state.ALL_USERS,
    ALL_USERNAMES: state.ALL_USERNAMES,
    ALL_EMAILS: state.ALL_EMAILS,
    SUBMIT_INPUT_DATA: state.SUBMIT_INPUT_DATA
})

const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_LOGIN_SIGNUP_BTN: () => dispatch(TOGGLE_LOGIN_SIGNUP_BTN()),
    TOGGLE_SHOW_FORM: (action:any) => dispatch(TOGGLE_SHOW_FORM(action)),
    SET_PASSWORD_INPUT: (action:any) => dispatch(SET_PASSWORD_INPUT(action)),
    SET_ALL_USERS: (action:any) => dispatch(SET_ALL_USERS(action)),
    SET_ALL_USERNAMES: (action:any) => dispatch(SET_ALL_USERNAMES(action)),
    SET_ALL_EMAILS: (action:any) => dispatch(SET_ALL_EMAILS(action)),
    TOGGLE_SUBMIT_INPUT_DATA: () => dispatch(TOGGLE_SUBMIT_INPUT_DATA())
    // TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS()),
})

const ConnectedLoginOutGoogle = connect(mapStateToProps, mapDispatchToProps)(LogInOutGoogle)

// const ConnectedLoginOutGoogle = connect(mapStateToProps, mapDispatchToProps)(LogInOutGoogle)

export default ConnectedLoginOutGoogle;     // <Route path={'/loginoutgoogle'} element={ <ConnectedLogInOutGoogle/> } /> route looks like this! not <LogInOutGoogle>
