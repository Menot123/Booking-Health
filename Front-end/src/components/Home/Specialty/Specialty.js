import React from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Specialty.scss'
import co_xuong_khop from '../../../assets/img/co-xuong-khop.png'
import { FormattedMessage } from 'react-intl'

function Specialty() {

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
                <h4><FormattedMessage id='homepage.specialty' defaultMessage={'Chuyên khoa'} /></h4>
                <span className='btn btn-primary btn-view-more'><span className='text-btn-view-more'><FormattedMessage id='homepage.view-more' defaultMessage={'Xem thêm'} /></span> </span>
            </div>
            <Slider {...settings}>
                <div className='wrapper-specialty-item'>
                    <div className='specialty-item'>
                        <div className='wrapper-img-specialty'>
                            <img className='img-specialty' src={co_xuong_khop} />
                        </div>
                        <h4 className='title specialty'>Cơ xương khớp</h4>
                    </div>
                </div>

                <div className='wrapper-specialty-item'>
                    <div className='specialty-item'>
                        <div className='wrapper-img-specialty'>
                            <img className='img-specialty' src={co_xuong_khop} />
                        </div>
                        <h4 className='title specialty'>Cơ xương khớp</h4>
                    </div>
                </div>
                <div className='wrapper-specialty-item'>
                    <div className='specialty-item'>
                        <div className='wrapper-img-specialty'>
                            <img className='img-specialty' src={co_xuong_khop} />
                        </div>
                        <h4 className='title specialty'>Cơ xương khớp</h4>
                    </div>
                </div><div className='wrapper-specialty-item'>
                    <div className='specialty-item'>
                        <div className='wrapper-img-specialty'>
                            <img className='img-specialty' src={co_xuong_khop} />
                        </div>
                        <h4 className='title specialty'>Cơ xương khớp</h4>
                    </div>
                </div><div className='wrapper-specialty-item'>
                    <div className='specialty-item'>
                        <div className='wrapper-img-specialty'>
                            <img className='img-specialty' src={co_xuong_khop} />
                        </div>
                        <h4 className='title specialty'>Cơ xương khớp</h4>
                    </div>
                </div>

            </Slider>
        </div>

    )
}

export default Specialty