import React from 'react'
import {connect} from 'react-redux'
import "./signuploginchecker.css"
import allDBurl from  "../../../utility/fetch/allDBurl"

  interface Props {
    loginstate: string,
    USERNAME_INPUT: string,
    PASSWORD_INPUT: string,
    EMAIL_INPUT: string,
    AGE_INPUT: string
  }

  function SignupLoginChecker(props:any) {
    const { 
        USERNAME_INPUT, PASSWORD_INPUT, EMAIL_INPUT, AGE_INPUT,
        loginstate    
    } = props

    let usernameLength:number = USERNAME_INPUT.length

    const RenderSignupLoginChecker = () => {
        if (loginstate === 'username') {
            return (
                // <p style={{ fontSize: '8px', textAlign: 'center' }}> hi </p>
                <div className="Checker-Container">
                    <div className="column">
                    <img className="Checker-Droplet" src="/water_img/bg.png"/>
                    {/* <img className="Checker-Droplet" src="/water_img/bg.png"/> */}
                    <p style={{ color: '#686868' }}> unique </p>
                    </div>
                    <div className="column">
                    <img className="Checker-Droplet" src={usernameLength > 6 && usernameLength < 30 ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: usernameLength > 6 && usernameLength < 30 ? "#73defe" : "#686868" }}> length </p>
                    </div>
                    {/* <div className="column">
                    <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/>
                    </div> */}
                </div>
            )
        }
        if (loginstate === 'email') {
            return (
                // <p style={{ fontSize: '8px', textAlign: 'center' }}> hi </p>
                <div className="Checker-Container">                
                    <div className="column">
                    <img className="Checker-Droplet" src={ EMAIL_INPUT.includes('@') ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: EMAIL_INPUT.includes('@') ? "#73defe" : "#686868" }}> @ </p>
                    </div>
                    <div className="column">
                    <img className="Checker-Droplet" src={ EMAIL_INPUT.includes('@') ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: EMAIL_INPUT.includes('@') ? "#73defe" : "#686868" }}> unique </p>
                    </div>
                    <div className="column">
                    <img className="Checker-Droplet" src={ EMAIL_INPUT.includes('.com') ? "/water_img/mouse_droplet.png" : "/water_img/bg.png"}/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p style={{ color: EMAIL_INPUT.includes('.com') ? "#73defe" : "#686868" }}> .com </p>
                    </div>
                </div>
            )
        }
        if (loginstate === 'password') {
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
    AGE_INPUT: state.AGE_INPUT
})

const ConnectedSignupLoginChecker = connect(mapStateToProps)(SignupLoginChecker)
 
export default ConnectedSignupLoginChecker

