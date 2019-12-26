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
  groupId: string,
  department: string,
  data: Week[],
  auth: string | null
}

export interface PackedGroups {
  department: string,
  data: Group[],
  auth: string | null
}