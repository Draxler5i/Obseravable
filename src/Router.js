import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SimpleGet from './SimpleGet';
// import WrapperProfile from '../WrapperProfile/WrapperProfile';

const Router = () => (
    <Switch>
        <Route exact path="/" component={SimpleGet} />
        {/* <Route exact path="/:id" component={WrapperProfile} /> */}
    </Switch>
);

export default Router;