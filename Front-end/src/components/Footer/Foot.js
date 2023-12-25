import React from 'react';
import './Foot.scss'
import { FaHome, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from '../../assets/img/logo.png'
import { useHistory } from "react-router-dom";
import { FormattedMessage } from 'react-intl'

const Foot = (props) => {
    let history = useHistory();
    const handleClickLogoFooter = () => {
        history.push("/");
    }
    const handleNavigateToPage = (path) => {
        history.push(path);
    };
    return (
        <>
            <div className="bg-body-tertiary bg-light">
                <section>
                    <div className="container text-center text-md-start">
                    <div className="row mt-3">
                        <div className="col-md-6 col-lg-6 col-xl-5 mx-auto mb-4 mt-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <FormattedMessage id='footer.about-us-title' />
                            </h6>
                            <p>
                                <span>
                                    <FormattedMessage id='footer.about-us-body' />
                                </span>
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 mt-4">
                            <div className='img-logo-footer mb-4' onClick={() => handleClickLogoFooter()}>
                                <img className='logo-footer' alt='logo' src={logo}></img>
                            </div>
                            <p>
                                <span onClick={() => handleNavigateToPage("/chuyen-khoa")} className="text-reset text-uppercase" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                    <FormattedMessage id='homepage.specialty' />
                                </span>
                            </p>
                            <p>
                                <span onClick={() => handleNavigateToPage("/co-so-y-te")} className="text-reset text-uppercase" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                    <FormattedMessage id='homepage.facilities' />
                                </span>
                            </p>
                            <p>
                                <span onClick={() => handleNavigateToPage("/song-khoe")} className="text-reset text-uppercase" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                    <FormattedMessage id='homepage.live-healthy' />
                                </span>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 mt-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <FormattedMessage id='footer.contact' />
                            </h6>
                            <p><FaHome /> <FormattedMessage id='footer.location' /></p>
                            <p><FaEnvelope /> bookinghealth@gmail.com (7h-18h)</p>
                            <p><FaPhone /> 0123456789 (7h-18h)</p>
                        </div>
                    </div>
                    </div>
                </section>
                <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.025)' }}>
                    © 2023 BookingHealth:
                    <a className="text-reset fw-bold ms-1" href="https://gitlab.duthu.net/S52000035/it42day_n01t1_hk1_2324_dacntt">IT24Day</a>
                </div>
            </div>
        </>
    );
}

export default Foot;