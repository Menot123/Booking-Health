import React from 'react'
import './AllSpecialty.scss'
import { IoMdHome } from "react-icons/io";
import { getSpecialties } from '../../../services/userService'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { LANGUAGES } from '../../../utils/index'
import { useHistory } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'


function AllSpecialty() {

    const [specialties, setSpecialties] = useState([])
    const language = useSelector(state => state.userRedux.language)
    const history = useHistory()


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

    const handleDetailSpecialty = (id) => {
        history.push(`/specialty/detail?id=${id}`)
    }

    return (
        <div className='all-specialty-container container'>
            <div className='location-href'>
                <IoMdHome
                    color="#45c3d2" fontSize="1.5em"
                /> <span className='location-href-text'> /<FormattedMessage id='homepage.all-specialty-examination-specialist' /></span>
            </div>


            <div className='title-all-specialty'>
                <span className='title-all-specialty-text'><FormattedMessage id='homepage.all-specialty-examination-specialist' /></span>
            </div>

            {specialties && specialties.length > 0 &&
                specialties.map((item, index) => {
                    return (
                        <>
                            <div key={'all-specialty' + index} className='all-specialty-item' onClick={() => handleDetailSpecialty(item.id)}>
                                <img alt='img-element' className='img-specialty' src={convertImgBase64(item.image)} />
                                <div className='name-specialty'>
                                    <span className='name-specialty-text'>{language === LANGUAGES.VI ? item.nameVi : item.nameEn}</span>
                                </div>
                            </div>
                            <hr className='hr-line' />
                        </>
                    )
                })}

        </div>
    )
}

export default AllSpecialty