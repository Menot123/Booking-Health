import React from 'react';
import './Nav.scss'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import Search from '../Search/Search';
import { FaQuestionCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { translate } from '../../redux/slices/languageSlice'
import { FormattedMessage } from 'react-intl'
import Carousel from './Carousel'


const Nav = (props) => {
    let history = useHistory();
    const dispatch = useDispatch()
    const language = useSelector(state => state.language.value)
    const url = window.location.pathname;

    const handleClickLogo = () => {
        history.push("/");
    }

    const handleClickSupport = () => {
        history.push("/ho-tro");
    }
    return (
        <>
            <div className="top-nav">
                <div className='container p-3 d-flex nav-container flex-column'>
                    <div className='nav-items d-flex'>
                        <div className='img-logo' onClick={() => handleClickLogo()}>
                            <img className='logo' alt='logo' src={logo}></img>
                        </div>
                        <div className='nav-link-items d-flex '>
                            <NavLink to="chuyen-khoa"><FormattedMessage id='homepage.specialty' /></NavLink>
                            <NavLink to="co-so-y-te"><FormattedMessage id='homepage.facilities' /></NavLink>
                            <NavLink to="song-khoe"><FormattedMessage id='homepage.live-healthy' /></NavLink>
                            <Search className="search-input" />
                        </div>

                        <div className='content-nav-right d-flex'>
                            <div className='help-contact d-flex'>
                                <FaQuestionCircle /> <span onClick={() => handleClickSupport()}><FormattedMessage id='homepage.support' /></span>
                            </div>
                            <div className='change-language ms-3 d-flex'>
                                <span onClick={() => dispatch(translate('vi'))} className={language === 'vi' ? 'language-vi active' : 'language-vi '} >VN</span>
                                <span onClick={() => dispatch(translate('en'))} className={language === 'en' ? 'language-en ms-2 active' : 'language-en ms-2'}>EN</span>
                            </div>
                        </div>
                    </div>
                    {url === '/ho-tro' ? ' ' :
                        <>
                            <div className='wrapper-banner-slide'>
                                <div className='banner-background'></div>

                                <Carousel></Carousel>
                            </div>

                        </>
                    }


                </div>




            </div>
            <div className='banner-spacing'></div>
        </>
    );
}

export default Nav;