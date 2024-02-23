import React from 'react';
import './Sup.scss'
import qr from '../../assets/img/qr.png'
import { FaFacebookMessenger } from "react-icons/fa";
import { FormattedMessage } from 'react-intl'

import MessengerCustomerChat from 'react-messenger-customer-chat';


const Sup = (props) => {
    return (
        <>
            <div className='text-center mt-2'>
                <FormattedMessage id='support.qr' />
            </div>
            <div className='text-center mt-0'>
                <img alt='img-logo-element' className='' src={qr} />
            </div>
            <MessengerCustomerChat pageId={process.env.REACT_APP_FACEBOOK_PAGE_ID} appId={process.env.REACT_APP_FACEBOOK_APP_ID} />
        </>
    );
}

export default Sup;