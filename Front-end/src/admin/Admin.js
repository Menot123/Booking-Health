import React from 'react'
import './Admin.scss'
import Header from './components/Header/Header'
import CRUD_users from './components/CRUD_users/CRUD_users'
import { useSelector, useDispatch } from 'react-redux'


function Admin() {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.userRedux.isAuthenticated)
    console.log(isAuthenticated)
    return (
        <>
            <Header />
            <CRUD_users />
        </>
    )
}

export default Admin