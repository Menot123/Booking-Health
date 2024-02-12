import React from 'react'
import './AllClinic.scss'
import { IoMdHome } from "react-icons/io";
import { getClinics } from '../../../services/userService'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { LANGUAGES } from '../../../utils/index'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'


function AllClinic() {

    const [Clinics, setClinics] = useState([])
    const language = useSelector(state => state.userRedux.language)
    const history = useHistory()


    useEffect(() => {
        const fetchDataClinic = async () => {
            let res = await getClinics()
            if (res.EC === 0) {
                setClinics(res.DT)
            } else {
                toast.error(res.EM)
            }
        }

        fetchDataClinic()
    }, [])

    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }

    const handleDetailClinic = (id) => {
        history.push(`/clinic/detail?id=${id}`)
    }

    return (
        <div className='all-clinic-container container'>
            <div className='location-href'>
                <IoMdHome
                    color="#45c3d2" fontSize="1.5em"
                /> <span className='location-href-text'> /<FormattedMessage id='homepage.all-clinics' /></span>
            </div>


            <div className='title-all-clinic'>
                <span className='title-all-clinic-text'><FormattedMessage id='homepage.clinics' /></span>
            </div>

            <div className='row'>
                {Clinics && Clinics.length > 0 &&
                    Clinics.map((item, index) => {
                        return (
                            <div key={'all-clinic' + index} className='all-clinic-item col-6 mb-2 col-md-4 col-xl-3' onClick={() => handleDetailClinic(item.id)}>
                                <img alt='img-element' className='img-clinic' src={convertImgBase64(item.image)} />
                                <div className='name-clinic'>
                                    <span className='name-clinic-text'>{language === LANGUAGES.VI ? item.nameVi : item.nameEn}</span>
                                </div>
                            </div>
                        )
                    })}

            </div>


        </div>
    )
}

export default AllClinic