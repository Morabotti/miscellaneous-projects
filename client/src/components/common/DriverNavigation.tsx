import React, { memo, Fragment } from 'react'
import { OuterNotAccessed } from '@components/common'
import { DotsVertical } from 'mdi-material-ui'
import { useAuth } from '@hooks'
import clsx from 'clsx'

import {
  createStyles,
  makeStyles,
  Paper,
  Typography as T,
  Fab
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  centerer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  top: {
    minHeight: theme.spacing(14),
    padding: theme.spacing(2, 2.5),
    backgroundImage: 'url(/assets/general-background.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  root: {
    padding: theme.spacing(2.5),
    minHeight: '100%',
    flex: 1,
    borderTopLeftRadius: theme.spacing(2.5),
    borderTopRightRadius: theme.spacing(2.5)
  },
  flex: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  subtitle: {
    textTransform: 'uppercase'
  },
  icon: {
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  action: {
    display: 'flex',
    alignSelf: 'center'
  },
  elevation: {
    boxShadow: 'none !important'
  }
}))

type HeaderVariant = 'default' | 'children'

interface Props {
  children: JSX.Element | JSX.Element[],
  header?: JSX.Element | JSX.Element[],
  variant?: HeaderVariant
}

export const DriverNavigation = memo(({
  children,
  header,
  variant = 'default'
}: Props) => {
  const classes = useStyles()
  const { auth, revokeAuth } = useAuth()

  if (auth === null || auth.user.role !== 'driver') {
    return (
      <OuterNotAccessed
        onLogout={revokeAuth}
        auth={auth}
      />
    )
  }

  return (
    <div className={classes.flex}>
      <div
        className={clsx(classes.top, {
          [classes.centerer]: variant === 'default'
        })}
      >
        <NavigationHeader variant={variant}>
          {header}
        </NavigationHeader>
      </div>
      <Paper classes={{ root: classes.root }}>
        <div>
          {children}
        </div>
      </Paper>
    </div>
  )
})

interface HeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any,
  variant?: HeaderVariant
}

const NavigationHeader = ({
  children,
  variant
}: HeaderProps) => {
  const classes = useStyles()

  switch (variant) {
    case 'children':
      return children

    case 'default':
      return (
        <>
          <div>
            <T variant='h3'>Transport</T>
            <T variant='h5' className={classes.subtitle} color='primary'>App</T>
          </div>
          <div className={classes.action}>
            <Fab size='small' color='default' className={classes.elevation}>
              <DotsVertical />
            </Fab>
          </div>
        </>
      )
    default:
      return <Fragment />
  }
}
