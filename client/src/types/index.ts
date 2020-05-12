import { Action as _Action } from '@actions'
import { ElementType, LazyExoticComponent, FC } from 'react'
import { SvgIconProps } from '@material-ui/core'

export type Action = _Action
export type Order = 'asc' | 'desc'

export enum RouteTypes {
  PRIVATE = 'private',
  ROUTED = 'routed'
}

export enum AuthRoles {
  ADMIN = 'admin',
  DRIVER = 'driver',
  MODERATOR = 'moderator'
}

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

export interface ViewProps {
  access: AuthRoles[]
}

export interface Routes {
  section?: string,
  type: RouteTypes,

  path: string,
  name?: string,
  icon?: ElementType<SvgIconProps>,
  component: LazyExoticComponent<FC<ViewProps>>,
  access: AuthRoles[]
}

export interface User {
  id: string,
  name: string,
  email: string,
  role: AuthRoles,
  createdAt: string
}

export interface NewUser {
  name: string,
  email: string,
  role: AuthRoles,
  password: string
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

export interface ResetPassword {
  password: string
}

export interface HeadCell<T>{
  disablePadding: boolean,
  id: keyof T,
  label: string,
  float: boolean
}

export interface PaginationContext<T> {
  offset: number,
  limit: number,
  setOffset: (set: number) => void,
  setLimit: (set: number) => void,
  filterPagination: (item: T, index: number) => void
}
