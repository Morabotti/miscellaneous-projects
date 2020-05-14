import React from 'react'
import { ViewProps } from '@types'
import { useAuth, useUsers } from '@hooks'
import { Plus } from 'mdi-material-ui'

import {
  UserTable,
  NewUserDialog,
  UserInspectDialog,
  EditUserDialog,
  UserPasswordDialog,
  UserTableHeader,
  UserPagination
} from '@components/portal/cms-users'

import {
  Section,
  ActionButton,
  InnerNotAccessed,
  ConfirmationDialog
} from '@components/common'

const UsersView = ({
  access
}: ViewProps) => {
  const { auth } = useAuth()
  const hasAccess = auth !== null && access.indexOf(auth.user.role) !== -1

  if (!hasAccess || !auth) {
    return (
      <InnerNotAccessed role={auth?.user.role} />
    )
  }

  const {
    pagination,
    users,
    filters,
    addingDialogOpen,
    deletingUser,
    deletingMultiple,
    inspectUser,
    changingPass,
    editUser,
    selected,
    setSelected,
    toggleAddUser,
    toggleUserDelete,
    toggleUserInspect,
    toggleUserEdit,
    toggleUserChangePassword,
    toggleMultipleDeleting,
    onNewUser,
    onDeleteUser,
    onChangePassword,
    onEditUser,
    onDeleteSelected,
    onFilterChange,
    loading
  } = useUsers()

  return (
    <>
      <Section title='Users'>
        <UserTableHeader
          length={users?.length || null}
          disable={loading}
          isSelected={selected.length === 0}
          onDeleteSelected={toggleMultipleDeleting(selected)}
        />
        <UserTable
          users={users}
          selected={selected}
          setSelected={setSelected}
          filters={filters}
          filter={pagination.filterPagination}
          onPasswordChange={toggleUserChangePassword}
          onFilterChange={onFilterChange}
          onDelete={toggleUserDelete}
          onEdit={toggleUserEdit}
          onInspect={toggleUserInspect}
        />
        <UserPagination
          setOffset={pagination.setOffset}
          setLimit={pagination.setLimit}
          offset={pagination.offset}
          limit={pagination.limit}
          length={users?.length || null}
          loading={loading}
        />
      </Section>
      <ActionButton
        title='Add new customer'
        onClick={toggleAddUser(true)}
        icon={<Plus />}
        color='secondary'
        single
      />
      <NewUserDialog
        open={addingDialogOpen}
        onClose={toggleAddUser(false)}
        onSubmit={onNewUser}
        loading={loading}
      />
      <ConfirmationDialog
        open={deletingUser !== null}
        onConfirm={onDeleteUser}
        onClose={() => toggleUserDelete(null)}
        loading={loading}
        title='Confirmation'
        description='Are you sure, that you want to use delete this user?'
      />
      <ConfirmationDialog
        open={deletingMultiple !== null}
        onConfirm={onDeleteSelected}
        onClose={toggleMultipleDeleting(null)}
        loading={loading}
        title='Confirmation'
        description='Are you sure, that you want to delete selected users?'
      />
      <UserInspectDialog
        open={inspectUser !== null}
        onClose={() => toggleUserInspect(null)}
        user={inspectUser}
      />
      <UserPasswordDialog
        onClose={() => toggleUserChangePassword(null)}
        open={changingPass !== null}
        onSubmit={onChangePassword}
        loading={changingPass === null || loading}
        username={changingPass?.name}
      />
      <EditUserDialog
        onClose={() => toggleUserEdit(null)}
        loading={loading}
        onSubmit={onEditUser}
        open={editUser !== null}
        user={editUser}
      />
    </>
  )
}

export default UsersView
