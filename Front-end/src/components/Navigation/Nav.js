import React from 'react';
import './Nav.scss'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { FaQuestionCircle } from "react-icons/fa";

const Nav = (props) => {
    return (
        <>
            <div class="top-nav">
                <div className='container p-3 d-flex nav-container'>
                    <div>
                        <img className='logo' alt='logo' src={logo}></img>
                    </div>
                    <NavLink to="news">Chuyên khoa</NavLink>
                    <NavLink to="contact">Cơ sở Y tế</NavLink>
                    <NavLink to="about">Sống khỏe</NavLink>
                    <div className='search-input'>
                        <FaQuestionCircle />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Nav;