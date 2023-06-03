import React from 'react'
import "./password.css"
import {connect, useDispatch} from 'react-redux'
import {useState} from 'react'
import $ from 'jquery'
import attributeJQ from '../../../utility/attributeJQ'
import ghostText from '../../../utility/ghostText'
import inputHandler from '../../../utility/inputHandler'
import inputFocusToggleRedux from '../../../utility/inputFocusToggleRedux'
import halfAssHash from '../../../utility/halfAssHash'

import ConnectedSignupLoginChecker from '../../../components/elements/SignupLoginChecker'

import {SET_PASSWORD_INPUT, SET_DUMMY_PASSWORD_INPUT, TOGGLE_INPUT_FOCUS} from '../../../redux/actions'

function PasswordInput (props:any) {

    const [dummyPassword, setDummyPassword] = useState('')
    const [inputFocus, setInputFocus] = useState(false)
    //  function UsernameInput (props:any) {

    let { 
         TOGGLE_INPUT_FOCUS, PASSWORD_INPUT, DUMMY_PASSWORD_INPUT,
         SET_PASSWORD_INPUT, SET_DUMMY_PASSWORD_INPUT
        } = props;

        // const {USERNAME_INPUT, SET_USERNAME_INPUT} = props

        const inputhandlerCB = (inputHandlerObj: any) => {
            console.log('inputHandlerObj')
            console.log(inputHandlerObj)
            // let value: string = inputHandlerObj.target.value;
            setDummyPassword(inputHandlerObj.target.value)    

            console.log('inputhandlerCB FUNCTION');
            console.log('dummyPassword')
            console.log(dummyPassword)
          };

          
          const passwordinputhandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            // Access event properties here
          };
          
          const passwordinputhandler2 = (event: React.ChangeEvent<HTMLInputElement>) => {
            // Access event properties here
          };

          const passwordinputhandler3 = () => {            
            let preinput = $('#password')
            // $('#password')[0].attributes[2].nodeValue
            let inputelem = preinput
            let elemValue:string|undefined|null = preinput[0].attributes[2].nodeValue
            console.log('inputelem')
            console.log(inputelem)

            console.log('elemValue')
            console.log(elemValue)
            // let elemValue:string = inputelem

            // SET_PASSWORD_INPUT({payload: onChangeValue})           
          }

        //   const prepasswordinputhandler = (event:any) => {
        //         setDummyPassword(event.target.value)
        //         let eventValueLength:number = event.target.value.length
        //         console.log('event.target.value')
        //         const clone_1 = {...event}
        //         const clone_2 = {...event} 
        //         let clone2value:string = clone_2.target.value    
        //         console.log('clone2value')
        //         console.log(clone2value)

        //         // let hashedCharacter = halfAssHash("*", clone_1.target.value)
        //         // console.log('hashedCharacter')
        //         // console.log(hashedCharacter)
        //         SET_PASSWORD_INPUT({payload: clone_1.target.value })
        //         SET_DUMMY_PASSWORD_INPUT({ payload: clone_2.target.value })
        //         // SET_DUMMY_PASSWORD_INPUT({payload: "*".repeat(clone2value.length)})
        //         console.log('PASSWORD_INPUT')
        //         console.log(PASSWORD_INPUT)                                 
        //   }
          

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
<input id="password" type="text" style={{ color: '#72d3fe', fontSize: '20px'}} onFocus={inputfocus} value={DUMMY_PASSWORD_INPUT} onMouseEnter={ghosttext}
// onChange={prepasswordinputhandler} 
onChange={(event) => {
    passwordinputhandler(event);
    passwordinputhandler2(event);
}}>

</input> 
<p style={{ textAlign: 'center' }}> "PASSWORD_INPUT": {PASSWORD_INPUT || 'no pw'} </p>
<p style={{ textAlign: 'center' }}> "dummyPassword " {dummyPassword || 'no pw' } </p>
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
