import React from 'react'
import './DoctorSpecialty.scss'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../utils/index'
import { toast } from 'react-toastify'
import { getDoctorsBySpecialtyAndLocation } from '../../../services/userService'
import DetailDoctor from '../Doctor/DetailDoctor/DetailDoctor'
import { v4 as uuidv4 } from 'uuid';


function DoctorSpecialty() {

    const language = useSelector(state => state.userRedux.language)


    const [selectedPosition, setSelectedPosition] = useState('ALL')
    const [doctors, setDoctors] = useState([])

    const [location, setLocation] = useState('all')

    useEffect(() => {

        let isMounted = true;

        const fetchDoctorSpecialtyLocation = async (data) => {
            let res = await getDoctorsBySpecialtyAndLocation(data)
            if (isMounted && res.EC === 0) {
                setDoctors(res.DT)
            } else {
                toast.error(res.EM)
            }
        }

        let dataSend = {
            provinceId: 'PRO1',
            specialtyId: 1
        }

        fetchDoctorSpecialtyLocation(dataSend)

        return () => {
            isMounted = false; // Đánh dấu thành phần đã bị hủy khi useEffect được gọi lần tiếp theo
        };

    }, [])


    const handleChangeSelectLocation = (e) => {
        setSelectedPosition(e.target.value)
    }

    return (
        <div className='doctor-specialty-container mt-4'>
            <div className='container'>
                <div className='doctor-specialty-select-position'>
                    <select value={selectedPosition && selectedPosition} onChange={(e) => handleChangeSelectLocation(e)}>
                        <option value="ALL">{language === LANGUAGES.VI ? 'Toàn quốc' : 'All'}</option>
                        <option value="PRO2">{language === LANGUAGES.VI ? 'Hồ Chí Minh' : 'Ho Chi Minh'}</option>
                        <option value="PRO1">{language === LANGUAGES.VI ? 'Hà Nội' : 'Ha Noi'}</option>
                    </select>
                </div>

                {doctors && doctors.length > 0 &&
                    doctors.map((item, index) => {
                        return (
                            <DetailDoctor key={uuidv4()}
                                idDoctor={item.id}
                                showMarkdown={true}
                                dataDoctor={item} />
                        )
                    })
                }


            </div>
        </div>


    )
}

export default DoctorSpecialty