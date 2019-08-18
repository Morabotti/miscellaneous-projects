import { ScheduleStyle } from './types'

export const DEPARTMENT = 'department'
export const GROUP = 'id'
export const SETTINGS = 'settings'
export const PREFIX = 7

export const styles: ScheduleStyle[] = [
  'default',
  'classic',
  'vertical'
]

export const days = ['ma', 'ti', 'ke', 'to', 'pe', 'la']

export const times = [
  { from: '08:15', to: '09:00' },
  { from: '09:00', to: '09:45' },
  { from: '10:00', to: '10:45' },
  { from: '11:00', to: '11:45' },
  { from: '11:45', to: '12:30' },
  { from: '12:30', to: '13:15' },
  { from: '13:30', to: '14:15' },
  { from: '14:30', to: '15:15' },
  { from: '15:30', to: '16:15' },
  { from: '16:30', to: '17:15' },
  { from: '17:15', to: '18:00' },
  { from: '18:15', to: '19:00' },
  { from: '19:00', to: '19:45' }
]
