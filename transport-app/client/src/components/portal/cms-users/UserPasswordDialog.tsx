import React, { memo, useCallback } from 'react'
import { Form, Formik } from 'formik'
import { FormTextField } from '@components/portal/forms'
import { newPasswordSchema } from '@utils/schemas'

import {
  makeStyles,
  createStyles,
  Dialog,
  DialogTitle,
  LinearProgress,
  DialogContent,
  Button
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
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(1),
    '& > button:not(:last-child)': {
      marginRight: theme.spacing(2)
    }
  }
}))

interface Props {
  onClose: () => void,
  open: boolean,
  loading?: boolean,
  onSubmit: (password: string) => void,
  username?: string
}

interface PasswordConfirm {
  password: string,
  rePassword: string
}

const initialValues: PasswordConfirm = ({
  password: '',
  rePassword: ''
})

export const UserPasswordDialog = memo(({
  onClose,
  open,
  onSubmit,
  loading = false,
  username
}: Props) => {
  const classes = useStyles()

  const onNewPassword = useCallback((set: PasswordConfirm) => {
    onSubmit(set.password)
  }, [onSubmit])

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='md'
        aria-labelledby='user-reset-password-dialog-title'
      >
        {loading && <LinearProgress className={classes.loading} />}
        <DialogTitle id='user-reset-password-dialog-title'>Changing password for {username}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={onNewPassword}
            validationSchema={newPasswordSchema}
          >
            {() => (
              <Form>
                <FormTextField
                  required
                  label='New password'
                  name='password'
                  type='new-password'
                  className={classes.margin}
                />
                <FormTextField
                  required
                  label='New password again'
                  name='rePassword'
                  type='new-password'
                  className={classes.margin}
                />
                <div className={classes.actions}>
                  <Button onClick={onClose} color='secondary' variant='contained'>
                    Close
                  </Button>
                  <Button type='submit' color='primary' variant='contained'>
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
})
