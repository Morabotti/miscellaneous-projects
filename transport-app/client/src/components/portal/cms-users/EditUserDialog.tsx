import React, { memo } from 'react'
import { User } from '@types'
import { Form, Formik } from 'formik'
import { roleListing } from '@utils/enums'
import { FormSelect, FormTextField } from '@components/portal/forms'
import { editUserSchema } from '@utils/schemas'

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
  open: boolean,
  loading?: boolean,
  user: User | null,
  onSubmit: (user: User) => void,
  onClose: () => void
}

export const EditUserDialog = memo(({
  onClose,
  open,
  onSubmit,
  loading = false,
  user
}: Props) => {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='md'
      aria-labelledby='user-edit-dialog-title'
    >
      {(loading || user === null) && <LinearProgress className={classes.loading} />}
      <DialogTitle id='user-edit-dialog-title'>Update user information</DialogTitle>
      {user !== null && (
        <DialogContent>
          <Formik
            initialValues={user}
            onSubmit={onSubmit}
            validationSchema={editUserSchema}
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
      )}
    </Dialog>
  )
})
