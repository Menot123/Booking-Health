import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function LoginRoute(props) {
    let isAuthenticated = useSelector(state => state.userRedux.isAuthenticated)
    let account = useSelector(state => state.userRedux.token)
    let roleUser = useSelector(state => state.userRedux.role)
    if (isAuthenticated === true && account && roleUser === 'R1') {
        return (
            <Redirect to='/admin'></Redirect>
        )
    } else if (isAuthenticated === true && account && roleUser === 'R2') {
        return (
            <Redirect to='/doctor/manage-schedules'></Redirect>
        )
    }
    else {
        return <Route path={props.path} component={props.component} />
    }
}

export default LoginRoute