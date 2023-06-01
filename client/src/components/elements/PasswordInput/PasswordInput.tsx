import React from 'react'
import './password.css'
import {connect, useDispatch} from 'react-redux'
import $ from 'jquery'
import attributeJQ from '../../../utility/attributeJQ'

import {SET_PASSWORD} from '../../../redux/actions'

 
function PasswordInput (props:any) {

    const { PASSWORD, SET_PASSWORD } = props

    const ghosttext = (event:any) => {
        let target:any = event.target
        let jqtarget:any = $(event.target)
        let targetId:string = event.target.id       
        if (targetId === 'password') {
            attributeJQ(target, 'value', PASSWORD)
        } else {
            attributeJQ(target, 'value', targetId)         // $(event.target).attr('value', targetId)
        }
        // modular function arguments:                  1: target $(event.target)   2: 'value' <input value={}/>        3: targetId: ['username', 'password',]
    }

    const passwordinputhandler = (event:any) => {
        let value:string = event.target.value
        let hashedValue = '*'.repeat(value.length)
        // let hashedValue = "*".repeat(value.length)
        $(event.target).attr('value', hashedValue)
        SET_PASSWORD({payload: hashedValue})
    }

    const renderPasswordInput = () => {
        return (
<input style={{ color: '#72d3fe', fontSize: '28px'}} value={PASSWORD} onMouseEnter={ghosttext} onChange={passwordinputhandler} id="password" type="text"></input> 
        )
    }

    return <div className="PasswordInput-Container"> {renderPasswordInput()} </div>
    
}

const mapStateToProps = (state:any) => ({
    PASSWORD: state.PASSWORD
})

const mapDispatchToProps = (dispatch:any) => ({
    SET_PASSWORD: (action:any) => dispatch(SET_PASSWORD(action))
})

const ConnectedPasswordInput = connect(mapStateToProps, mapDispatchToProps)(PasswordInput)

export default ConnectedPasswordInput
