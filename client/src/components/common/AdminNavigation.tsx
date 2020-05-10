import React, { ReactNode, memo } from 'react'
import { Routes } from '@types'
import { useAuth, useApplication } from '@hooks'
import { LoggedInAction } from '@components/common'
import { Menu } from 'mdi-material-ui'

import {
  createStyles,
  makeStyles,
  AppBar,
  Toolbar,
  Typography as T,
  IconButton,
  Container,
  LinearProgress
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  root: {
    display: 'flex'
  },
  title: {
    ...theme.typography.h5,
    whiteSpace: 'nowrap'
  },
  titleWrap: {
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 1, 1, 1)
    }
  },
  container: {
    padding: 0
  },
  appBarAction: {
    verticalAlign: 'middle',
    textAlign: 'right',
    marginTop: 0,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(-1.35)
  }
}))

interface Props {
  children: ReactNode,
  routes: Routes[]
}

export const Navigation = memo(({ children, routes }: Props) => {
  const { auth, revokeAuth } = useAuth()
  const { state: { loading } } = useApplication()
  const classes = useStyles()
  console.log(routes)

  if (auth === null || auth.user.role !== 'admin') {
    return (
      <div>
        This role has no access to this path
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            onClick={() => {}}
          >
            <Menu fontSize='large' />
          </IconButton>
          <div className={classes.titleWrap}>
            <T variant='h1' color='inherit' noWrap className={classes.title}>
              Transport App
            </T>
          </div>
          <div className={classes.appBarAction}>
            <LoggedInAction
              auth={auth}
              revokeAuth={revokeAuth}
            />
          </div>
        </Toolbar>
        {loading && (
          <LinearProgress />
        )}
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container className={classes.container} maxWidth='md'>
          {children}
        </Container>
      </main>
    </div>
  )
})
