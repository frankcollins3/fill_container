import React from 'react'
import "./password.css"
import {connect, useDispatch} from 'react-redux'
import $ from 'jquery'
import attributeJQ from '../../../utility/attributeJQ'
import ghostText from '../../../utility/ghostText'
import inputHandler from '../../../utility/inputHandler'
import inputFocusToggleRedux from '../../../utility/inputFocusToggleRedux'

import ConnectedSignupLoginChecker from '../../../components/elements/SignupLoginChecker'

import {SET_PASSWORD_INPUT, SET_DUMMY_PASSWORD_INPUT, TOGGLE_INPUT_FOCUS} from '../../../redux/actions'

function AgeInput (props:any) {
    //  function UsernameInput (props:any) {

    let { 
         TOGGLE_INPUT_FOCUS, PASSWORD_INPUT, DUMMY_PASSWORD_INPUT,
         SET_PASSWORD_INPUT, SET_DUMMY_PASSWORD_INPUT
        } = props;

        // const {USERNAME_INPUT, SET_USERNAME_INPUT} = props

        const inputhandlerCB = (inputHandlerObj: any) => {
            let value: string = inputHandlerObj.target.value;
            console.log('inputhandlerCB FUNCTION');
            console.log(value);
          };

          const passwordinputhandler = async (event:any) => {            
            let originalValue:string = event.target.value

            const clonedEvent = { ...event }
            let cloneValue:string = clonedEvent.target.value

            const PasswordPromise = new Promise( (resolve, reject) => {
                resolve(
                    SET_PASSWORD_INPUT({payload: cloneValue})
                )
                reject( console.log('SET_PASSWORD_INPUT failed!'))
            })

            PasswordPromise
            .then( () => {
                const DummyPasswordPromise = new Promise( (resolve, reject) => {
                    resolve(SET_DUMMY_PASSWORD_INPUT({payload: originalValue}))
                    reject(console.log("DUMMY_PASSWORD_REJECTED!"))
                })
                DummyPasswordPromise
                .then( () => {
                    console.log("if you're here you care.")
                    console.log('PASSWORD_INPUT in promise')
                    console.log(PASSWORD_INPUT)
                    console.log('DUMMY_PASSWORD_INPUT in promise')
                    console.log(DUMMY_PASSWORD_INPUT)
                })
            })
            
        }
          
        //   const passwordinputhandler = (event: any) => {
        //     const clonedEvent = { ...event }; // Make a copy of the event object
        //     inputhandlerCB(clonedEvent);
        //     let value: string = clonedEvent.target.value;
        //     let duplicate:string = value;
          
        //     let hashedValue: string = '*'.repeat(duplicate.length);
        //     SET_PASSWORD_INPUT({ payload: value });
          
        //     // Use jQuery to update the value of the input field with asterisks
        //     $(event.target).val(hashedValue);
          
        //     SET_DUMMY_PASSWORD_INPUT({ payload: hashedValue });
        //   };
          

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
    
    const inputfocus = async () => {
         SET_DUMMY_PASSWORD_INPUT( { payload: ''})
         TOGGLE_INPUT_FOCUS( { payload: 'password'} ) 
        }

                                                                                    
    const renderPasswordInput = () => {
        return (
<input style={{ color: '#72d3fe', fontSize: '20px'}} onFocus={inputfocus} value={DUMMY_PASSWORD_INPUT} onMouseEnter={ghosttext} onChange={passwordinputhandler} id="password" type="text"></input> 
        )
    }

    return (<div className="UsernameInput-container">{renderPasswordInput()} </div>)

}

const mapStateToProps = (state:any) => ({
    PASSWORD_INPUT: state.PASSWORD_INPUT,
    DUMMY_PASSWORD_INPUT: state.DUMMY_PASSWORD_INPUT,
    INPUT_FOCUS: state.INPUT_FOCUS,
    // ALL_USERS: state.ALL_USERS
})

const mapDispatchToProps =(dispatch:any) => ({
    SET_PASSWORD_INPUT: (action:any) => dispatch(SET_PASSWORD_INPUT(action)),
    SET_DUMMY_PASSWORD_INPUT: (action:any) => dispatch(SET_DUMMY_PASSWORD_INPUT(action)),
    TOGGLE_INPUT_FOCUS: (action:any) => dispatch(TOGGLE_INPUT_FOCUS(action))
})

const ConnectedUsernameInput = connect(mapStateToProps, mapDispatchToProps)(AgeInput)

export default ConnectedUsernameInput
