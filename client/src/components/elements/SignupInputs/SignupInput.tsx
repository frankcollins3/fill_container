import {connect, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import React from 'react'
import "./signupinput.css"

// utility functions
import inputHandler from '../../../utility/inputHandler'
import attributeJQ from '../../../utility/attributeJQ'
import RegexBank from '../../../utility/RegexBank'

// redux acitons
import { SET_USERNAME_INPUT, SET_EMAIL_INPUT, SET_PASSWORD_INPUT, SET_AGE_INPUT, TOGGLE_INPUT_FOCUS, TOGGLE_PASSWORD_SHOW, TOGGLE_PASSWORD_SHOW_CLICK } from '../../../redux/actions'

interface Props {
    inputType: string,
    USERNAME_INPUT: string,
    PASSWORD_INPUT: string,
    PASSWORD_SHOW: boolean,
    PASSWORD_SHOW_CLICK: boolean,
    EMAIL_INPUT: string,
    AGE_INPUT: string,

    TOGGLE_INPUT_FOCUS: any
    SET_USERNAME_INPUT: any,
    SET_PASSWORD_INPUT: any,
    TOGGLE_PASSWORD_SHOW: any,
    TOGGLE_PASSWORD_SHOW_CLICK: any,
    SET_EMAIL_INPUT: any,
    SET_AGE_INPUT: any,
}

function SignupInput (props: Props) {

    const [passwordShowClick, setPasswordShowClick] = useState<boolean>(false)

    const dispatch = useDispatch()

    let RegexObject:any;
    let hoverTimer:any;
    let isHovered = false;

    useEffect( () => {
        (async() => {
            RegexObject = await RegexBank()                
        })()
    })


    // let inputType:string = props.inputType

const { inputType, USERNAME_INPUT, PASSWORD_INPUT, PASSWORD_SHOW, PASSWORD_SHOW_CLICK, EMAIL_INPUT, AGE_INPUT, SET_USERNAME_INPUT, 
    SET_PASSWORD_INPUT, SET_EMAIL_INPUT, SET_AGE_INPUT, TOGGLE_INPUT_FOCUS, TOGGLE_PASSWORD_SHOW, TOGGLE_PASSWORD_SHOW_CLICK } = props

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
        if (inputType === 'password') {
            let hasNums4 = RegexObject.hasNums.test(parseInt(PASSWORD_INPUT))        
            let target = event.target
            let value:any = target.value  // cant use string because we'll be looping over it     
            const statePromise = new Promise( (resolve, reject) => {
                resolve([ SET_PASSWORD_INPUT({payload: value}) ])
            })                 
            statePromise
            .then( () => {return})                                  
            .catch( (err) => console.log(err))
        }
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

    
    const inputfocus = async () => { TOGGLE_INPUT_FOCUS( { payload: inputType } ) }

    const showPassClick = () => {
        // setPasswordShowClick(true)    
        TOGGLE_PASSWORD_SHOW_CLICK()
    }
        
        const RenderSignupInput = () => {
            return (
                <>
             <input
              type={ inputType === "password" && PASSWORD_SHOW_CLICK === false ? "password" : "text"}
              spellCheck="false"
              id={inputType}
              value={ inputType === "username" ? USERNAME_INPUT : inputType === "email" ? EMAIL_INPUT : inputType === 'password' ? PASSWORD_INPUT: inputType === "age" ? AGE_INPUT : "text" }
            //   type={inputType === 'password' ? "password" : inputType}
              onChange={inputOnChange}
                onMouseEnter={ghostText}
            //   onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={ghostText}
              onFocus={inputfocus}
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
        AGE_INPUT: state.AGE_INPUT,    
        PASSWORD_SHOW: state.PASSWORD_SHOW,
        PASSWORD_SHOW_CLICK: state.PASSWORD_SHOW_CLICK
})

// TEST_STATE: state.TEST_STATE   

const mapDispatchToProps = (dispatch:any) => ({
        TOGGLE_INPUT_FOCUS: (action:any) => dispatch(TOGGLE_INPUT_FOCUS(action)),
        SET_USERNAME_INPUT: (action:any) => dispatch(SET_USERNAME_INPUT(action)),
        SET_PASSWORD_INPUT: (action:any) => dispatch(SET_PASSWORD_INPUT(action)),
        TOGGLE_PASSWORD_SHOW: () => dispatch(TOGGLE_PASSWORD_SHOW()),
        TOGGLE_PASSWORD_SHOW_CLICK: () => dispatch(TOGGLE_PASSWORD_SHOW_CLICK()),
        SET_EMAIL_INPUT: (action:any) => dispatch(SET_EMAIL_INPUT(action)),
        SET_AGE_INPUT: (action:any) => dispatch(SET_AGE_INPUT(action)),
})

// cannot find name TOGGLE_TEST_STATE have to create it and link /redux/actions path up.

const ConnectedSignupInput = connect(mapStateToProps, mapDispatchToProps)(SignupInput)

export default ConnectedSignupInput
