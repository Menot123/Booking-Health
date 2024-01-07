import React from 'react'
import './Admin.scss'
import Header from './components/Header/Header'
import CRUD_users from './components/CRUD_users/CRUD_users'


function Admin() {
    return (
        <>
            <Header />
            <CRUD_users />
        </>
    )
}

export default Admin