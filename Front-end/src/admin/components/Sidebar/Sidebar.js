import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { FaClinicMedical } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import './Sidebar.scss'
import { FormattedMessage } from 'react-intl'
import { useSelector, useDispatch } from 'react-redux';
import { FaUsers } from "react-icons/fa";


const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const role = useSelector(state => state.userRedux.role)

    const toggle = () => setIsOpen(!isOpen);
    const menuItem =
        role !== 'R2' ?
            [
                {
                    path: "/admin",
                    name: <FormattedMessage id='admin-sidebar.user' />,
                    icon: <FaUserAlt />
                },
                {
                    path: "/admin/manage-doctors",
                    name: <FormattedMessage id='admin-sidebar.doctor' />,
                    icon: <FaUserDoctor />
                },
                {
                    path: "/admin/manage-schedules",
                    name: <FormattedMessage id='admin-sidebar.schedule' />,
                    icon: <GrSchedules />
                },
                {
                    path: "/admin/manage-clinics",
                    name: <FormattedMessage id='admin-sidebar.clinic' />,
                    icon: <FaClinicMedical />
                },
                {
                    path: "/admin/manage-specialties",
                    name: <FormattedMessage id='admin-sidebar.specialty' />,
                    icon: <FaThList />
                }
                ,
                {
                    path: "/admin/manage-posts",
                    name: <FormattedMessage id='admin-sidebar.handbook' />,
                    icon: <BsPostcard />
                }
            ]
            :
            [

                {
                    path: "/admin/manage-schedules",
                    name: <FormattedMessage id='admin-sidebar.schedule' />,
                    icon: <GrSchedules />
                },
                {
                    path: "/doctor/manage-patients",
                    name: <FormattedMessage id='admin-sidebar.patient' />,
                    icon: <FaUsers />
                },

            ]


    return (
        <div className="container-sidebar">
            <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
                        Admin
                    </h1>
                    <div style={{ marginLeft: isOpen ? "100px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink exact to={item.path} key={index} className="link">
                            <div className="icon">{item.icon}</div>
                            < div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div >
            <main>{children}</main>
        </div >
    );
};

export default Sidebar;