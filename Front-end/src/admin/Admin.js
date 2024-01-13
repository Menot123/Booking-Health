import React from 'react'
import './Admin.scss'
import Header from './components/Header/Header'
import ManageUser from './components/ManageUser/ManageUser'


function Admin() {
    return (
        <>
            <Header />
            <ManageUser />
        </>
    )
}

export default Admin