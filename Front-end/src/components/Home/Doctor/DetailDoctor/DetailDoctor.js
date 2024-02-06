import React, { useEffect } from 'react'
import './DetailDoctor.scss'
import { useParams } from 'react-router-dom';
import { getInfoDetailDoctor } from '../../../../services/userService'
import { toast } from 'react-toastify';
import { useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import Schedule from './Schedule';
import _ from 'lodash';
import { LANGUAGES } from '../../../../utils';
import { useSelector } from 'react-redux';
import Loader from '../../../../admin/components/Loader/Loader';
import { FormattedMessage } from 'react-intl'


function DetailDoctor(props) {

    const language = useSelector(state => state.userRedux.language)


    const [infoDoctor, setInfoDoctor] = useState('')
    const [isShowMorePrice, setIsShowMorePrice] = useState(false)
    const { id } = useParams();
    const [avatar, setAvatar] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true; // Biến đánh dấu thành phần có được mount hay không
        let idDoctor = props.idDoctor ? props.idDoctor : id
        const fetchInfoDoctor = async () => {
            if (!props.idDoctor) {
                setIsLoading(true);
                let res = await getInfoDetailDoctor(idDoctor);
                if (isMounted) {
                    // Kiểm tra xem thành phần có được mount hay không trước khi cập nhật state
                    if (res && res.EC === 0) {
                        setIsLoading(false);
                        setInfoDoctor(res.DT);
                        if (!_.isEmpty(res.DT) && res.DT.image) {
                            let avatarBase64 = convertImgBase64(res.DT.image);
                            setAvatar(avatarBase64);
                        }
                    }
                }
            } else {
                if (isMounted) {
                    // Kiểm tra xem thành phần có được mount hay không trước khi cập nhật state
                    if (props.dataDoctor) {
                        setInfoDoctor(props.dataDoctor);
                        if (!_.isEmpty(props.dataDoctor) && props.dataDoctor.image) {
                            let avatarBase64 = convertImgBase64(props.dataDoctor.image);
                            setAvatar(avatarBase64);
                        }
                    }
                }
            }
        };

        fetchInfoDoctor();


        return () => {
            isMounted = false; // Đánh dấu thành phần đã bị hủy khi useEffect được gọi lần tiếp theo
        };
    }, []);


    const handleShowDetailPrice = () => {
        setIsShowMorePrice(true)
    }

    const handleHideDetailPrice = () => {
        setIsShowMorePrice(false)
    }

    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }


    return (
        <div className='detail-doctor-container container'>
            {isLoading ? <Loader loading={isLoading} /> :
                <>
                    <div className='detail-information d-flex'>
                        <div className='avatar-doctor'>
                            <img alt='avatar-doctor' className='avatar-element' src={avatar} />
                        </div>

                        <div className='detail-content'>
                            <div className='detail-title'>{infoDoctor && infoDoctor.positionData &&
                                language === LANGUAGES.VI ? infoDoctor.positionData?.valueVi
                                :
                                infoDoctor.positionData?.valueEn}  {infoDoctor.firstName} {infoDoctor.lastName}</div>
                            <div className='detail-description'>
                                <span className='detail-description-text'>
                                    {infoDoctor && infoDoctor.dataIdDoctor && infoDoctor.dataIdDoctor?.dataMarkdown && infoDoctor.dataIdDoctor?.dataMarkdown?.description}
                                </span>
                            </div>
                            <div className='detail-location'>
                                <IoLocationSharp /> <span className='text-location'>{
                                    language === LANGUAGES.VI ? infoDoctor.dataIdDoctor?.dataProvince?.valueVi
                                        :
                                        infoDoctor.dataIdDoctor?.dataProvince?.valueEn
                                }</span>
                            </div>
                        </div>
                    </div>

                    <div className='detail-schedule-price d-flex'>
                        <div className='detail-schedule'>
                            <Schedule doctorId={props.idDoctor ? props.idDoctor : id} />
                        </div>

                        <div className='detail-price-address'>
                            <div className='detail-address'>
                                <span className='detail-address-title'><FormattedMessage id='homepage.detail-doctor.medical-examination-address' /></span>
                                <div className='detail-address-content'>
                                    <span className='text-clinic'>{
                                        language === LANGUAGES.VI ? infoDoctor.dataIdDoctor?.dataClinic?.nameVi
                                            :
                                            infoDoctor.dataIdDoctor?.dataClinic?.nameEn
                                    }</span>
                                    <br />
                                    <span className='text-address'>{infoDoctor?.address}</span>
                                </div>
                            </div>
                            <hr />
                            <div className='detail-price'>
                                <span className='text-price'><FormattedMessage id='homepage.detail-doctor.examination-price' /></span>
                                {isShowMorePrice ?
                                    <>
                                        <div className='detail-price-more mt-2'>
                                            <span className='text-price-more'><FormattedMessage id='homepage.detail-doctor.examination-price' /></span>
                                            <span className='price-more'>{infoDoctor && infoDoctor.dataIdDoctor &&
                                                language === LANGUAGES.VI ? infoDoctor.dataIdDoctor?.dataPrice?.valueVi + ' VND'
                                                :
                                                infoDoctor.dataIdDoctor?.dataPrice?.valueEn + '$'
                                            }</span>
                                        </div>
                                        <div className='more-info'>
                                            <span className='text-info-more'>Giá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm</span>
                                        </div>
                                        <span className='hide-view-more' onClick={() => handleHideDetailPrice()}><FormattedMessage id='homepage.detail-doctor.hide-price-list' /></span>

                                    </>
                                    :
                                    <>
                                        <span className='price'>{infoDoctor && infoDoctor.dataIdDoctor &&
                                            language === LANGUAGES.VI ? infoDoctor.dataIdDoctor?.dataPrice?.valueVi + ' VND'
                                            :
                                            infoDoctor.dataIdDoctor?.dataPrice?.valueEn + '$'
                                        }</span>
                                        <span className='show-view-more ms-2' onClick={() => handleShowDetailPrice()}><FormattedMessage id='homepage.detail-doctor.see-detail' /></span>
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    {!props.idDoctor ? <hr /> : ''}


                    {!props.showMarkdown ?

                        <div className='content-markdown-doctor mt-4 mb-3'>
                            <div dangerouslySetInnerHTML={{ __html: infoDoctor.dataIdDoctor?.dataMarkdown?.textHTML }} />

                        </div>
                        :
                        ''
                    }
                </>
            }
        </div>

    )
}

export default DetailDoctor