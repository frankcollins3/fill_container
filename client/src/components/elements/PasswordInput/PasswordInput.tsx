import React from 'react'
import "./password.css"
import {connect, useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import $ from 'jquery'
import attributeJQ from '../../../utility/attributeJQ'
import ghostText from '../../../utility/ghostText'
import inputHandler from '../../../utility/inputHandler'
import inputFocusToggleRedux from '../../../utility/inputFocusToggleRedux'
import halfAssHash from '../../../utility/halfAssHash'
import duplicateString from '../../../utility/duplicateString'


import ConnectedSignupLoginChecker from '../../../components/elements/SignupLoginChecker'

import {SET_PASSWORD_INPUT, SET_DUMMY_PASSWORD_INPUT, TOGGLE_INPUT_FOCUS} from '../../../redux/actions'

function PasswordInput (props:any) {

     const [passwordState, setPasswordState] = useState("")
     const [dummyState, setDummyState] = useState("")
     const [inputState, setInputState] = useState<any>()

    let { 
         TOGGLE_INPUT_FOCUS, PASSWORD_INPUT, DUMMY_PASSWORD_INPUT,
         SET_PASSWORD_INPUT, SET_DUMMY_PASSWORD_INPUT
        } = props;

        // const {USERNAME_INPUT, SET_USERNAME_INPUT} = props

        useEffect( () => {
            setDummyState("*".repeat(dummyState.length))
        }, [dummyState])
        
        const passwordinputhandler = async (evt: React.ChangeEvent<HTMLInputElement>) => {
            let target = evt.target
            let value:any = evt.target.value  // cant use string because we'll be looping over it 
            
            for (const char of value) {                
                let c = value[char]
                setInputState([inputState, c])
            }
            // let duplicateValue:string = await duplicateString(evt.target.value)
            // let value;
            // let dummyArray = [duplicateValue, value]
            // value = dummyArray[0]
            // console.log('duplicateValue')
            // console.log(duplicateValue)
            // SET_PASSWORD_INPUT( {payload: evt.target.value })
        };
        
        const passwordinputhandler2 = async (event: React.ChangeEvent<HTMLInputElement>) => {

                // let value:string = event.target.value.toUpperCase()
                // console.log('PASSWORD_INPUT')
                // console.log(PASSWORD_INPUT)

                // console.log('DUMMY_PASSWORD_INPUT')
                // console.log(DUMMY_PASSWORD_INPUT)
            
                // const uniqueChars = new Set(dummyState.split(''));
                // uniqueChars.add(value);
                // setDummyState(value);
            //   SET_DUMMY_PASSWORD_INPUT({payload: value })
          };


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
        <>
<input id="password" type="text" style={{ color: '#72d3fe', fontSize: '20px'}} onFocus={inputfocus} value={inputState} onMouseEnter={ghosttext} // "*".repeat(DUMMY_PASSWORD_INPUT.length)
// <input id="password" type="text" style={{ color: '#72d3fe', fontSize: '20px'}} onFocus={inputfocus} value={DUMMY_PASSWORD_INPUT} onMouseEnter={ghosttext} // "*".repeat(DUMMY_PASSWORD_INPUT.length)
onChange={(event) => {
    passwordinputhandler(event);
    passwordinputhandler2(event);
}}>

</input> 
<p style={{ textAlign: 'center' }}> : {PASSWORD_INPUT || 'no pw'} </p>
    </>
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

const ConnectedUsernameInput = connect(mapStateToProps, mapDispatchToProps)(PasswordInput)

export default ConnectedUsernameInput
