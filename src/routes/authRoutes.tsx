import { AuthenticateRoute, PublicRoute } from '../components/routes'
import {
  LoginView,
  RegistrationView
} from '../views'
import CommonLayout from '@/layouts/CommonLayout'

export default [
  {
    path: '/login',
    title: 'Login',
    component: LoginView,
    route: AuthenticateRoute,
    roles: [],
    permission: [],
    breadcrumb: 'Login',
    exact: true,
    layout: CommonLayout
  },
  {
    path: '/register',
    title: 'Register',
    component: RegistrationView,
    route: PublicRoute,
    roles: [],
    permission: [],
    breadcrumb: 'Register',
    exact: true,
    layout: CommonLayout
  }
]
