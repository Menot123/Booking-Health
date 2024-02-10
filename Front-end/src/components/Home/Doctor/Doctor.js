import React from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Doctor.scss'
import { FormattedMessage } from 'react-intl'
import { getAllDoctor } from '../../../services/userService'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom'


function Doctor() {

    const [doctors, setDoctors] = useState([])
    const history = useHistory()

    useEffect(() => {
        getDoctors()
    }, [])

    const getDoctors = async () => {
        let res = await getAllDoctor()
        let listDoctor = ''
        if (res.EC === 0 && res.DT) {
            listDoctor = res.DT
        }
        setDoctors(listDoctor)
    }


    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ],
    };

    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }

    const handleClickDetailDoctor = (doctorId) => {
        history.push(`/detail-doctor/${doctorId}`)
    }

    const handleViewMoreDoctor = () => {
        history.push('/list-doctor')
    }

    return (

        <div className='slider-doctor-content '>
            <div className='title w-100 d-flex align-items-center justify-content-between'>
                <h4><FormattedMessage id='homepage.outstanding-doctor' defaultMessage={'Bác sĩ nổi bật'} /></h4>
                <span onClick={() => handleViewMoreDoctor()} className='text-btn-view-more btn-view-more'><FormattedMessage id='homepage.view-more' defaultMessage={'Xem thêm'} /></span>
            </div>
            {doctors && doctors.length > 0 &&
                <Slider {...settings}>

                    {doctors && doctors.length > 0 &&
                        doctors.map((item, index) => {
                            return (
                                <div className='wrapper-doctor-item' key={uuidv4()}>
                                    <div className='doctor-item' onClick={() => handleClickDetailDoctor(item.id)}>
                                        <div className='wrapper-img-doctor'>
                                            <img alt='img-doctor-element' className='img-doctor' src={convertImgBase64(item.image)} />
                                        </div>
                                        <div className='title_doctor'>{item.firstName + ' ' + item.lastName}</div>
                                        <span >{item.dataIdDoctor?.dataSpecialty?.nameVi}</span>
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

export default Doctor