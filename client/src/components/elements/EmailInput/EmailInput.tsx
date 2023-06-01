import React from 'react'
import "./usernameinput.css"
import {connect, useDispatch} from 'react-redux'
import $ from 'jquery'
import attributeJQ from '../../../utility/attributeJQ'
import ghostText from '../../../utility/ghostText'
import inputHandler from '../../../utility/inputHandler'

import {SET_EMAIL_INPUT} from '../../../redux/actions'


 function EmailInput (props:any) {
    
    const {USERNAME_INPUT, SET_USERNAME_INPUT} = props
    
    const emailinputhandler = (event:any) => {
        console.log('event from emailinputhandler')
        console.log(event)
        inputHandler(event, SET_EMAIL_INPUT)
    }

    const ghosttext = (event:any) => {
        let target:any = event.target
        let jqtarget:any = $(event.target)
        let targetId:string = event.target.id       
        attributeJQ(target, 'value', targetId)         // $(event.target).attr('value', targetId)
        
    }

    const renderUsernameInput = () => {
        return (
        <input value={USERNAME_INPUT} onMouseEnter={ghosttext} onChange={emailinputhandler} id="username" type="text"></input> 
        )
    }

    return (<div className="UsernameInput-container">{renderUsernameInput()} </div>)

}

const mapStateToProps = (state:any) => ({
    EMAIL_INPUT: state.EMAIL_INPUT
})

const mapDispatchToProps =(dispatch:any) => ({
    SET_USERNAME_INPUT: (action:any) => dispatch(SET_EMAIL_INPUT(action))
})

const ConnectedEmailInput = connect(mapStateToProps, mapDispatchToProps)(EmailInput)

export default ConnectedEmailInput