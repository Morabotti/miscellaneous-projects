export type ScheduleStyle = 'default' | 'vertical' | 'classic'
export type ScheduleThemes = 'default' | 'dark'

export interface Classes {
  id: number,
  fileShort: string,
  tableName: string,
  fileName: string
}

export interface Week {
  weekNum: number,
  weekUrl: string,
  weekData: ScheduleEvent[]
}

export interface ScheduleEvent {
  title: string,
  day: number,
  time: number,
  length: number,
  text: string
}

export interface TimeData {
  fullYear: number,
  year: number,
  week: number,
  date: number,
  month: number,
  day: number
}

export interface Settings {
  style: ScheduleStyle,
  theme: ScheduleThemes,
  useMap: boolean
}
