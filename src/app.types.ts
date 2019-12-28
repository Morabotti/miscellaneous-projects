export interface Group {
  groupId: string,
  fullName: string,
  groupName: string
}

export interface ScheduleList {
  url: string,
  group: string
}

export interface WeekList {
  url: string,
  week: number
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

export interface Week {
  group: string,
  weekNum: number,
  weekUrl: string,
  weekData: ScheduleEvent[]
}

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export interface PackedSchedule {
  name: string,
  groupId: string,
  department: string,
  data: Week[],
  token: string | null
}

export interface PackedGroups {
  name: string,
  department: string,
  data: Group[],
  token: string | null
}
