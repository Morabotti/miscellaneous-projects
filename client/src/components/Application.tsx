import React, { FC, Suspense } from 'react'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import theme from '@theme'

import { ApplicationProvider, AuthProvider } from '@hooks'
import { AuthLayer, SnackbarContainer, SuspenseLoader } from '@components/common'
import { LoginView } from '@components/login'

import '@/index.less'

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
                <Suspense fallback={<SuspenseLoader />}>
                  <Route exact path='/hello'>
                    <div>
                      Helloed
                    </div>
                  </Route>
                </Suspense>
              </ApplicationProvider>
            </SnackbarContainer>
          </AuthLayer>
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  </MuiThemeProvider>
)

export default hot(module)(App)
