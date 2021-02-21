import { createMuiTheme } from '@material-ui/core/styles'

import typography from './typography'
import palette from './palette'

export { customPalette } from './customPalette'

const theme = createMuiTheme({
  typography,
  palette,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
    modal: 1300,
    snackbar: 1250
  }
})

export default theme
