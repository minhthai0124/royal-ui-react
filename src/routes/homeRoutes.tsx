import { AuthenticatedRoute } from '../components/routes'
import { HomePageView } from '../views'
import { MainLayout } from '@/layouts'

export default [
  {
    path: '/',
    title: 'Users',
    component: HomePageView,
    route: AuthenticatedRoute,
    roles: [],
    permission: [],
    exact: true,
    layout: MainLayout
  }
]
