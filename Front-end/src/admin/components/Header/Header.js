import React from 'react';
import './Header.scss'
import { NavLink } from 'react-router-dom'
import { TbLogout } from "react-icons/tb";
import { useHistory } from 'react-router-dom'


function Navbar() {
    const history = useHistory()

    const handleLogout = () => {
        history.push('/login')
    }

    return (
        <>
            <div className='navigation-bar d-flex justify-content-between'>
                <div className='nav-content-left d-flex '>
                    <div className='nav-item'>
                        <span className='nav-item-title'>Người dùng</span>
                        <div className="sub-menu sub-menu-long">
                            <div className='wrapper-link'>
                                <NavLink to="CRUD-user">CRUD User</NavLink>

                            </div>
                            <div className='wrapper-link'>
                                <NavLink to="manage-doctors">Quản lý bác sĩ</NavLink>

                            </div>
                            <div className='wrapper-link'>
                                <NavLink to="manage-schedules">Quản lý kế hoạch khám bệnh</NavLink>
                            </div>
                        </div>
                    </div>

                    <div className='nav-item'>
                        <span className='nav-item-title'>Phòng khám</span>
                        <div className="sub-menu ">
                            <div className='wrapper-link'>
                                <NavLink to="manage-clinics">Quản lý phòng khám</NavLink>
                            </div>
                        </div>
                    </div>

                    <div className='nav-item'>
                        <span className='nav-item-title'>Chuyên khoa</span>
                        <div className="sub-menu ">
                            <div className='wrapper-link'>
                                <NavLink to="manage-specialties">Quản lý Chuyên khoa</NavLink>
                            </div>
                        </div>
                    </div>

                    <div className='nav-item'>
                        <span className='nav-item-title'>Cẩm nang</span>
                        <div className="sub-menu ">
                            <div className='wrapper-link'>
                                <NavLink to="manage-posts">Quản lý cẩm nang</NavLink>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='nav-content-right'>
                    <div className='hello-user'>Xin Chào, Felix</div>
                    <div className='change-language'>
                        <span className='lang-vi active'>VN</span>
                        <span className='lang-en'>EN</span>
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