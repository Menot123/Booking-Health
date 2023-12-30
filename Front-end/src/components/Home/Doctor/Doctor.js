import React from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Doctor.scss'
import bac_si from '../../../assets/img/bs-anh-thu1.jpg'
import { FormattedMessage } from 'react-intl'


function Doctor() {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (

        <div className='slider-doctor-content '>
            <div className='title w-100 d-flex align-items-center justify-content-between'>
                <h4><FormattedMessage id='homepage.health-facilities' defaultMessage={'Bác sĩ nổi bật'} /></h4>
                <span className='btn btn-primary btn-view-more'><span className='text-btn-view-more'><FormattedMessage id='homepage.view-more' defaultMessage={'Xem thêm'} /></span> </span>
            </div>
            <Slider {...settings}>
                <div className='wrapper-doctor-item'>
                    <div className='doctor-item'>
                        <div className='wrapper-img-doctor'>
                            <img className='img-doctor' src={bac_si} />
                        </div>
                        <div className='title_doctor'>Ths. Bs Vũ Ngọc Anh Thơ</div>
                        <span>Sức khỏe tâm thần</span>
                    </div>
                </div>

                <div className='wrapper-doctor-item'>
                    <div className='doctor-item'>
                        <div className='wrapper-img-doctor'>
                            <img className='img-doctor' src={bac_si} />
                        </div>
                        <div className='title_doctor'>Ths. Bs Vũ Ngọc Anh Thơ</div>
                    </div>
                </div>

                <div className='wrapper-doctor-item'>
                    <div className='doctor-item'>
                        <div className='wrapper-img-doctor'>
                            <img className='img-doctor' src={bac_si} />
                        </div>
                        <div className='title_doctor'>Ths. Bs Vũ Ngọc Anh Thơ</div>
                    </div>
                </div>

                <div className='wrapper-doctor-item'>
                    <div className='doctor-item'>
                        <div className='wrapper-img-doctor'>
                            <img className='img-doctor' src={bac_si} />
                        </div>
                        <div className='title_doctor'>Ths. Bs Vũ Ngọc Anh Thơ</div>
                    </div>
                </div>

                <div className='wrapper-doctor-item'>
                    <div className='doctor-item'>
                        <div className='wrapper-img-doctor'>
                            <img className='img-doctor' src={bac_si} />
                        </div>
                        <div className='title_doctor'>Ths. Bs Vũ Ngọc Anh Thơ</div>
                    </div>
                </div>

            </Slider>
        </div>

    )
}

export default Doctor