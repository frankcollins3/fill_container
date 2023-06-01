import React from "react"
import "./LoginOutGoogle.css" 
// import  "./LogInOutGoogle.module.scss"
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import {gapi} from 'gapi-script'
import {useState, useEffect} from 'react'
import allDBurl from '../../../utility/fetch/allDBurl'

// client/src/components/elements/LogInOutGoogle/LogInOutGoogle.module.scss // relative path for import above 


export default function LogInOutGoogle (user:any) {
    let urlbank;
    let api;
    let env;
    let clientId:any;
    let API;

    const onSuccess = (res:any) =>  { console.log(res.profileObj) }
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

    user = user.user
    // console.log(user.user.GOOGLE_ID)

    let InOutGoogleFunction:any;

        // if (!user) {            
        //     InOutGoogleFunction = () => { 
        //         console.log("logout functionality needed")
        //     }
        // } else {
        //     if (user.GOOGLE_ID) {
        //         InOutGoogleFunction = () => {
        //             console.log("user but no googleID but the user should be able to have a googleId and be able to reject google login")
        //         }
        //     } else {
        //         // login with user. 
        //         InOutGoogleFunction = () => {
        //             console.log("no google login")
        //         }
        //         // return { username: 'testuser', email: 'testemail', password: 'testpassword', age: 'testage' }
        //     }
        // }

        return (
            <div className="login-container">
                <img src="/water_img/hand.png"/>                
                {/* // clientId: clientId || '569586439008-leid88t18klfhoi2h193rc125aae533l.apps.googleusercontent.com', */}
                <div className="div-row">
                    
                {/* <img src="/water_img/bluegoogle.png"></img> */}
                {/* <div
                style={{ 
                    backgroundImage: `url('water_img/bluegoogle.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', 
                    height: '50px', width: '50px', border: '5px solid #dedede73',
                    zIndex: '2', margin: '1em'
             }}
                className="google-incognito-cont"
                >
                </div> */}

                <div
                style = {{                     
                backgroundImage: `url('water_img/bluegoogle.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', 
                height: '50px', width: '50px', border: '5px solid #dedede73', zIndex: '2'
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
                </div>
        )
}
