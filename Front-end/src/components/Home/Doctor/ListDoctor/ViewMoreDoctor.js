import React from 'react'
import './ViewMoreDoctor.scss'
import { IoMdHome } from "react-icons/io";
import { getAllDoctor } from '../../../../services/userService'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { LANGUAGES } from '../../../../utils/index'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

function ViewMoreDoctor(props) {

    const [doctors, setDoctors] = useState([])
    const language = useSelector(state => state.userRedux.language)
    const history = useHistory()

    useEffect(() => {
        const fetchDataDoctor = async () => {
            let res = await getAllDoctor()
            if (res.EC === 0) {
                setDoctors(res.DT)
            } else {
                toast.error(res.EM)
            }
        }

        fetchDataDoctor()
    }, [])

    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }

    const handleDetailDoctor = (doctorId) => {
        history.push(`/detail-doctor/${doctorId}`)
        props.scrollToTop()
    }

    return (
        <div className='all-doctor-container container'>
            <div className='location-href'>
                <IoMdHome
                    color="#45c3d2" fontSize="1.5em"
                /> <span className='location-href-text'> /<FormattedMessage id='homepage.all-doctors' /></span>
            </div>

            <div className='title-all-doctor'>
                <span className='title-all-doctor-text'><FormattedMessage id='homepage.all-doctors' /></span>
            </div>

            {doctors && doctors.length > 0 &&
                doctors.map((item, index) => {
                    return (
                        <>
                            <div key={'all-doctor' + index} className='all-doctor-item' onClick={() => handleDetailDoctor(item.id)}>
                                <div className='avatar-doctor'>
                                    <img alt='img-element' className='img-doctor' src={convertImgBase64(item.image)} />
                                </div>
                                <div className='name-doctor'>
                                    <span className='name-doctor-text'>{language === LANGUAGES.VI ? item.firstName + ' ' + item.lastName : item.lastName + ' ' + item.firstName}</span>
                                    <div className='specialty-doctor'>
                                        <span className='specialty-doctor-text'>{language === LANGUAGES.VI ? item?.dataIdDoctor?.dataSpecialty?.nameVi
                                            :
                                            item?.dataIdDoctor?.dataSpecialty?.nameEn
                                        }</span>
                                    </div>
                                </div>
                            </div>
                            <hr className='hr-line' />
                        </>
                    )
                })}
        </div>
    )
}

export default ViewMoreDoctor