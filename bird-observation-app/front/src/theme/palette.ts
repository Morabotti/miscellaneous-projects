import { PaletteOptions } from '@material-ui/core/styles/createPalette'

const white = '#fff'
const black = '#000'

const palette: PaletteOptions = {
  common: {
    white,
    black
  },
  primary: {
    contrastText: white,
    light: '#3357b4',
    main: '#002Da2',
    dark: '#001f71'
  },
  secondary: {
    contrastText: white,
    dark: '#a13e56',
    main: '#E75A7C',
    light: '#eb7b96'
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: white
  },
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.54)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)'
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: white,
    default: '#eaeff1'
  },
  action: {
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(0, 0, 0, 0.14)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)'
  }
}

export default palette
