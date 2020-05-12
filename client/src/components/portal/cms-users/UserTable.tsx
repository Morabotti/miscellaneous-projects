import React, { useCallback, useState, memo } from 'react'
import { VisualizedTableHead, InformationMissing } from '@components/portal/shared'
import { stableSort, getSorting } from '@utils/sorting'
import { HeadCell, Order, User } from '@types'
import { DotsVertical, AccountQuestion } from 'mdi-material-ui'
import { Skeleton } from '@material-ui/lab'

import {
  makeStyles,
  createStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  wrap: {
    padding: theme.spacing(0, 2)
  },
  table: {
    minWidth: 750
  },
  icon: {
    padding: '0 3px 0 0'
  }
}))

const headCells: HeadCell<User>[] = [
  { id: 'email', float: false, disablePadding: true, label: 'Email' },
  { id: 'name', float: false, disablePadding: false, label: 'Name' },
  { id: 'role', float: false, disablePadding: false, label: 'Role' }
]

interface Props {
  users: User[] | null,
  selected: string[],
  setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  filter: (item: User, index: number) => void,
  onDelete: (set: string | null) => void,
  onInspect: (set: null | User) => void,
  onEdit: (set: null | User) => void,
  onPasswordChange: (set: null | User) => void
}

export const UserTable = memo(({
  users,
  selected,
  setSelected,
  filter,
  onDelete,
  onInspect,
  onEdit,
  onPasswordChange
}: Props) => {
  const classes = useStyles()
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof User>('email')
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const [select, setSelect] = useState<User | null>(null)

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  const handleSelectAllClick = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (users === null) {
      return
    }

    if (event.target.checked) {
      const newSelecteds = users.map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }, [setSelected, users])

  const handleRequestSort = useCallback((
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }, [orderBy, order, setOrder, setOrderBy])

  const handleClick = useCallback((id: string) => {
    setSelected(prev => prev.indexOf(id) === -1
      ? [...prev, id]
      : prev.filter(i => i !== id)
    )
  }, [setSelected])

  const handleMenu = useCallback((user: User) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setAnchor(e.currentTarget)
    setSelect(user)
  }, [setAnchor, setSelect])

  const closeMenu = useCallback(() => {
    setAnchor(null)
    setSelect(null)
  }, [setAnchor, setSelect])

  const _onDelete = useCallback(() => {
    onDelete(select?.id || null)
    closeMenu()
  }, [onDelete, closeMenu, select])

  const _onInspect = useCallback(() => {
    onInspect(select)
    closeMenu()
  }, [closeMenu, select, onInspect])

  const _onPassword = useCallback(() => {
    onPasswordChange(select)
    closeMenu()
  }, [closeMenu, onPasswordChange, select])

  const _onEdit = useCallback(() => {
    onEdit(select)
    closeMenu()
  }, [closeMenu, onEdit, select])

  if (users === null) {
    return (
      <Skeleton variant='rect' height={70} />
    )
  }

  if (users.length === 0) {
    return (
      <InformationMissing
        Icon={AccountQuestion}
        text='No users found.'
      />
    )
  }

  return (
    <div>
      <Table className={classes.table}>
        <VisualizedTableHead<User>
          numSelected={selected.length}
          rowCount={users.length}
          order={order}
          orderBy={orderBy}
          onSelectAll={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          headCells={headCells}
          showActions
        />
        <TableBody>
          {stableSort<User>(users, getSorting(order, orderBy))
            .filter(filter)
            .map((row) => {
              const isItemSelected = isSelected(row.id)

              return (
                <TableRow
                  hover
                  onClick={() => handleClick(row.id)}
                  role='checkbox'
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell padding='checkbox'>
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell component='th' scope='row' padding='none'>
                    {row.email}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell align='right' className={classes.icon}>
                    <IconButton onClick={handleMenu(row)}>
                      <DotsVertical />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={closeMenu}
      >
        <MenuItem onClick={_onInspect}>Show user information</MenuItem>
        <MenuItem onClick={_onEdit}>Edit user</MenuItem>
        <MenuItem onClick={_onPassword}>Change user password</MenuItem>
        <MenuItem onClick={_onDelete}>Delete user</MenuItem>
      </Menu>
    </div>
  )
})
