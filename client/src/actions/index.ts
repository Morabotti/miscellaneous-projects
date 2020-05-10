export type Action = { type: 'set-loading', loading: boolean }
| { type: 'set-action-loading', actionLoading: boolean }

export const setLoading = (loading: boolean): Action => ({
  type: 'set-loading',
  loading
})

export const setActionLoading = (actionLoading: boolean): Action => ({
  type: 'set-action-loading',
  actionLoading
})
