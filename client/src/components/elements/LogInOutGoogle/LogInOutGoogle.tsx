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
// import ghostText from '../../../utility/GhostText'

// components
import ConnectedPasswordInput from '../../../components/elements/PasswordInput'
import ConnectedUsernameInput from '../../../components/elements/UsernameInput'
import ConnectedEmailInput from '../../../components/elements/EmailInput'
import ConnectedAgeInput from '../../../components/elements/AgeInput'
import ConnectedSignupLoginChecker from '../../../components/elements/SignupLoginChecker'



import { connect, useDispatch } from 'react-redux'
import { TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_SHOW_FORM , SET_PASSWORD_INPUT} from '../../../redux/actions'
import $ from 'jquery'
// client/src/components/elements/LogInOutGoogle/LogInOutGoogle.module.scss // relative path for import above 

 function LogInOutGoogle ( props:any ) {

    const { 
        LOGIN_SIGNUP_BTN, DISPLAY_FORM, PASSWORD_INPUT, INPUT_FOCUS,
        TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_SHOW_FORM, SET_PASSWORD_INPUT } = props
          

    const dispatch = useDispatch()

    let urlbank;
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
        console.log('DISPLAY_FORM')
        console.log(DISPLAY_FORM)
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

    const usernameinputhandler = (event:any) => {
        let value:string = event.target
        console.log('value')
        console.log(value)
    }
    const passwordinputhandler = (event:any) => {
        let value:string = event.target.value
        let hashedValue = '*'.repeat(value.length)
        // let hashedValue = "*".repeat(value.length)
        $(event.target).attr('value', hashedValue)
        SET_PASSWORD_INPUT({payload: hashedValue})
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
        // let formchildren:any = await elemChildrenJQ(target, 2)
        let children = $(event.target).children()
        console.log('children')
        console.log(children)
    }

    const ghosttext = (event:any) => {
        let target:any = event.target
        let jqtarget:any = $(event.target)
        let targetId:string = event.target.id       
        if (targetId === 'password') {
            // attributeJQ(target, 'value', PASSWORD)
            
        } else {
            attributeJQ(target, 'value', targetId)         // $(event.target).attr('value', targetId)
        }
        // modular function arguments:                  1: target $(event.target)   2: 'value' <input value={}/>        3: targetId: ['username', 'password',]
    }

        // const renderLoginOutGoogle = () => {

            return (
                <div className="login-container">
                <img onClick={showHideLoginSignupBtn} style={{ border: 'none' }} src="/water_img/hand.png"/>                
                {/* // clientId: clientId || '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com', */}            

                <div style={{ 
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
                    height: '300px', width: '200px', marginTop: '1em'                    
                }}>
                    {
                        LOGIN_SIGNUP_BTN 
                        ?                        
                        <>                            
                            <button onClick={showform} id="login" className="Login-Signup-Btn">login</button>
                            <button onClick={showform} id="signup" className="Login-Signup-Btn">signup</button>                            
                        </>
                        :
                        <pre></pre>   
                    }
                    {
                        DISPLAY_FORM === "login"
                        // id          Int @id @default(autoincrement())
                        // id="username"     String?
                        // value="username" id="email"        String?
                        // id= value="email""password"     String?
                        // id="a value="password"ge"          Int?
                        // settings  value="age"   settings[]
                        // data        data[]
                        ?
                        <>
                        <form onMouseEnter={formhover}>
                            {/* <input onMouseEnter={ghosttext} onChange={usernameinputhandler} id="username" type="text"></input> */}
                         
                        { INPUT_FOCUS ? INPUT_FOCUS === "username" ? <ConnectedUsernameInput/> : <pre></pre> : <ConnectedUsernameInput/> }                                                     
                            {/* <input onMouseEnter={ghosttext} onChange={emailinputhandler} id="email" type="text"></input> */}
                        { INPUT_FOCUS ? INPUT_FOCUS === "email" ? <ConnectedEmailInput/> : <pre> </pre> : <ConnectedEmailInput/> } 
{/* <input style={{ color: '#72d3fe', fontSize: '28px'}} value={PASSWORD} onMouseEnter={ghosttext} onChange={passwordinputhandler} id="password" type="text"></input> */}
                        { INPUT_FOCUS ? INPUT_FOCUS === "password" ? <ConnectedPasswordInput/> : <pre> </pre> : <ConnectedPasswordInput/> }
                        { INPUT_FOCUS ? INPUT_FOCUS === "age" ? <ConnectedAgeInput/> : <pre> </pre> : <ConnectedAgeInput/> }
                            {/* <input onMouseEnter={ghosttext} onChange={ageinputhandler} id="age" type="text"  ></input> */}
                        </form>
                        { INPUT_FOCUS ? <ConnectedSignupLoginChecker loginstate={INPUT_FOCUS} /> : <pre> </pre> }
                        </>
                        :
                        <pre></pre>
                    }
                    {
                        DISPLAY_FORM === "signup"
                        // id          Int @id @default(autoincrement())
                        // id="username"     String?
                        // value="username" id="email"        String?
                        // id= value="email""password"     String?
                        // id="a value="password"ge"          Int?
                        // settings  value="age"   settings[]
                        // data        data[]
                        ?
                        <form onMouseEnter={formhover}>
                            <input onMouseEnter={ghosttext} onChange={usernameinputhandler} id="username" type="text"></input>
                            <input onMouseEnter={ghosttext} onChange={passwordinputhandler} id="password" type="text"></input>
                            <button> forgot password? possible empty cup lol </button>
                        </form>
                        :
                        <pre></pre>
                    }
                </div>
                
                <div
    style = {{ backgroundImage: `url('water_img/bluegoogle.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '50px', width: '50px', border: '5px solid #dedede73', zIndex: '2', transform: LOGIN_SIGNUP_BTN ? 'scale(0.25)' : 'none' }}
                className="google-container">
                    {/* <h1> blue text </h1> */}
                <GoogleLogin
                className="Google-Button"
                clientId={'569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com'}
                onSuccess={onSuccess}
                onFailure={onFailure}
                isSignedIn={true}
                cookiePolicy={'single_host_origin'}
                buttonText=""
                >
                </GoogleLogin>
                </div>

                </div>
        )
    // }

    // return ( renderLoginOutGoogle() )

    
}


const mapStateToProps = (state:any) => ({
    LOGIN_SIGNUP_BTN: state.LOGIN_SIGNUP_BTN,
    DISPLAY_FORM: state.DISPLAY_FORM,
    PASSWORD: state.PASSWORD,
    INPUT_FOCUS: state.INPUT_FOCUS
})

const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_LOGIN_SIGNUP_BTN: () => dispatch(TOGGLE_LOGIN_SIGNUP_BTN()),
    TOGGLE_SHOW_FORM: (action:any) => dispatch(TOGGLE_SHOW_FORM(action)),
    SET_PASSWORD: (action:any) => dispatch(SET_PASSWORD_INPUT(action)),

    // TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS()),
})

const ConnectedLoginOutGoogle = connect(mapStateToProps, mapDispatchToProps)(LogInOutGoogle)

// const ConnectedLoginOutGoogle = connect(mapStateToProps, mapDispatchToProps)(LogInOutGoogle)

export default ConnectedLoginOutGoogle;     // <Route path={'/loginoutgoogle'} element={ <ConnectedLogInOutGoogle/> } /> route looks like this! not <LogInOutGoogle>
