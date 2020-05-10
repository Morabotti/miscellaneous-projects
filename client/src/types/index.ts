import { Action as _Action } from '@actions'

export type Action = _Action
export type AuthRoles = 'admin' | 'driver'

export enum LocalStorageKeys {
  TOKEN = 'token'
}

export enum NotificationType {
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  DEFAULT = 'default'
}

interface User {
  id: string,
  name: string,
  email: string,
  role: AuthRoles,
  createdAt: string
}

export interface AuthUser {
  token: string,
  user: User
}

export interface Login {
  email: string,
  password: string
}

export interface RequestContext {
  loading: boolean,
  error: boolean,
  setRequest: (loading: boolean, error?: boolean) => void
}
