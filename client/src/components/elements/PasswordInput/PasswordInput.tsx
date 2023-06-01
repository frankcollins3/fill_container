import React from 'react'
import './Password.css'
import {connect, useDispatch} from 'react-redux'
 
function PasswordInput () {

    const renderPasswordInput = () => {
        return (
            <h1> hey guys </h1>
        )
    }

    return <div className="PasswordInput-Container"> {renderPasswordInput()} </div>
}

const mapStateToProps = (state:any) => {

}

const mapDispatchToProps = (dispatch:any) => {
    
}

const ConnectedPasswordInput = connect(mapStateToProps, mapDispatchToProps)(PasswordInput)

export default ConnectedPasswordInput