import React, { useState, useCallback, useMemo, memo } from 'react'
import { NewUser, AuthRoles } from '@types'
import { Form, Formik } from 'formik'
import { EyeOutline, EyeOffOutline } from 'mdi-material-ui'
import { roleListing } from '@utils/enums'
import { FormSelect, FormTextField } from '@components/portal/forms'
import { newUserSchema } from '@utils/schemas'

import {
  makeStyles,
  createStyles,
  Dialog,
  DialogTitle,
  LinearProgress,
  DialogContent,
  Button,
  IconButton
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
  onSubmit: (user: NewUser) => void
}

const initialValues: NewUser = ({
  email: '',
  name: '',
  role: AuthRoles.ADMIN,
  password: ''
})

export const NewUserDialog = memo(({
  onClose,
  open,
  onSubmit,
  loading = false
}: Props) => {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [setShowPassword])

  useMemo(() => {
    if (!open && showPassword) {
      setShowPassword(false)
    }
  }, [open, showPassword, setShowPassword])

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='md'
        aria-labelledby='user-add-dialog-title'
      >
        {loading && <LinearProgress className={classes.loading} />}
        <DialogTitle id='user-add-dialog-title'>Add new user</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={newUserSchema}
          >
            {() => (
              <Form>
                <FormSelect
                  name='role'
                  label='Role'
                  className={classes.margin}
                  options={roleListing}
                />
                <FormTextField
                  required
                  label='Email'
                  name='email'
                  type='text'
                  className={classes.margin}
                />
                <FormTextField
                  required
                  label='Name'
                  name='name'
                  type='text'
                  className={classes.margin}
                />
                <FormTextField
                  required
                  label='Password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={showPassword
                    ? <IconButton onClick={togglePassword}><EyeOffOutline /></IconButton>
                    : <IconButton onClick={togglePassword}><EyeOutline /></IconButton>
                  }
                  className={classes.margin}
                />
                <div className={classes.actions}>
                  <Button onClick={onClose} color='secondary' variant='contained'>
                    Close
                  </Button>
                  <Button type='submit' color='primary' variant='contained'>
                    Add
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
