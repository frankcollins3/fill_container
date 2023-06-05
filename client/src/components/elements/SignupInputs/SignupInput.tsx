import {connect, useDispatch} from 'react-redux'
import React from 'react'
import "./signupinput.css"

// utility functions
import inputHandler from '../../../utility/inputHandler'
import attributeJQ from '../../../utility/attributeJQ'

// redux acitons
import { SET_USERNAME_INPUT, SET_EMAIL_INPUT, SET_PASSWORD_INPUT, SET_AGE_INPUT } from '../../../redux/actions'

interface Props {
    inputType: string,
    USERNAME_INPUT: string,
    PASSWORD_INPUT: string,
    EMAIL_INPUT: string,
    AGE_INPUT: string,
    SET_USERNAME_INPUT: any,
    SET_PASSWORD_INPUT: any,
    SET_EMAIL_INPUT: any,
    SET_AGE_INPUT: any
}

function SignupInput (props: Props) {
    const dispatch = useDispatch()

    // let inputType:string = props.inputType

    const { 
        SET_USERNAME_INPUT, SET_PASSWORD_INPUT, SET_EMAIL_INPUT, SET_AGE_INPUT,
        inputType, USERNAME_INPUT, PASSWORD_INPUT, EMAIL_INPUT, AGE_INPUT
     } = props

    console.log('props from SignupInput')
    console.log(props)

    // inputHandler(event, SET_AGE_INPUT)

    const inputOnChange = (event:any) => {
        console.log('event from usernameinputhandler')
        console.log(event)
        if (inputType === 'username') {            
            inputHandler(event, SET_USERNAME_INPUT)
        }
        if (inputType === 'email') {
            inputHandler(event, SET_EMAIL_INPUT)
        }
        if (inputType === 'age') {
            inputHandler(event, SET_AGE_INPUT)
        }
        if (inputType === 'pasword') {
            inputHandler(event, SET_AGE_INPUT)
        }
    }

    const ageinputhandler = (event:any) => {
        console.log('event from usernameinputhandler')
        console.log(event)
        inputHandler(event, SET_AGE_INPUT)
    }

    // const ghosttext = (event:any) => {
    //     let target:any = event.target
    //     let jqtarget:any = $(event.target)
    //     let targetId:string = event.target.id       
    //     if (targetId === 'password') {        
    //     } else {
    //         attributeJQ(target, 'value', targetId)         
    //     }
    // }

    const ghostText = (event:any) => attributeJQ(event.target, 'value', event.target.id)
        

        const RenderSignupInput = () => {
            return (
                <>
             <input
            //   value={inputType}
              id={inputType}
              value={ inputType === "username" ? USERNAME_INPUT : inputType === "email" ? EMAIL_INPUT : inputType === 'password' ? PASSWORD_INPUT : inputType === "age" ? AGE_INPUT : "text" }
            //   type={inputType === 'password' ? "password" : inputType}
              onChange={inputOnChange}
              onMouseEnter={ghostText}
              //   onFocus={inputfocus}
            //   onChange={ageinputhandler}
            />
                </>                
            )
        }

         return <div className="SignupInput-Container"> {RenderSignupInput()} </div>

}


const mapStateToProps = (state:any) => ({
        USERNAME_INPUT: state.USERNAME_INPUT,
        PASSWORD_INPUT: state.PASSWORD_INPUT,
        EMAIL_INPUT: state.EMAIL_INPUT,
        AGE_INPUT: state.AGE_INPUT
})

// TEST_STATE: state.TEST_STATE   

const mapDispatchToProps = (dispatch:any) => ({
        SET_USERNAME_INPUT: (action:any) => dispatch(SET_USERNAME_INPUT(action)),
        SET_PASSWORD_INPUT: (action:any) => dispatch(SET_PASSWORD_INPUT(action)),
        SET_EMAIL_INPUT: (action:any) => dispatch(SET_EMAIL_INPUT(action)),
        SET_AGE_INPUT: (action:any) => dispatch(SET_AGE_INPUT(action)),
})

// cannot find name TOGGLE_TEST_STATE have to create it and link /redux/actions path up.

const ConnectedSignupInput = connect(mapStateToProps, mapDispatchToProps)(SignupInput)

export default ConnectedSignupInput