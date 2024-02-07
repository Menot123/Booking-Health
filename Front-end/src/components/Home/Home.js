import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Home.scss'
import Specialty from './Specialty/Specialty'
import Clinic from './Clinic/Clinic'
import Doctor from './Doctor/Doctor'
import background_doctor from '../../../src/assets/img/background_doctors.png'
import { useEffect, useState } from 'react'
import { translate } from '../../redux/slices/languageSlice'

const Home = (props) => {

    const dispatch = useDispatch()
    const language = useSelector(state => state.userRedux.language)

    useEffect(() => {
        dispatch(translate(language))
    }, [])



    return (
        <>
            <div className='container home-container'>
                <Specialty scrollToTop={props.scrollToTop} />
                <Clinic scrollToTop={props.scrollToTop} />
            </div>
            <div className='doctor-wrapper'>
                <div className='background-doctors'>
                    <img src={background_doctor} alt='banner doctor' />
                </div>
                <Doctor />
            </div>
        </>
    )
}

export default Home