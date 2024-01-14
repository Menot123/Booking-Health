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



function AdminRoute() {
    return (
        <>
            <Header />
            <Switch>
                <PrivateRoutes exact path={path.ADMIN} component={ManageUser} />
                <PrivateRoutes path={path.MANAGE_DOCTORS} component={ManageDoctors} />
            </Switch>

        </>
    )
}

export default AdminRoute