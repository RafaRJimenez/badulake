// será el encargado de gestionar el onlogin para que se ejecute el login
// cuando cargamos loginformcontainer lo que estamos cargando es el loginform conectado


import React from 'react'

import { connect } from 'react-redux'
import { httpRequest } from '../../redux/actions'
import LoginForm from '../LoginForm'

const mapStateToProps = (state) => {
    return {
        loged: state.userState.loged,
        fetching: state.userState.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) => {
            const data = {
                email: email,
                password: password
            }
                const url = "https://reqres.in/api/login"
                dispatch(httpRequest("post",url, data))
        }
    }
}

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm)

export default LoginFormContainer

//eve.holt@reqres.in