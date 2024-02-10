import React from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Clinic.scss'
import { FormattedMessage } from 'react-intl'
import { getClinics } from '../../../services/userService'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { LANGUAGES } from '../../../utils'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

function Clinic(props) {
    const history = useHistory()


    const language = useSelector(state => state.userRedux.language)


    const [clinics, setClinics] = useState([])

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

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    };

    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }

    const handleDetailClinic = (id) => {
        history.push(`/clinic/detail?id=${id}`)
        props.scrollToTop()
    }

    const handleViewMoreClinic = () => {
        history.push('/list-clinic')
        props.scrollToTop()
    }

    return (

        <div className='slider-content mr17 '>
            <div className='title w-100 d-flex align-items-center justify-content-between'>
                <h4><FormattedMessage id='homepage.facilities' defaultMessage={'Cơ sở y tế'} /></h4>
                <span key='btn-view-more-clinic' className='btn btn-primary btn-view-more'
                    onClick={() => handleViewMoreClinic()}
                ><span className='text-btn-view-more'><FormattedMessage id='homepage.view-more' defaultMessage={'Xem thêm'} /></span> </span>
            </div>
            {clinics && clinics.length > 0 &&
                <Slider {...settings}>

                    {clinics.map((item, index) => {
                        return (
                            <div onClick={() => handleDetailClinic(item.id)} key={index + 'clinic'} className='wrapper-clinic-item'>
                                <div className='clinic-item'>
                                    <div className='wrapper-img-clinic'>
                                        <img className='img-clinic' src={convertImgBase64(item.image)} />
                                    </div>
                                    <h4 className='title_clinic'>{language === LANGUAGES.VI ? item.nameVi : item.nameEn}</h4>
                                </div>
                            </div>
                        )
                    })
                    }

                </Slider>
            }
        </div>

    )
}

export default Clinic