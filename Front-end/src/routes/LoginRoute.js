import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function LoginRoute(props) {
    let isAuthenticated = useSelector(state => state.userRedux.isAuthenticated)
    let account = useSelector(state => state.userRedux.token)
    if (isAuthenticated === true && account) {
        return (
            <Redirect to='/admin'></Redirect>
        )
    } else {
        return <Route path={props.path} component={props.component} />
    }
}

export default LoginRoute