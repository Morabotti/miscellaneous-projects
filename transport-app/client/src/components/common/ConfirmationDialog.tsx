import React, { memo } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  LinearProgress,
  makeStyles,
  createStyles
} from '@material-ui/core'

const useStyles = makeStyles(() => createStyles({
  loading: {
    position: 'absolute',
    top: 0,
    width: '100%'
  }
}))

interface Props {
  open: boolean,
  onClose: () => void,
  onConfirm: () => void,
  title: string,
  description?: string,
  loading?: boolean,
  children?: React.ReactNode
}

export const ConfirmationDialog = memo(({
  open,
  onClose,
  onConfirm,
  description,
  title,
  loading = false,
  children
}: Props) => {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      aria-labelledby='confirm-dialog-title'
      aria-describedby='confirm-dialog-description'
    >
      {loading && <LinearProgress className={classes.loading} />}
      <DialogTitle id='confirm-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        {children || (
          <DialogContentText id='confirm-dialog-description'>
            {description}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary' variant='contained'>
          Cancel
        </Button>
        <Button onClick={onConfirm} color='primary' variant='contained'>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
})
