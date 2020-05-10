export type Action = { type: 'set-loading', loading: boolean }
| { type: 'set-action-loading', actionLoading: boolean }
| { type: 'set-dashboard-container', dashboardContainer: boolean }

export const setLoading = (loading: boolean): Action => ({
  type: 'set-loading',
  loading
})

export const setActionLoading = (actionLoading: boolean): Action => ({
  type: 'set-action-loading',
  actionLoading
})

export const setDashboardContainer = (dashboardContainer: boolean): Action => ({
  type: 'set-dashboard-container',
  dashboardContainer
})
