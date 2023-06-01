import React from 'react'
import "./emailinput.css"
import {connect, useDispatch} from 'react-redux'
import $ from 'jquery'
import attributeJQ from '../../../utility/attributeJQ'
import ghostText from '../../../utility/ghostText'
import inputHandler from '../../../utility/inputHandler'

import {SET_AGE_INPUT} from '../../../redux/actions'

function AgeInput (props:any) {

const {AGE_INPUT, SET_AGE_INPUT} = props

const ageinputhandler = (event:any) => {        
        inputHandler(event, SET_AGE_INPUT)
    }

    const ghosttext = (event:any) => {
        let target:any = event.target
        let jqtarget:any = $(event.target)
        let targetId:string = event.target.id       
        attributeJQ(target, 'value', targetId)         // $(event.target).attr('value', targetId)        
    }

    const renderEmailInput = () => {
        return (
        <input value={AGE_INPUT} onMouseEnter={ghosttext} onChange={ageinputhandler} id="age" type="text"></input> 
        )
    }

    return (<div className="EmailInput-Container">{renderEmailInput()} </div>)

}

const mapStateToProps = (state:any) => ({
    AGE_INPUT: state.AGE_INPUT
})

const mapDispatchToProps =(dispatch:any) => ({
    SET_AGE_INPUT: (action:any) => dispatch(SET_AGE_INPUT(action))
})

const ConnectedEmailInput = connect(mapStateToProps, mapDispatchToProps)(AgeInput)

export default ConnectedEmailInput