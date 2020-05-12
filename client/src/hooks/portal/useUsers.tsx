import { useState, useCallback, useEffect } from 'react'
import { PaginationContext, User, NewUser, NotificationType } from '@types'
import { useApplication, usePagination } from '@hooks'
import { setPortalUsers, setLoading } from '@actions'

import {
  addNewUser,
  getUsers,
  deleteUser,
  resetPassword,
  editUser as editUserCrud,
  deleteMultipleUsers
} from '@client'

interface UserDashboardContext {
  pagination: PaginationContext<User>,
  users: User[] | null,
  selected: string[],
  addingDialogOpen: boolean,
  deletingUser: string | null,
  deletingMultiple: string[] | null,
  inspectUser: null | User,
  changingPass: null | User,
  editUser: null | User,
  loading: boolean,

  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  toggleUserDelete: (set: null | string) => void,
  toggleUserInspect: (set: null | User) => void,
  toggleUserEdit: (set: null | User) => void,
  toggleUserChangePassword: (set: null | User) => void,
  toggleAddUser: (set: boolean) => () => void,
  toggleMultipleDeleting: (set: null | string[]) => () => void,

  onDeleteSelected: () => void,
  onNewUser: (set: NewUser) => void,
  onEditUser: (set: User) => void,
  onChangePassword: (password: string) => void,
  onDeleteUser: () => void
}

export const useUsers = (): UserDashboardContext => {
  const { state: { portalUsers, loading }, dispatch, createNotification } = useApplication()
  const pagination = usePagination<User>(10)
  const [addingDialogOpen, setAddingDialogOpen] = useState(false)
  const [deletingUser, setDeletingUser] = useState<null | string>(null)
  const [deletingMultiple, setDeletingMultiple] = useState<null | string[]>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [inspectUser, setInspectUser] = useState<null | User>(null)
  const [editUser, setEditUser] = useState<null | User>(null)
  const [changingPass, setChangingPass] = useState<null | User>(null)

  const fetchUsers = useCallback(async () => {
    if (portalUsers !== null) {
      return
    }

    dispatch(setLoading(true))
    const users = await getUsers()
    dispatch(setPortalUsers(users))
    dispatch(setLoading(false))
  }, [portalUsers, dispatch])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const toggleAddUser = useCallback((set: boolean) => () => {
    setAddingDialogOpen(set)
  }, [setAddingDialogOpen])

  const toggleUserInspect = useCallback((user: null | User) => {
    setInspectUser(user)
  }, [setInspectUser])

  const toggleMultipleDeleting = useCallback((users: null | string[]) => () => {
    setDeletingMultiple(users)
  }, [setDeletingMultiple])

  const toggleUserChangePassword = useCallback((user: null | User) => {
    setChangingPass(user)
  }, [setChangingPass])

  const toggleUserDelete = useCallback((id: null | string) => {
    setDeletingUser(id)
  }, [setDeletingUser])

  const toggleUserEdit = useCallback((user: null | User) => {
    setEditUser(user)
  }, [setEditUser])

  const onChangePassword = useCallback(async (password: string) => {
    if (changingPass === null) {
      return
    }

    dispatch(setLoading(true))
    try {
      await resetPassword(changingPass.id, { password })

      createNotification(
        `User password changed successfully.`,
        NotificationType.INFO
      )
    }
    catch (e) {
      createNotification(
        `Changing user's password failed.`,
        NotificationType.ERROR
      )
    }

    dispatch(setLoading(false))
    setChangingPass(null)
  }, [setChangingPass, changingPass, createNotification, dispatch])

  const onDeleteSelected = useCallback(async () => {
    console.log(portalUsers, deletingMultiple)
    if (deletingMultiple === null || portalUsers === null) {
      return
    }

    dispatch(setLoading(true))
    try {
      await deleteMultipleUsers(deletingMultiple)

      const updatedUsers = portalUsers.filter(i => !deletingMultiple.includes(i.id))
      dispatch(setPortalUsers(updatedUsers))

      createNotification(
        `Multiple users successfully deleted.`,
        NotificationType.INFO
      )
    }
    catch (e) {
      createNotification(
        `Failed to delete multiple users.`,
        NotificationType.ERROR
      )
    }

    dispatch(setLoading(false))
    setDeletingMultiple(null)
  }, [dispatch, setDeletingMultiple, portalUsers, createNotification, deletingMultiple])

  const onEditUser = useCallback(async (user: User) => {
    if (editUser === null || portalUsers === null) {
      return
    }

    dispatch(setLoading(true))
    try {
      const newUser = await editUserCrud(user)
      const updatedUsers = portalUsers.map(i => i.id === newUser.id ? newUser : i)
      dispatch(setPortalUsers(updatedUsers))

      createNotification(
        `User's information updated successfully`,
        NotificationType.INFO
      )
    }
    catch (e) {
      createNotification(
        `User's information failed to update`,
        NotificationType.ERROR
      )
    }

    dispatch(setLoading(false))
    setEditUser(null)
  }, [setEditUser, editUser, createNotification, dispatch, portalUsers])

  const onNewUser = useCallback(async (newUser: NewUser) => {
    dispatch(setLoading(true))
    try {
      const user = await addNewUser(newUser)
      const updatedUsers = portalUsers === null ? [user] : [...portalUsers, user]

      dispatch(setPortalUsers(updatedUsers))

      setAddingDialogOpen(false)
      createNotification('New user created successfully.', NotificationType.INFO)
    }
    catch (e) {
      createNotification('Creating new user failed.', NotificationType.ERROR)
    }
    dispatch(setLoading(false))
  }, [dispatch, createNotification, portalUsers])

  const onDeleteUser = useCallback(async () => {
    if (deletingUser === null || portalUsers === null) {
      return
    }

    dispatch(setLoading(true))
    try {
      await deleteUser(deletingUser)

      dispatch(setPortalUsers(portalUsers.filter(i => i.id !== deletingUser)))
      createNotification(`User deleted successfully.`, NotificationType.INFO)
    }
    catch (e) {
      createNotification('Failed to delete user.', NotificationType.ERROR)
    }
    setDeletingUser(null)
    dispatch(setLoading(false))
  }, [createNotification, deletingUser, setDeletingUser, dispatch, portalUsers])

  return {
    pagination,
    loading,
    users: portalUsers,
    selected,
    deletingUser,
    deletingMultiple,
    editUser,
    inspectUser,
    changingPass,
    addingDialogOpen,
    setSelected,
    toggleUserDelete,
    toggleUserInspect,
    toggleUserChangePassword,
    toggleUserEdit,
    toggleAddUser,
    toggleMultipleDeleting,
    onEditUser,
    onChangePassword,
    onDeleteSelected,
    onNewUser,
    onDeleteUser
  }
}
