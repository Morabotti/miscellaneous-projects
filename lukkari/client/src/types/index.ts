export type ScheduleStyle = 'default' | 'vertical' | 'classic'
export type ScheduleThemes = 'default' | 'dark'

export interface Classes {
  groupId: string,
  fullName: string,
  groupName: string
}

export interface Department {
  en: string,
  fi: string
}

export interface Teacher {
  id: string,
  name: string
}

export interface Room {
  name: string,
  floor: string,
  y: number,
  x: number
}

export interface Week {
  group: string,
  weekNum: number,
  weekUrl: string,
  weekData: ScheduleEvent[]
}

export interface ScheduleEvent {
  title: string,
  day: number,
  time: number,
  length: number,
  text: string,
  teacher: string | null,
  room: string | null,
  groups: string[],
  valid: boolean
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
  lang: string,
  useMap: boolean
}
