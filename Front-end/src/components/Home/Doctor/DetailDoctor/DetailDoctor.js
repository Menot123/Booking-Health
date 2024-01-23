import React, { useEffect } from 'react'
import './DetailDoctor.scss'
import { useParams } from 'react-router-dom';
import { getInfoDetailDoctor } from '../../../../services/userService'
import { toast } from 'react-toastify';
import { useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import bac_si from '../../../../assets/img/bs-anh-thu1.jpg'
import Schedule from './Schedule';

function DetailDoctor() {

    const [infoDoctor, setInfoDoctor] = useState('')
    const [isShowMorePrice, setIsShowMorePrice] = useState(false)
    const { id } = useParams();


    useEffect(() => {
        fetchInfoDoctor()
    }, [])

    const fetchInfoDoctor = async () => {
        let res = await getInfoDetailDoctor(id)
        if (res && res.EC === 0) {
            setInfoDoctor(res.DT)
        }
    }

    const handleShowDetailPrice = () => {
        setIsShowMorePrice(true)
    }

    const handleHideDetailPrice = () => {
        setIsShowMorePrice(false)
    }


    return (
        <div className='detail-doctor-container container'>
            <div className='detail-information d-flex'>
                <div className='avatar-doctor'>
                    <img alt='avatar-doctor' className='avatar-element' src={bac_si} />
                </div>

                <div className='detail-content'>
                    <div className='detail-title'>Bác sĩ Chuyên khoa I Phí Thị Tuyết Nga</div>
                    <div className='detail-description'>
                        Hơn 30 năm kinh nghiệm trong khám và điều trị bệnh lý Sản phụ khoa
                        Chứng nhận là giảng viên về chương trình Sức khỏe sinh sản trong nước do tổ chức Pathfinder International – Mỹ cấp
                        Tham gia giảng dạy kiến thức về Sức khỏe sinh sản và khống chế nhiễm khuẩn cho nhiều khóa các bác sĩ và nữ hộ sinh trong nước
                    </div>
                    <div className='detail-location'>
                        <IoLocationSharp /> <span className='text-location'>Thành phố Hồ Chí Minh</span>
                    </div>
                </div>
            </div>

            <div className='detail-schedule-price d-flex'>
                <div className='detail-schedule'>
                    <Schedule />
                </div>

                <div className='detail-price-address'>
                    <div className='detail-address'>
                        <span className='detail-address-title'>Địa chỉ khám</span>
                        <div className='detail-address-content'>
                            <span className='text-clinic'>Phòng Khám chuyên khoa phụ sản Hoa Sen Lotus Clinic</span>
                            <br />
                            <span className='text-address'> Số 36, Đường số 3 KDC Him Lam, Phường Tân Hưng, Quận 7, Tp. Hồ Chí Minh</span>
                        </div>
                    </div>
                    <hr />
                    <div className='detail-price'>
                        <span className='text-price'>GIÁ KHÁM:</span>
                        {isShowMorePrice ?
                            <>
                                <div className='detail-price-more mt-2'>
                                    <span className='text-price-more'>Giá khám</span>
                                    <span className='price-more'>150.000đ</span>
                                </div>
                                <div className='more-info'>
                                    <span className='text-info-more'>Giá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm</span>
                                </div>
                                <span className='hide-view-more' onClick={() => handleHideDetailPrice()}>Ẩn bảng giá</span>

                            </>
                            :
                            <>
                                <span className='price'>150.000đ</span>
                                <span className='show-view-more ms-2' onClick={() => handleShowDetailPrice()}>Xem chi tiết</span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailDoctor