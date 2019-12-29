import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { AppProvider } from '@hooks'
import { SuspenseLoader } from '@components/common'
import { I18nextProvider } from 'react-i18next'
import initTranslations from '@translations'

import '../index.less'

const EntryMain = lazy(() => import(/* webpackPreload: true */'./entry/EntryMain'))
const ScheduleMain = lazy(() => import(/* webpackPreload: true */'./schedule/ScheduleMain'))
const SettingsMain = lazy(() => import('./settings/SettingsMain'))
const InfoMain = lazy(() => import('./info/InfoMain'))

const translations = initTranslations()

const routes = [
  {
    path: '/',
    exact: true,
    component: EntryMain
  }, {
    path: '/schedule/:department/:id',
    exact: false,
    component: ScheduleMain
  }, {
    path: '/settings',
    exact: false,
    component: SettingsMain
  }, {
    path: '/info',
    exact: false,
    component: InfoMain
  }
]

const App = () => (
  <AppProvider>
    <I18nextProvider i18n={translations}>
      <BrowserRouter>
        <Suspense fallback={<SuspenseLoader />}>
          <Switch>
            {routes.map(route => (
              <Route path={route.path} key={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </I18nextProvider>
  </AppProvider>
)

export default hot(module)(App)
