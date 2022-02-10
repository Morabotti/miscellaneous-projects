import React, { memo, useCallback } from 'react'
import { Typography as T, makeStyles, createStyles, Button } from '@material-ui/core'
import { AccountMultipleRemove } from 'mdi-material-ui'
import { useHistory } from 'react-router-dom'
import { AuthRoles, RouteTypes } from '@types'
import { routes } from '@components/Application'

const useStyles = makeStyles(theme => createStyles({
  root: {
    textAlign: 'center',
    color: theme.palette.text.secondary
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
  }
}))

interface Props {
  role?: AuthRoles
}

export const InnerNotAccessed = memo(({ role }: Props) => {
  const classes = useStyles()
  const { push } = useHistory()

  const onBack = useCallback(() => {
    if (!role) {
      return
    }

    const route = routes.find(i => i.type === RouteTypes.ROUTED
      && i.access.includes(role)
    )

    if (route) {
      push(route.path)
    }
  }, [push, role])

  return (
    <div className={classes.root}>
      <div>
        <AccountMultipleRemove className={classes.icon} />
      </div>
      <T variant='h3' className={classes.text}>This user has no access to this resource</T>
      <div className={classes.action}>
        <Button
          onClick={onBack}
          disabled={!role}
          variant='contained'
          color='primary'
        >
          Back to dashboard
        </Button>
      </div>
    </div>
  )
})
