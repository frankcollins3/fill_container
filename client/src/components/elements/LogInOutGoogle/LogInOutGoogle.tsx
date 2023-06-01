import React from "react"
import "./LoginOutGoogle.css" 
// import  "./LogInOutGoogle.module.scss"
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {gapi} from 'gapi-script'
import {useState, useEffect} from 'react'
import allDBurl from '../../../utility/fetch/allDBurl'
import { connect, useDispatch } from 'react-redux'
import { TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_SHOW_FORM } from '../../../redux/actions'
// client/src/components/elements/LogInOutGoogle/LogInOutGoogle.module.scss // relative path for import above 


 function LogInOutGoogle ( props:any ) {

    const { 
        LOGIN_SIGNUP_BTN, DISPLAY_FORM,
        TOGGLE_LOGIN_SIGNUP_BTN, TOGGLE_SHOW_FORM } = props
          

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
        TOGGLE_LOGIN_SIGNUP_BTN()        
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
        TOGGLE_SHOW_FORM({payload: targetid})
    }

        // const renderLoginOutGoogle = () => {

            return (
                <div className="login-container">
                <img onClick={showHideLoginSignupBtn} style={{ border: 'none' }} src="/water_img/hand.png"/>                
                {/* // clientId: clientId || '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com', */}            

                <div style={{ 
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', 
                    height: '200px', width: '200px', marginTop: '1em'                    
                }}>
                    {
                        LOGIN_SIGNUP_BTN 
                        ?                        
                        <>                            
                            <button onClick={showform} id="login" className="Login-Signup-Btn">{DISPLAY_FORM}</button>
                            <button onClick={showform} id="signup" className="Login-Signup-Btn">bootie</button>                            
                        </>
                        :
                        <pre></pre>   
                    }
                    {
                        DISPLAY_FORM === "login" || DISPLAY_FORM === "signup"
                        ?
                        <>
                        <button onClick={showform} id="login" className="Login-Signup-Btn">{DISPLAY_FORM}</button>
                        <button onClick={showform} id="signup" className="Login-Signup-Btn">bootie</button>
                        </>
                        :
                        <pre></pre>
                    }
                </div>
                
                <div
                style = {{                     
                    backgroundImage: `url('water_img/bluegoogle.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', 
                    height: '50px', width: '50px', border: '5px solid #dedede73', zIndex: '2',
                    transform: LOGIN_SIGNUP_BTN ? 'scale(0.25)' : 'none'

                }}
                
                
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
    DISPLAY_FORM: state.DISPLAY_FORM
})

const mapDispatchToProps = (dispatch:any) => ({
    TOGGLE_LOGIN_SIGNUP_BTN: () => dispatch(TOGGLE_LOGIN_SIGNUP_BTN()),
    TOGGLE_SHOW_FORM: (action:any) => dispatch(TOGGLE_SHOW_FORM(action))
    // TOGGLE_HYDRO_SETTINGS: () => dispatch(TOGGLE_HYDRO_SETTINGS()),
})

const ConnectedLoginOutGoogle = connect(mapStateToProps, mapDispatchToProps)(LogInOutGoogle)

// const ConnectedLoginOutGoogle = connect(mapStateToProps, mapDispatchToProps)(LogInOutGoogle)

export default ConnectedLoginOutGoogle;     // <Route path={'/loginoutgoogle'} element={ <ConnectedLogInOutGoogle/> } /> route looks like this! not <LogInOutGoogle>
