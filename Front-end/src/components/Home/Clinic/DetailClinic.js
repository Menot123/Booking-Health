import React from 'react'
import { getDetailClinic } from '../../../services/userService'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'
import './DetailClinic.scss'
import { LANGUAGES } from '../../../utils/index'

function DetailClinic() {
    const [dataClinic, setDataClinic] = useState({})
    const [imageClinic, setImageClinic] = useState('')

    const location = useLocation();
    const language = useSelector(state => state.userRedux.language)


    useEffect(() => {

        let isMounted = true;

        if (location.search) {
            const searchParams = new URLSearchParams(location.search);
            const idClinic = searchParams.get('id');

            const fetchDataClinic = async (id) => {
                let res = await getDetailClinic(id)
                if (isMounted && res.EC === 0) {
                    setDataClinic(res.DT)
                } else {
                    toast.error(res.EM)
                }
            }

            if (idClinic) {
                fetchDataClinic(idClinic)
            }
        }

        return () => {
            isMounted = false; // Đánh dấu thành phần đã bị hủy khi useEffect được gọi lần tiếp theo
        };

    }, [])


    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }

    return (
        <div className='detail-clinic-container'>
            <div className='container'>
                <div className='title-clinic'>
                    <div className='img-clinic'>
                        <img className='element-img' alt='imgClinic' src={dataClinic && dataClinic.image ? convertImgBase64(dataClinic.image) : 'null'} />
                    </div>
                    <div className='title-text-clinic'>
                        <h4>{dataClinic && language === LANGUAGES.VI ? dataClinic.nameVi : dataClinic.nameEn}</h4>
                        <span className='title-text-address'>{dataClinic && language === LANGUAGES.VI ? dataClinic.addressVi : dataClinic.addressEn}</span>
                    </div>
                </div>
                <div className='content-clinic mt-3'>
                    {dataClinic
                        &&
                        <>
                            <div className='detail-specialty-text h220' dangerouslySetInnerHTML={{ __html: language === LANGUAGES.VI ? dataClinic?.descriptionVi : dataClinic?.descriptionEn }} />
                        </>
                    }
                </div>
            </div>
        </div >
    )
}

export default DetailClinic