import React from 'react';
import './Header.scss'
import { NavLink } from 'react-router-dom'
import { TbLogout } from "react-icons/tb";
import { useHistory } from 'react-router-dom'
import { logout } from '../../../redux/slices/userSlice'
import { FormattedMessage } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux';
import { translate } from '../../../redux/slices/languageSlice'
import { changeUserLanguage } from '../../../redux/slices/userSlice'
import { useEffect } from 'react'

function Navbar() {


    const history = useHistory()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        history.push('/login')
    }

    const handleChangeLanguage = (lang) => {
        dispatch(translate(lang))
        dispatch(changeUserLanguage(lang))
    }

    const language = useSelector(state => state.userRedux.language)
    const nameUser = useSelector(state => state.userRedux.account.lastName)

    useEffect(() => {
        dispatch(translate(language))
    }, [])


    return (
        <>
            <div className='navigation-bar d-flex justify-content-between'>
                <div className='nav-content-left d-flex '>
                    <div className='nav-item'>
                        <span className='nav-item-title'><FormattedMessage id='admin-header.user' /></span>
                        <div className="sub-menu sub-menu-long">
                            <div className='wrapper-link'>
                                <NavLink to="CRUD-user">CRUD User</NavLink>

                            </div>
                            <div className='wrapper-link'>
                                <NavLink to="manage-doctors"><FormattedMessage id='admin-header.manage-doctors' /></NavLink>

                            </div>
                            <div className='wrapper-link'>
                                <NavLink to="manage-schedules"><FormattedMessage id='admin-header.manage-schedules' /></NavLink>
                            </div>
                        </div>
                    </div>

                    <div className='nav-item'>
                        <span className='nav-item-title'><FormattedMessage id='admin-header.clinic' /></span>
                        <div className="sub-menu ">
                            <div className='wrapper-link'>
                                <NavLink to="manage-clinics"><FormattedMessage id='admin-header.manage-clinics' /></NavLink>
                            </div>
                        </div>
                    </div>

                    <div className='nav-item'>
                        <span className='nav-item-title'><FormattedMessage id='admin-header.specialty' /></span>
                        <div className="sub-menu ">
                            <div className='wrapper-link'>
                                <NavLink to="manage-specialties"><FormattedMessage id='admin-header.manage-specialties' /></NavLink>
                            </div>
                        </div>
                    </div>

                    <div className='nav-item'>
                        <span className='nav-item-title'><FormattedMessage id='admin-header.handbook' /></span>
                        <div className="sub-menu ">
                            <div className='wrapper-link'>
                                <NavLink to="manage-posts"><FormattedMessage id='admin-header.manage-handbooks' /></NavLink>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='nav-content-right'>
                    <div className='hello-user'><FormattedMessage id='admin-header.welcome' /> {nameUser.toUpperCase()}</div>
                    <div className='change-language'>
                        <span onClick={() => handleChangeLanguage('vi')} className={language === 'vi' ? 'lang-vi active' : 'lang-vi '}>VN</span>
                        <span onClick={() => handleChangeLanguage('en')} className={language === 'en' ? 'lang-en active' : 'lang-en '}>EN</span>
                    </div>
                    <div className='icon-logout' onClick={() => handleLogout()}>
                        <TbLogout />
                    </div>
                </div>
            </div>


        </>
    );
}

export default Navbar;