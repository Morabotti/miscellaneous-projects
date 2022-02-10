import React, { memo, useCallback } from 'react'
import { Typography as T, makeStyles, createStyles, Button } from '@material-ui/core'
import { Cancel } from 'mdi-material-ui'
import { useHistory } from 'react-router-dom'
import { RouteTypes, AuthUser } from '@types'
import { routes } from '@components/Application'

const useStyles = makeStyles(theme => createStyles({
  root: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2)
  },
  icon: {
    width: '6em',
    height: '6em'
  },
  text: {
    fontSize: theme.typography.h4.fontSize
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
  offset: {
    marginRight: theme.spacing(1)
  }
}))

interface Props {
  auth: AuthUser | null,
  onLogout: () => void
}

export const OuterNotAccessed = memo(({ auth, onLogout }: Props) => {
  const classes = useStyles()
  const { push } = useHistory()

  const onLogin = useCallback(() => {
    push('/login')
  }, [push])

  const onBack = useCallback(() => {
    if (!auth) {
      push('/login')
      return
    }

    const route = routes.find(i => i.type === RouteTypes.ROUTED
      && i.access.includes(auth.user.role)
    )

    if (route) {
      push(route.path)
    }
  }, [push, auth])

  return (
    <div className={classes.root}>
      <div>
        <Cancel className={classes.icon} />
      </div>
      <T variant='h3' className={classes.text}>This user has no access to this resource</T>
      {auth === null ? (
        <div className={classes.action}>
          <Button
            onClick={onLogin}
            variant='contained'
            color='primary'
            className={classes.offset}
          >
            Back to login
          </Button>
        </div>
      ) : (
        <div className={classes.action}>
          <Button
            onClick={onLogout}
            disabled={!auth}
            variant='contained'
            color='primary'
            className={classes.offset}
          >
            Logout
          </Button>
          <Button
            onClick={onBack}
            disabled={!auth}
            variant='contained'
            color='primary'
          >
            Back to dashboard
          </Button>
        </div>
      )}
    </div>
  )
})
