import React from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Clinic.scss'
import viet_duc from '../../../assets/img/viet_duc.jpg'
import { FormattedMessage } from 'react-intl'


function Clinic() {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (

        <div className='slider-content '>
            <div className='title w-100 d-flex align-items-center justify-content-between'>
                <h4><FormattedMessage id='homepage.health-facilities' defaultMessage={'Cơ sở y tế'} /></h4>
                <span className='btn btn-primary btn-view-more'><span className='text-btn-view-more'><FormattedMessage id='homepage.view-more' defaultMessage={'Xem thêm'} /></span> </span>
            </div>
            <Slider {...settings}>
                <div className='wrapper-clinic-item'>
                    <div className='clinic-item'>
                        <div className='wrapper-img-clinic'>
                            <img alt='img-clinic' className='img-clinic' src={viet_duc} />
                        </div>
                        <div className='title_clinic'>Bệnh viện hữu nghị Việt Đức</div>
                    </div>
                </div>

                <div className='wrapper-clinic-item'>
                    <div className='clinic-item'>
                        <div className='wrapper-img-clinic'>
                            <img alt='img-clinic' className='img-clinic' src={viet_duc} />
                        </div>
                        <div className='title_clinic'>Bệnh viện hữu nghị Việt Đức</div>
                    </div>
                </div>

                <div className='wrapper-clinic-item'>
                    <div className='clinic-item'>
                        <div className='wrapper-img-clinic'>
                            <img alt='img-clinic' className='img-clinic' src={viet_duc} />
                        </div>
                        <div className='title_clinic'>Bệnh viện hữu nghị Việt Đức</div>
                    </div>
                </div>

                <div className='wrapper-clinic-item'>
                    <div className='clinic-item'>
                        <div className='wrapper-img-clinic'>
                            <img alt='img-clinic' className='img-clinic' src={viet_duc} />
                        </div>
                        <div className='title_clinic'>Bệnh viện hữu nghị Việt Đức</div>
                    </div>
                </div>

                <div className='wrapper-clinic-item'>
                    <div className='clinic-item'>
                        <div className='wrapper-img-clinic'>
                            <img alt='img-clinic' className='img-clinic' src={viet_duc} />
                        </div>
                        <div className='title_clinic'>Bệnh viện hữu nghị Việt Đức</div>
                    </div>
                </div>

            </Slider>
        </div>

    )
}

export default Clinic