import React from 'react'
import {connect} from 'react-redux'

  function SignupLoginChecker(loginstate:string, props:any) {
    const { 
        USERNAME_INPUT, PASSWORD_INPUT, EMAIL_INPUT, AGE_INPUT 
        
    } = props



    const RenderSignupLoginChecker = () => {
        if (loginstate === 'username') {
            return (
                <p> username </p>
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
    }

    return <div className="SignupLoginChecker-Container"> {RenderSignupLoginChecker()} </div>
}


const mapStateToProps = (state:any) => ({
    USERNAME_INPUT: state.USERNAME_INPUT,
    PASSWORD_INPUT: state.PASSWORD_INPUT,
    EMAIL_INPUT: state.EMAIL_INPUT,
    AGE_INPUT: state.AGE_INPUT
})

// const mapDispatchToProps = (dispatch:any) => ({

// })

const ConnectedSignupLoginChecker = connect(mapStateToProps)(SignupLoginChecker)
 
export default ConnectedSignupLoginChecker

