import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Admin from '../admin/Admin'

function LoginRoute(props) {
    let isAuthenticated = useSelector(state => state.userRedux.isAuthenticated)
    let account = useSelector(state => state.userRedux.token)
    console.log(isAuthenticated)
    console.log(account)
    if (isAuthenticated === true && account) {
        return (
            <Redirect to='/admin'></Redirect>
        )
    } else {
        console.log('>>>> check 2')

        return <Route path={props.path} component={props.component} />
    }
}

export default LoginRoute