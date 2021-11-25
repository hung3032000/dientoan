import React, { Fragment, Suspense } from 'react'
import {Route, Switch} from 'react-router-dom'
import { routesConfig } from './routesConfig';
const CreatePage = React.lazy(() => import('../pages/PageCreate'));
const LoginPage = React.lazy(() => import('../pages/Login'));
const RegisterPage = React.lazy(() => import('../pages/Register'));
const DashBoardPage = React.lazy(() => import('../pages/Dashboard'));
import RoutesString from './routesString';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Routes() {
  return (
    <Route
      render={({ location }) => (
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact={true} path={RoutesString.CreatePage} component={CreatePage} />
            <Route exact={true} path={RoutesString.LOGIN} component={LoginPage} />
            <Route exact={true} path={RoutesString.SIGN_UP} component={RegisterPage} />
            <Route exact={true} path={RoutesString.DashboardLayout} component={DashBoardPage} />
            </Switch>
        </Suspense>
      )}
    />
  )
}

export default Routes
