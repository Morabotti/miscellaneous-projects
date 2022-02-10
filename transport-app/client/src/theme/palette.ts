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
    light: '#fe8c47',
    main: '#f5793a',
    dark: '#dc4714'
  },
  secondary: {
    light: '#4bc2df',
    main: '#1eb3d8',
    dark: '#157d97',
    contrastText: white
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
    default: '#fafafa'
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
