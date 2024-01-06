import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


function PrivateRoutes(props) {
    let isAuthenticated = useSelector(state => state.userRedux.isAuthenticated)
    let account = useSelector(state => state.userRedux.token)
    if (isAuthenticated === true) {
        return (
            <Route path={props.path} component={props.component} />
        )
    } else {
        return <Redirect to='/login'></Redirect>
    }
}

export default PrivateRoutes