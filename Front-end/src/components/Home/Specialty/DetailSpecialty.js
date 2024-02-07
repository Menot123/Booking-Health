import React from 'react'
import './DetailSpecialty.scss'
import { getDetailSpecialty } from '../../../services/userService'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom';
import DoctorSpecialty from './DoctorSpecialty'
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../utils/index'
import { FormattedMessage } from 'react-intl'



function DetailSpecialty() {

    const language = useSelector(state => state.userRedux.language)

    const location = useLocation();

    let idSpecialty = ''

    if (location.search) {
        const searchParams = new URLSearchParams(location.search);
        idSpecialty = searchParams.get('id');
    }

    const [dataSpecialty, setDataSpecialty] = useState({})
    const [isShowMore, setIsShowMore] = useState(false)

    useEffect(() => {

        let isMounted = true;

        if (location.search) {
            const searchParams = new URLSearchParams(location.search);
            const idSpecialty = searchParams.get('id');

            const fetchDataSpecialty = async (id) => {
                let res = await getDetailSpecialty(id)
                if (isMounted && res.EC === 0) {
                    setDataSpecialty(res.DT)
                } else {
                    toast.error(res.EM)
                }
            }

            if (idSpecialty) {
                fetchDataSpecialty(idSpecialty)
            }
        }

        return () => {
            isMounted = false; // Đánh dấu thành phần đã bị hủy khi useEffect được gọi lần tiếp theo
        };

    }, [])

    function handleViewMoreDetail() {
        let element = document.querySelector(".detail-specialty-text");
        setIsShowMore(!isShowMore);
        let status = !isShowMore
        if (status) {
            element.classList.remove("h220");
        } else {
            element.classList.add("h220");
        }
    }

    return (
        <>
            <div className='detail-specialty-container container'>
                <div className='detail-specialty-content'>
                    {dataSpecialty
                        &&
                        <>
                            <div className='detail-specialty-text h220' dangerouslySetInnerHTML={{ __html: language === LANGUAGES.VI ? dataSpecialty?.descriptionVi : dataSpecialty?.descriptionEn }} />
                            <span className='view-more-info mt-3' onClick={() => handleViewMoreDetail()}>{isShowMore ? <FormattedMessage id='detail-specialty.hidden' />
                                : <FormattedMessage id='detail-specialty.view-more' />}</span>
                        </>
                    }
                </div>
            </div>

            <DoctorSpecialty specialtyId={idSpecialty} />
        </>


    )
}

export default DetailSpecialty