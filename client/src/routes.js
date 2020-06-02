import React from 'react';
import { Switch, Redirect, Route } from "react-router-dom";
import Welcome from './components/Welcome/Welcome';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Logout from './components/Logout/Logout';
import Error from './components/Error/Error';
import PasswordChange from './components/PasswordChange/PasswordChange';

import DriverWelcome from './components/Driver/Welcome';
import DriverProfile from './components/Driver/Profile';
import DriverTrucks from './components/Driver/Trucks/Trucks';
import DriverCreateTruck from './components/Driver/Trucks/CreateTruck';
import DriverUpdateTruck from './components/Driver/Trucks/UpdateTruck';
import DriverLoads from './components/Driver/Loads/Loads';
import DriverLoad from './components/Driver/Loads/Load';
import DriverMyLoads from './components/Driver/Loads/MyLoads';

import ShipperWelcome from './components/Shipper/Welcome';
import ShipperProfile from './components/Shipper/Profile';
import ShipperProfileDelete from './components/Shipper/ProfileDelete';
import ShipperLoads from './components/Shipper/Loads/Loads';
import ShipperLoad from './components/Shipper/Loads/Load';
import ShipperCreateLoad from './components/Shipper/Loads/CreateLoad';
import ShipperUpdateLoad from './components/Shipper/Loads/UpdateLoad';

export const useRoutes = (isAuthenticated, userType) => {
    console.log("userType: " + userType);
    console.log("isAuthenticated: " + isAuthenticated);

    if (isAuthenticated) {
        if (userType === "driver") {
            return (
                <Switch>
                    <Route exact path="/driver" component={DriverWelcome} />
                    <Route exact path="/driver/profile" component={DriverProfile} />
                    <Route exact path="/driver/profile/password" component={PasswordChange} />
                    <Route exact path="/driver/trucks" component={DriverTrucks} />
                    <Route exact path="/driver/truck/create" component={DriverCreateTruck} />
                    <Route exact path="/driver/truck/update/:id" component={DriverUpdateTruck} />
                    <Route exact path="/driver/loads" component={DriverLoads} />
                    <Route exact path="/driver/load/:id" component={DriverLoad} />
                    <Route exact path="/driver/myloads" component={DriverMyLoads} />
                    <Route exact path="/driver/myload/:id" component={DriverLoad} />
                    <Route exact path="/logout" component={Logout} />
                    <Redirect to="/driver" />
                </Switch>
            );
        }

        if (userType === "shipper") {
            return (
                <Switch>
                    <Route exact path="/shipper" component={ShipperWelcome} />
                    <Route exact path="/shipper/profile" component={ShipperProfile} />
                    <Route exact path="/shipper/profile/password" component={PasswordChange} />
                    <Route exact path="/shipper/profile/delete" component={ShipperProfileDelete} />
                    <Route exact path="/shipper/loads" component={ShipperLoads} />
                    <Route exact path="/shipper/load/create" component={ShipperCreateLoad} />
                    <Route exact path="/shipper/load/:id" component={ShipperLoad} />
                    <Route exact path="/shipper/load/update/:id" component={ShipperUpdateLoad} />
                    <Route exact path="/logout" component={Logout} />
                    <Redirect to="/shipper" />
                </Switch>
            );
        }
    }
    return (
        <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Redirect to="/" />
        </Switch>
    );
};

export default useRoutes;