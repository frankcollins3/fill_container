import React from 'react'
import {connect} from 'react-redux'
import "./signuploginchecker.css"

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


    const RenderSignupLoginChecker = () => {
        if (loginstate === 'username') {
            return (
                // <p style={{ fontSize: '8px', textAlign: 'center' }}> hi </p>
                <div className="Checker-Container">
                    <div className="column">
                    <img className="Checker-Droplet" src="/water_img/bg.png"/>
                    <p> unique </p>
                    </div>
                    <div className="column">
                    <img className="Checker-Droplet" src="/water_img/bg.png"/>
                    {/* <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/> */}
                    <p> length </p>
                    </div>
                    {/* <div className="column">
                    <img className="Checker-Droplet" src="/water_img/mouse_droplet.png"/>
                    </div> */}
                </div>
            )
        }
        if (loginstate === 'email') {
            return (
                <p> email </p>
            )
        }
        if (loginstate === 'password') {
            return (
                <p> password </p>
            )
        }
        if (loginstate === 'age') {
            return (
                <p> age </p>
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

