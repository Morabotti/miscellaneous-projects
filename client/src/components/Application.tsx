import React, { FC, Suspense, lazy } from 'react'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import theme from '@theme'
import { Routes } from '@types'
import { AuthLayer, SnackbarContainer, SuspenseLoader, Navigation, DriverNavigation } from '@components/common'
import { ViewDashboardOutline } from 'mdi-material-ui'
import { ApplicationProvider, AuthProvider } from '@hooks'
import { LoginView } from '@components/login'

import '@/index.less'

const PortalDashboardView = lazy(() => import('./portal/dashboard/PortalDashboardView'))
const DriverDashboardView = lazy(() => import('./driver/dashboard/DriverDashboardView'))
const DriverVehiclesView = lazy(() => import('./driver/vehicles/DriverVehiclesView'))

export const routes: Routes[] = [{
  section: 'Common',
  path: '/portal/dashboard',
  component: PortalDashboardView,
  icon: ViewDashboardOutline,
  access: ['admin']
}, {
  path: '/driver/dashboard',
  component: DriverDashboardView,
  access: ['driver']
}, {
  path: '/driver/vehicles',
  component: DriverVehiclesView,
  access: ['driver']
}]

export const adminRoutes = routes.filter(i => i.access.includes('admin'))
export const driverRoutes = routes.filter(i => i.access.includes('driver'))

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
                  <Navigation routes={adminRoutes}>
                    <Suspense fallback={<SuspenseLoader />}>
                      {adminRoutes.map(route => (
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
