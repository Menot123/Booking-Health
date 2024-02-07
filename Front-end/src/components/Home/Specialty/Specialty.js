import React from 'react'
import Slider from "react-slick"
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Specialty.scss'
import { FormattedMessage } from 'react-intl'
import { getSpecialties } from '../../../services/userService'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { LANGUAGES } from '../../../utils/index'
import { useHistory } from 'react-router-dom'



function Specialty(props) {

    const history = useHistory()

    const language = useSelector(state => state.userRedux.language)

    const [specialties, setSpecialties] = useState([])

    useEffect(() => {
        const fetchDataSpecialty = async () => {
            let res = await getSpecialties()
            if (res.EC === 0) {
                setSpecialties(res.DT)
            } else {
                toast.error(res.EM)
            }
        }

        fetchDataSpecialty()
    }, [])

    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }


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

    const handleDetailSpecialty = (id) => {
        history.push(`/specialty/detail?id=${id}`)
        props.scrollToTop()
    }


    const handleViewMoreSpecialty = () => {
        history.push('/list-specialty')
    }

    return (

        <div className='slider-content mr17'>
            <div className='title w-100 d-flex align-items-center justify-content-between'>
                <h4><FormattedMessage id='homepage.specialty' defaultMessage={'Chuyên khoa'} /></h4>
                <span key='btn-view-more-specialty' className='btn btn-primary btn-view-more'
                    onClick={() => handleViewMoreSpecialty()}
                ><span className='text-btn-view-more'><FormattedMessage id='homepage.view-more' defaultMessage={'Xem thêm'} /></span> </span>
            </div>

            {specialties && specialties.length > 0 &&
                <Slider {...settings}>
                    {specialties.map((item, index) => {
                        return (
                            <div onClick={() => handleDetailSpecialty(item.id)} key={index + 'specialty'} className='wrapper-specialty-item'>
                                <div className='specialty-item'>
                                    <div className='wrapper-img-specialty'>
                                        <img className='img-specialty' src={convertImgBase64(item.image)} />
                                    </div>
                                    <h4 className='title specialty'>{language === LANGUAGES.VI ? item.nameVi : item.nameEn}</h4>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            }
        </div>

    )
}

export default Specialty