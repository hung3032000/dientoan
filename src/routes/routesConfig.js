import { lazy } from 'react';
import RoutesString from './routesString';
const Error404Page = lazy(() => import('../pages/NotFound'));
const DashboardLayout = lazy(() => import('../components/DashboardLayout'));
const CreatePage = lazy(() => import('../pages/PageCreate'));
const LoginPage = lazy(() => import('../pages/Login'));
const RegisterPage = lazy(() => import('../pages/Register'));
const MainLayout = lazy(() => import('../components/MainLayout'));
export const routesConfig = [
  {
    page: Error404Page,
    path: RoutesString.Error404,
    exact: true
  },
  {
    layout: DashboardLayout,
    path: RoutesString.DashboardLayout,
    routes: [
      {
        page: CreatePage,
        path: RoutesString.CreatePage,
        exact: true,
      }
    ]
  },
  {
    layout: MainLayout,
    path: "/",
    routes: [
      {
        page: LoginPage,
        path: RoutesString.LOGIN
      },
      {
        page: RegisterPage,
        path: RoutesString.SIGN_UP
      }
    ]
  },
  {
    page: Error404Page,
    path: '*'
  }
];
