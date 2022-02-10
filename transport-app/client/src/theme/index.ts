import { createMuiTheme } from '@material-ui/core/styles'

import typography from './typography'
import overrides from './overrides'
import palette from './palette'

const theme = createMuiTheme({
  typography,
  overrides,
  palette,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
    modal: 1300,
    snackbar: 1250
  }
})

export default theme
