import React from 'react'
import './VerifyBooking.scss'
import { useLocation } from 'react-router-dom';
import { verifyBooking } from '../../../services/userService'
import { useState, useEffect } from 'react'
import Loader from '../../../admin/components/Loader/Loader'
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl'


function VerifyBooking(props) {
    const location = useLocation();
    const [verify, setVerify] = useState(false)
    const [status, setStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const language = useSelector(state => state.userRedux.currentLang)

    useEffect(() => {
        let isMounted = true;

        if (location.search) {
            const searchParams = new URLSearchParams(location.search);
            const token = searchParams.get('token');
            const idDoctor = searchParams.get('doctorId');

            const postVerify = async (dataSend) => {
                if (isMounted) {
                    let res = await verifyBooking(dataSend)
                    setIsLoading(false)
                    if (res.EC === 0) {
                        setVerify(true)
                        setStatus(true)
                    }
                }
            }

            if (token && idDoctor) {
                let dataSend = { token: token, idDoctor: idDoctor }
                postVerify(dataSend)
            }
        }

        return () => {
            isMounted = false; // Đánh dấu thành phần đã bị hủy khi useEffect được gọi lần tiếp theo
        };
    }, [])




    return (
        <>
            {isLoading ?
                <Loader loading={isLoading} />
                :
                status && verify ?
                    <div className='message-status-booking success'><FormattedMessage
                        id='verify-booking.status-success'>
                    </FormattedMessage></div>
                    :
                    <div className='message-status-booking failed'><FormattedMessage
                        id='verify-booking.status-failed'>
                    </FormattedMessage></div>

            }
        </>
    )
}

export default VerifyBooking