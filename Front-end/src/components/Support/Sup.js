import React from 'react';
import './Sup.scss'
import qr from '../../assets/img/qr.png'
import { FaFacebookMessenger } from "react-icons/fa";
import { FormattedMessage } from 'react-intl'

const Sup = (props) => {
    return (
        <>
            <div className='text-center mt-2'>
                <FormattedMessage id='support.qr' />
            </div>
            <div className='text-center mt-0'>
                <img className='' src={qr} />
            </div>
            <div className='fixed-bottom mb-4 me-4 text-end'>
                <div className='messenger-icon-wrapper' style={{cursor: 'pointer'}}>
                    <FaFacebookMessenger size={40} color='white'/>
                </div>
            </div>
        </>
    );
}

export default Sup;