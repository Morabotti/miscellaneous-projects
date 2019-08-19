import { ScheduleThemes } from '../types'

const getThemeColor = (theme: ScheduleThemes): string => {
  switch (theme) {
    case 'default':
      return '#a91580'
    case 'dark':
      return '#3c4043'
    default:
      return '#a91580'
  }
}

export const updateTheme = (theme: ScheduleThemes) => {
  var metaThemeColor = document.querySelector('meta[name=theme-color]')
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', getThemeColor(theme))
  }
}
