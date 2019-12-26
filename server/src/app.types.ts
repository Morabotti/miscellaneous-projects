export interface Classes {
  id: number,
  fileShort: string,
  tableName: string,
  fileName: string
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
  length: number
  text: string,
  teacher: string | null,
  room: string | null,
  valid: boolean,
  groups: string[]
}
