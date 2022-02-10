import React, { memo } from 'react'
import { User } from '@types'
import moment from 'moment'

import {
  makeStyles,
  createStyles,
  Dialog,
  LinearProgress,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  loading: {
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  margin: {
    marginBottom: theme.spacing(2)
  },
  th: {
    textAlign: 'right',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    paddingRight: 0,
    paddingLeft: theme.spacing(2)
  },
  td: {
    width: '100%'
  },
  actions: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}))

interface Props {
  onClose: () => void,
  open: boolean,
  user: User | null
}

export const UserInspectDialog = memo(({
  onClose,
  open,
  user
}: Props) => {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='md'
      aria-labelledby='user-dialog-title'
    >
      {!user && <LinearProgress className={classes.loading} />}
      <DialogTitle id='user-dialog-title'>User information</DialogTitle>
      {user && (
        <DialogContent>
          <Table size='small'>
            <TableBody>
              <TableRow>
                <TableCell className={classes.th} component='th' scope='row'>ID: </TableCell>
                <TableCell className={classes.td}>{user.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.th} component='th' scope='row'>Name: </TableCell>
                <TableCell className={classes.td}>{user.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.th} component='th' scope='row'>Email: </TableCell>
                <TableCell className={classes.td}>{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.th} component='th' scope='row'>Role: </TableCell>
                <TableCell className={classes.td}>{user.role}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.th} component='th' scope='row'>Creation date: </TableCell>
                <TableCell className={classes.td}>{moment(user.createdAt).format('DD.MM.YYYY HH:mm')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      )}
      <DialogActions className={classes.actions}>
        <Button onClick={onClose} color='primary' variant='contained'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
})
