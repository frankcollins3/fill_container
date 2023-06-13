import "./logininput.css"
import { connect, useDispatch } from 'react-redux'
import { SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT } from '../../../redux/actions'
import React from 'react'

// EMAIL_OR_USERNAME_LOGIN_INPUT: 'test_email_pw',
//     PASSWORD_LOGIN_INPUT: 'testpw',

interface Props {
    inputType: string,
    EMAIL_OR_USERNAME_LOGIN_INPUT: string,
    PASSWORD_LOGIN_INPUT: string,

    SET_EMAIL_OR_USERNAME_LOGIN_INPUT: any
    SET_PASSWORD_LOGIN_INPUT: any
}

export default function LoginInput(props: Props) {
    const { 
        inputType, EMAIL_OR_USERNAME_LOGIN_INPUT, PASSWORD_LOGIN_INPUT,
        SET_EMAIL_OR_USERNAME_LOGIN_INPUT, SET_PASSWORD_LOGIN_INPUT,
    } = props

    const renderLoginInput = () => {
        return (
            <input type="text" value={inputType}/>
        )
    }

    return <div className="LoginInput-Container"></div>
}

const mapStateToProps = (state:any) => ({
    EMAIL_OR_USERNAME_LOGIN_INPUT: state.EMAIL_OR_USERNAME_LOGIN_INPUT,
    PASSWORD_LOGIN_INPUT: state.PASSWORD_LOGIN_INPUT,
})

const mapDispatchToProps = (dispatch:any) => ({
    SET_EMAIL_OR_USERNAME_LOGIN_INPUT: (action:any) => dispatch(SET_EMAIL_OR_USERNAME_LOGIN_INPUT(action)),
    SET_PASSWORD_LOGIN_INPUT: (action:any) => dispatch(SET_PASSWORD_LOGIN_INPUT(action))
})