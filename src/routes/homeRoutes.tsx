import { PublicRoute } from '../components/routes'
import { HomePageView } from '../views'
import { MainLayout } from '@/layouts'

export default [
  {
    path: '/',
    title: 'Users',
    component: HomePageView,
    route: PublicRoute,
    roles: [],
    permission: [],
    exact: true,
    layout: MainLayout
  }
]
