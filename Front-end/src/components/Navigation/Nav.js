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
import banner1 from '../../assets/img/banner1.png'
import banner2 from '../../assets/img/banner2.png'
import banner3 from '../../assets/img/banner3.png'


const Nav = (props) => {
    let history = useHistory();
    const dispatch = useDispatch()
    const language = useSelector(state => state.language.value)
    const url = window.location.pathname;
    console.log({ url })

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
                    {/* {url === '/ho-tro' ? ' ' :
                        <>
                            <div className='banner-background'></div>

                            <div className='banner-slide'>
                                <div className='banner-carousel'>
                                    <div id="carouselExampleIndicators" className="carousel slide">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" ></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" ></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active " >
                                                <img src={banner1} className="d-block w-100" alt="banner 1" />
                                            </div>
                                            <div className="carousel-item ">
                                                <img src={banner2} className="d-block w-100" alt='banner2' />
                                            </div>
                                            <div className="carousel-item ">
                                                <img src={banner3} className="d-block w-100" alt="banner3" />
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" >
                                            <span className="carousel-control-prev-icon" aria-hidden="true" ></span>
                                            <span className="visually-hidden" >Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    } */}


                </div>




            </div>
            <div className='banner-spacing'></div>
        </>
    );
}

export default Nav;