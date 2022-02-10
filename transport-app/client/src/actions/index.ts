import { User } from '@types'

export type Action = { type: 'set-loading', loading: boolean }
| { type: 'set-action-loading', actionLoading: boolean }
| { type: 'set-portal-dashboard-container', dashboardContainer: boolean }
| { type: 'set-portal-users', portalUsers: null | User[] }

export const setLoading = (loading: boolean): Action => ({
  type: 'set-loading',
  loading
})

export const setActionLoading = (actionLoading: boolean): Action => ({
  type: 'set-action-loading',
  actionLoading
})

export const setPortalContainer = (dashboardContainer: boolean): Action => ({
  type: 'set-portal-dashboard-container',
  dashboardContainer
})

export const setPortalUsers = (portalUsers: null | User[]): Action => ({
  type: 'set-portal-users',
  portalUsers
})
