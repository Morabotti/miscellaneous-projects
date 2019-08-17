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
