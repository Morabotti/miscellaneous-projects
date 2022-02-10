import React, { FC, Suspense, lazy } from 'react'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import theme from '@theme'
import { Routes, AuthRoles, RouteTypes } from '@types'
import { ApplicationProvider, AuthProvider } from '@hooks'
import { LoginView } from '@components/login'

import {
  AuthLayer,
  SnackbarContainer,
  Navigation,
  DriverNavigation,
  SuspenseLoader
} from '@components/common'

import {
  ViewDashboardOutline,
  TruckFastOutline,
  TruckOutline,
  AccountOutline,
  AccountBoxOutline,
  MapMarkerRadiusOutline
} from 'mdi-material-ui'

import '@/index.less'

const PortalDashboardView = lazy(() => import('./portal/dashboard/PortalDashboardView'))
const DriverDashboardView = lazy(() => import('./driver/dashboard/DriverDashboardView'))
const DriverVehiclesView = lazy(() => import('./driver/vehicles/DriverVehiclesView'))

const PortalCustomersView = lazy(() => import('./portal/cms-customers/customers/CustomersView'))
const PortalUsersView = lazy(() => import('./portal/cms-users/UsersView'))

export const routes: Routes[] = [{
  section: 'Common',
  type: RouteTypes.ROUTED,
  name: 'Dashboard',
  path: '/portal/dashboard',
  component: PortalDashboardView,
  icon: ViewDashboardOutline,
  access: [AuthRoles.ADMIN, AuthRoles.MODERATOR]
}, {
  section: 'Common',
  name: 'Transports',
  type: RouteTypes.ROUTED,
  path: '/portal/transports',
  component: PortalDashboardView,
  icon: TruckFastOutline,
  access: [AuthRoles.ADMIN, AuthRoles.MODERATOR]
}, {
  section: 'Content Management',
  name: 'Customers',
  type: RouteTypes.ROUTED,
  path: '/portal/cms/customers',
  component: PortalCustomersView,
  icon: AccountBoxOutline,
  access: [AuthRoles.ADMIN, AuthRoles.MODERATOR]
}, {
  section: 'Content Management',
  name: 'Destinations',
  type: RouteTypes.ROUTED,
  path: '/portal/cms/destinations',
  component: PortalDashboardView,
  icon: MapMarkerRadiusOutline,
  access: [AuthRoles.ADMIN, AuthRoles.MODERATOR]
}, {
  section: 'Content Management',
  name: 'Vehicles',
  type: RouteTypes.ROUTED,
  path: '/portal/cms/vehicles',
  component: PortalDashboardView,
  icon: TruckOutline,
  access: [AuthRoles.ADMIN, AuthRoles.MODERATOR]
}, {
  section: 'Content Management',
  name: 'Users',
  type: RouteTypes.ROUTED,
  path: '/portal/cms/users',
  component: PortalUsersView,
  icon: AccountOutline,
  access: [AuthRoles.ADMIN]
}, {
  path: '/driver/dashboard',
  type: RouteTypes.ROUTED,
  component: DriverDashboardView,
  access: [AuthRoles.DRIVER]
}, {
  path: '/driver/vehicles',
  type: RouteTypes.PRIVATE,
  component: DriverVehiclesView,
  access: [AuthRoles.DRIVER]
}]

export const dashboardRoutes = routes.filter(i => (
  i.access.includes(AuthRoles.ADMIN)
  || i.access.includes(AuthRoles.MODERATOR)
))

export const adminRoutedRoutes = dashboardRoutes.filter(i => i.type === RouteTypes.ROUTED)
export const driverRoutes = routes.filter(i => i.access.includes(AuthRoles.DRIVER))

export const dashboardSections = [...new Set(dashboardRoutes.map(i => i.section))]
  .map(section => {
    const access = [...new Set(dashboardRoutes
      .filter(i => i.section === section)
      .flatMap(i => i.access))]

    return { section, access }
  })

const App: FC = () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <CssBaseline />
        <Switch>
          <Route exact path='/login'>
            <LoginView />
          </Route>
          <AuthLayer>
            <SnackbarContainer>
              <ApplicationProvider>
                <Route path='/driver'>
                  <DriverNavigation>
                    <Suspense fallback={<SuspenseLoader />}>
                      {driverRoutes.map(route => (
                        <Route exact key={route.path} path={route.path}>
                          <route.component access={route.access} />
                        </Route>
                      ))}
                    </Suspense>
                  </DriverNavigation>
                </Route>
                <Route path='/portal'>
                  <Navigation routes={adminRoutedRoutes}>
                    <Suspense fallback={<SuspenseLoader navbarLoader />}>
                      {dashboardRoutes.map(route => (
                        <Route exact key={route.path} path={route.path}>
                          <route.component access={route.access} />
                        </Route>
                      ))}
                    </Suspense>
                  </Navigation>
                </Route>
              </ApplicationProvider>
            </SnackbarContainer>
          </AuthLayer>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  </MuiThemeProvider>
)

export default hot(module)(App)
