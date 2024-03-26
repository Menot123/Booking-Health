import React from 'react'
import ManageUser from '../admin/components/ManageUser/ManageUser'
import Header from '../admin/components/Header/Header'
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoutes from '../routes/PrivateRoutes';
import { path } from '../../src/utils/index'
import ManageDoctors from '../admin/components/ManageDoctors/ManageDoctors';
import ManageSchedules from '../admin/components/ManageSchedule/ManageSchedules';
import ManagePosts from '../admin/components/ManagePosts/ManagePosts';
import ManageSpecialty from '../admin/components/ManageSpecialty/ManageSpecialty';
import ManageClinic from '../admin/components/ManageClinic/ManageClinic';
import ManagePatients from '../admin/components/ManagePatients/ManagePatients';
import Sidebar from '../admin/components/Sidebar/Sidebar';
import background from '../assets/img/background-light.svg'


function AdminRoute() {
    return (
        <>
            <div className='d-flex '>
                <Sidebar />
                <div className='wrap-header-content d-flex flex-column w-100' style={{ backgroundImage: 'url(' + background + ')' }}>
                    <Header />
                    <Switch>
                        <PrivateRoutes exact path={path.ADMIN} component={ManageUser} />
                        <PrivateRoutes path={path.MANAGE_SPECIALTY} component={ManageSpecialty} />
                        <PrivateRoutes path={path.MANAGE_DOCTORS} component={ManageDoctors} />
                        <PrivateRoutes path={path.MANAGE_POSTS} component={ManagePosts} />
                        <PrivateRoutes path={path.MANAGE_SCHEDULES} component={ManageSchedules} />
                        <PrivateRoutes path={path.MANAGE_SCHEDULES_DOCTOR} component={ManageSchedules} />
                        <PrivateRoutes path={path.MANAGE_CLINIC} component={ManageClinic} />
                        <PrivateRoutes path={path.MANAGE_PATIENTS} component={ManagePatients} />
                    </Switch>
                </div>
            </div>

        </>
    )
}

export default AdminRoute