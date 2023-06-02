import React from 'react'
import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import "./signuploginchecker.css"
import allDBurl from  "../../../utility/fetch/allDBurl"
import RegexBank from "../../../utility/RegexBank"

  interface Props {
    loginstate: string,
    USERNAME_INPUT: string,
    PASSWORD_INPUT: string,
    EMAIL_INPUT: string,
    AGE_INPUT: string,
    // ALL_USERS: any,
    ALL_USERNAMES: any // I think one needs an :any type to have access to [array-based-indexing] even with the variable type to be specified as array
  }

  function SignupLoginChecker(props:any) {

    const { 
        USERNAME_INPUT, PASSWORD_INPUT, EMAIL_INPUT, AGE_INPUT, ALL_USERS, ALL_USERNAMES, ALL_EMAILS,
        loginstate    
    } = props

    let usernameLength:number = USERNAME_INPUT.length
    let RegexMenu;

    useEffect( () => {
        ( () => {
            RegexMenu = RegexBank
        })()      
    }, [])

    const RenderSignupLoginChecker = () => {
        if (loginstate === 'username') {            
            return (
                <div className="Checker-Container">
                    <div className="column">
                    {/* <img className="Checker-Droplet" src={ALL_USERNAMES.map( (username:any, index:number) => username !== USERNAME_INPUT ) ? "/water_img/bg.png" : "water_img/mouse_droplet.png"}/> */}
                    <img className="Checker-Droplet" src={ALL_USERNAMES.includes(USERNAME_INPUT) ? "/water_img/bg.png" : "water_img/mouse_droplet.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/bg.png"/> */}
                    <p style={{ color: '#686868' }}> unique </p>
                    </div>
                    <div className="column">
                    <img className="Checker-Droplet" src={usernameLength > 6 && usernameLength < 30 ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: usernameLength > 6 && usernameLength < 30 ? "#73defe" : "#686868" }}> length </p>
                    </div>                    
                </div>
            )
        }
        if (loginstate === 'email') {

            (async () => {
                // RegexMenu = await RegexBank(EMAIL_INPUT, "stringAfterPeriod")
                console.log('EMAIL_INPUT')
                console.log(EMAIL_INPUT)
                let stringAfterPeriod = await RegexBank(EMAIL_INPUT, "stringAfterPeriod")
                console.log('stringAfterPeriod')
                console.log(stringAfterPeriod)                                
            })()

            return (
                // <p style={{ fontSize: '8px', textAlign: 'center' }}> hi </p>
                <div className="Checker-Container">                
                    <div className="column">
                    <img className="Checker-Droplet" src={ EMAIL_INPUT.includes('@') ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: EMAIL_INPUT.includes('@') ? "#73defe" : "#686868" }}> @ </p>
                    </div>                    
                    <div className="column">
<img className="Checker-Droplet" src={ 
    EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "com" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "net" || EMAIL_INPUT.replace(/^.*\.(.*)$/, '$1') === "org"
 ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: EMAIL_INPUT.includes('.com') || EMAIL_INPUT.includes('.net') || EMAIL_INPUT.includes('.org') ? "#73defe" : "#686868" }}> .com </p>
                    </div>
                </div>
            )
        }
        if (loginstate === 'password') {
            (async() => {

            })()
            return (
                // <p style={{ fontSize: '8px', textAlign: 'center' }}> hi </p>
                <div className="Checker-Container">
                    <div className="column">
                    <img className="Checker-Droplet" src="/water_img/bg.png"/>
                    {/* <img className="Checker-Droplet" src="/water_img/bg.png"/> */}
                    <p style={{ color: '#686868' }}> special </p>
                    </div>
                    <div className="column">
                    <img className="Checker-Droplet" src={usernameLength > 6 && usernameLength < 30 ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: usernameLength > 6 && usernameLength < 30 ? "#73defe" : "#686868" }}> number </p>
                    </div>
                    <div className="column">
                    <img className="Checker-Droplet" src={usernameLength > 6 && usernameLength < 30 ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: usernameLength > 6 && usernameLength < 30 ? "#73defe" : "#686868" }}> CAPS </p>
                    </div>
                    
                </div>
            )
        }
        if (loginstate === 'age') {
            return (
                // <p style={{ fontSize: '8px', textAlign: 'center' }}> hi </p>
                <div className="Checker-Container">                
                    <div className="column">
                    <img className="Checker-Droplet" src={ AGE_INPUT > 10 ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: AGE_INPUT > 10 ? "#73defe" : "#686868" }}> age </p>
                    </div>
                </div>
            )
        }
        return (
            <p style={{ fontSize: '8px', textAlign: 'center' }}> hey well thats really funny </p>
        )
    }

    return <div className="SignupLoginChecker-Container"> {RenderSignupLoginChecker()} </div>
}

const mapStateToProps = (state:any) => ({
    USERNAME_INPUT: state.USERNAME_INPUT,
    PASSWORD_INPUT: state.PASSWORD_INPUT,
    EMAIL_INPUT: state.EMAIL_INPUT,
    AGE_INPUT: state.AGE_INPUT,
    ALL_USERS: state.ALL_USERS,
    ALL_USERNAMES: state.ALL_USERNAMES,
    ALL_EMAILS: state.ALL_EMAILS
})

const ConnectedSignupLoginChecker = connect(mapStateToProps)(SignupLoginChecker)
 
export default ConnectedSignupLoginChecker
