import React from 'react'
import './VerifyBooking.scss'
import { useLocation } from 'react-router-dom';
import { cancelBooking } from '../../../services/userService'
import { useState, useEffect } from 'react'
import Loader from '../../../admin/components/Loader/Loader'
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl'


function CancelBooking(props) {
    const location = useLocation();
    const [verify, setVerify] = useState(false)
    const [status, setStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const language = useSelector(state => state.userRedux.currentLang)

    useEffect(() => {
        let isMounted = true;

        if (location.search) {
            const searchParams = new URLSearchParams(location.search);
            const bookingId = searchParams.get('bookingId');

            const postCancelBooking = async (dataSend) => {
                if (isMounted) {
                    let res = await cancelBooking(dataSend)
                    console.log(res)
                    setIsLoading(false)
                    if (res.EC === 0) {
                        setVerify(true)
                        setStatus(true)
                    }
                }
            }

            if (bookingId) {
                let dataSend = { bookingId: bookingId }
                postCancelBooking(dataSend)
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
                        id='cancel-booking.status-success'>
                    </FormattedMessage></div>
                    :
                    <div className='message-status-booking failed'><FormattedMessage
                        id='cancel-booking.status-failed'>
                    </FormattedMessage></div>

            }
        </>
    )
}

export default CancelBooking