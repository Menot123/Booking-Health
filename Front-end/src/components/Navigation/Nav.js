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


const Nav = (props) => {
    let history = useHistory();
    const dispatch = useDispatch()
    const language = useSelector(state => state.language.value)

    const handleClickLogo = () => {
        history.push("/");
    }

    const handleClickSupport = () => {
        history.push("/ho-tro");
    }
    return (
        <>
            <div className="top-nav">
                <div className='container p-3 d-flex nav-container'>
                    <div className='img-logo' onClick={() => handleClickLogo()}>
                        <img className='logo' alt='logo' src={logo}></img>
                    </div>
                    <NavLink to="news"><FormattedMessage id='homepage.specialty' /></NavLink>
                    <NavLink to="co-so-y-te"><FormattedMessage id='homepage.facilities' /></NavLink>
                    <NavLink to="song-khoe"><FormattedMessage id='homepage.live-healthy' /></NavLink>
                    <Search />
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

            </div>
        </>
    );
}

export default Nav;