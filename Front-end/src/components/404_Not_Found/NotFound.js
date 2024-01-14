import React from 'react'
import './NotFound.scss'
import { FormattedMessage } from 'react-intl'
import { IoHome } from "react-icons/io5";
import { useHistory } from 'react-router-dom'

function NotFound() {

    let history = useHistory()

    const handleBackToHome = () => {
        history.push('/home')
    }

    return (
        <div className='container-404 d-flex justify-content-center align-items-center'>
            <span className='opp me-1'><FormattedMessage id='homepage.404-opps' /></span>
            <FormattedMessage id='homepage.404-not-found' />
            <button className='btn btn-outline-secondary ms-3 btn-back-home' onClick={() => handleBackToHome()}><IoHome /><FormattedMessage id='homepage.404-go-home' /></button>
        </div>
    )
}

export default NotFound