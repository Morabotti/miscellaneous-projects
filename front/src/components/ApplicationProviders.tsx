import React from 'react'
import theme from '@theme'
import { ApplicationContext } from '@hooks'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'

import {
  MuiThemeProvider,
  CssBaseline,
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core'

const className = createGenerateClassName({
  productionPrefix: 'r'
})

interface Props {
  children: React.ReactNode
}

export const ApplicationProviders = ({ children }: Props) => {
  return (
    <StylesProvider injectFirst generateClassName={className}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider
          locale='en'
          libInstance={moment}
          utils={MomentUtils}
        >
          <ApplicationContext>
            {children}
          </ApplicationContext>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )
}
