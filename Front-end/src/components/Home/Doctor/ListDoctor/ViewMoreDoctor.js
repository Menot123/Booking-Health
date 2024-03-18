import React from 'react'
import './ViewMoreDoctor.scss'
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { getAllDoctor } from '../../../../services/userService'
import { useState, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { LANGUAGES } from '../../../../utils/index'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

function ViewMoreDoctor(props) {

    const [doctors, setDoctors] = useState([])
    const [doctorsWithSearch, setDoctorsWithSearch] = useState([])
    const [searchInput, setSearchInput] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [isEmptySearch, setIsEmptySearch] = useState(false);
    const language = useSelector(state => state.userRedux.currentLang)
    const history = useHistory()

    useEffect(() => {
        const fetchDataDoctor = async () => {
            let res = await getAllDoctor()
            if (res.EC === 0) {
                setDoctors(res.DT)
            } else {
                toast.error(res.EM)
            }
        }

        fetchDataDoctor()
    }, [])

    const convertImgBase64 = (base64) => {
        let imageBase64 = ''
        imageBase64 = new Buffer(base64, 'base64').toString('binary')
        return imageBase64
    }

    const handleDetailDoctor = (doctorId) => {
        history.push(`/detail-doctor/${doctorId}`)
        props.scrollToTop()
    }

    const handleChangeSearchInput = (element) => {
        const searchValue = element.target.value
        const searchDoctorArray = []
        setSearchInput(searchValue)
        // console.log(searchValue)
        if (searchValue != '') {
            doctors.map((doctor, index) => {
                let firstName = doctor.firstName.toLowerCase()
                let lastName = doctor.lastName.toLowerCase()
                let mergeName = firstName + ' ' + lastName
                if (language === LANGUAGES.EN) {
                    mergeName = lastName + ' ' + firstName
                }
                if (mergeName.search(searchValue.toLowerCase()) >= 0) {
                    searchDoctorArray.push(doctor)
                }
            })
            // console.log(searchDoctorArray)
            setDoctorsWithSearch(searchDoctorArray)
            setIsSearch(true)
            if (searchDoctorArray.length > 0) {
                setIsEmptySearch(false)
            }
            else setIsEmptySearch(true)
        }
        else {
            if (doctors.length > 0) {
                setIsEmptySearch(false)
            }
            else setIsEmptySearch(true)
            setIsSearch(false)
            setDoctorsWithSearch([]);
        }
    }

    const memoizedDoctors = useMemo(() => {
        if (doctors && doctors.length > 0) {
            if (isSearch) {
                if (isEmptySearch) {
                    return <h3 className='text-center text-danger mt-3' style={{ marginBottom: '100px' }}><FormattedMessage id='doctor.not-found' defaultMessage={'Không tìm thấy bác sĩ'} /></h3>
                }
                else {
                    return doctorsWithSearch.map((item, index) => (
                        <div key={'all-doctor' + index}>
                            <div key={'all-doctor' + index}>

                                <div className='all-doctor-item' onClick={() => handleDetailDoctor(item.id)}>
                                    <div className='avatar-doctor'>
                                        <img alt='img-element' className='img-doctor' src={convertImgBase64(item.image)} />
                                    </div>
                                    <div className='name-doctor'>
                                        <span className='name-doctor-text'>{language === LANGUAGES.VI ? item.firstName + ' ' + item.lastName : item.lastName + ' ' + item.firstName}</span>
                                        <div className='specialty-doctor'>
                                            <span className='specialty-doctor-text'>{language === LANGUAGES.VI ? item?.dataIdDoctor?.dataSpecialty?.nameVi
                                                :
                                                item?.dataIdDoctor?.dataSpecialty?.nameEn
                                            }</span>
                                        </div>
                                    </div>
                                </div>
                                <hr className='hr-line' />
                            </div>
                        </div>
                    ));
                }
            }
            else {
                return doctors.map((item, index) => (
                    <div key={'all-doctor' + index}>
                        <div key={'all-doctor' + index}>

                            <div className='all-doctor-item' onClick={() => handleDetailDoctor(item.id)}>
                                <div className='avatar-doctor'>
                                    <img alt='img-element' className='img-doctor' src={convertImgBase64(item.image)} />
                                </div>
                                <div className='name-doctor'>
                                    <span className='name-doctor-text'>{language === LANGUAGES.VI ? item.firstName + ' ' + item.lastName : item.lastName + ' ' + item.firstName}</span>
                                    <div className='specialty-doctor'>
                                        <span className='specialty-doctor-text'>{language === LANGUAGES.VI ? item?.dataIdDoctor?.dataSpecialty?.nameVi
                                            :
                                            item?.dataIdDoctor?.dataSpecialty?.nameEn
                                        }</span>
                                    </div>
                                </div>
                            </div>
                            <hr className='hr-line' />
                        </div>
                    </div>
                ));
            }
        }
    }, [searchInput, doctors]);

    return (
        <div className='all-doctor-container container'>
            <div className='location-href'>
                <IoMdHome
                    color="#45c3d2" fontSize="1.5em"
                /> <span className='location-href-text'> /<FormattedMessage id='homepage.all-doctors' /></span>
            </div>

            <div className='title-all-doctor row'>
                <span className='title-all-doctor-text col-md-3'><FormattedMessage id='homepage.all-doctors' /></span>
                <div className='col-md-3'></div>
                <div className='search-box col'>
                    <input onChange={(e) => handleChangeSearchInput(e)} value={searchInput} type="text" className="input-search form-control" placeholder="Tìm kiếm" />
                    <span className="icon-search"><FaSearch /></span>
                </div>
            </div>

            {memoizedDoctors}
        </div>
    )
}

export default ViewMoreDoctor