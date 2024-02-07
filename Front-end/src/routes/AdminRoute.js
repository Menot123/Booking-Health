import React from 'react'
import Header from '../admin/components/Header/Header'
import ManageUser from '../admin/components/ManageUser/ManageUser'
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


function AdminRoute() {
    return (
        <>
            <Header />
            <Switch>
                <PrivateRoutes exact path={path.ADMIN} component={ManageUser} />
                <PrivateRoutes path={path.MANAGE_SPECIALTY} component={ManageSpecialty} />
                <PrivateRoutes path={path.MANAGE_DOCTORS} component={ManageDoctors} />
                <PrivateRoutes path={path.MANAGE_POSTS} component={ManagePosts} />
                <PrivateRoutes path={path.MANAGE_SCHEDULES} component={ManageSchedules} />
                <PrivateRoutes path={path.MANAGE_CLINIC} component={ManageClinic} />
            </Switch>

        </>
    )
}

export default AdminRoute