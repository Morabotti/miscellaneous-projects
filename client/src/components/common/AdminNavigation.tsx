import React, { ReactNode, memo, useState, useCallback } from 'react'
import { Routes } from '@types'
import { useAuth, useApplication } from '@hooks'
import { LoggedInAction, OuterNotAccessed } from '@components/common'
import { Menu } from 'mdi-material-ui'
import { Link, useLocation } from 'react-router-dom'
import { adminSections } from '@components/Application'

import {
  createStyles,
  makeStyles,
  AppBar,
  Toolbar,
  Typography as T,
  IconButton,
  Container,
  LinearProgress,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  SwipeableDrawer
} from '@material-ui/core'

const drawerWidth = 250
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
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflowX: 'hidden'
  },
  list: {
    width: drawerWidth
  },
  toolbarDrawer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1, 0, 2),
    ...theme.mixins.toolbar
  },
  section: {
    fontWeight: 600,
    paddingLeft: theme.spacing(2)
  },
  bar: {
    backgroundColor: theme.palette.primary.dark
  },
  loader: {
    position: 'absolute',
    height: theme.spacing(1),
    top: 64,
    left: 0,
    width: '100%'
  }
}))

interface Props {
  children: ReactNode,
  routes: Routes[]
}

export const Navigation = memo(({ children, routes }: Props) => {
  const { auth, revokeAuth } = useAuth()
  const { state: { loading, dashboardContainer } } = useApplication()
  const [ drawer, setDrawer ] = useState(false)
  const { pathname } = useLocation()
  const classes = useStyles()

  const onDrawer = useCallback(
    (set: boolean) => () => setDrawer(set),
    [setDrawer]
  )

  if (auth === null || auth.user.role !== 'admin') {
    return (
      <OuterNotAccessed
        onLogout={revokeAuth}
        auth={auth}
      />
    )
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.bar}>
        <Toolbar>
          <Hidden lgUp>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              onClick={onDrawer(true)}
            >
              <Menu fontSize='large' />
            </IconButton>
          </Hidden>
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
          <LinearProgress className={classes.loader} />
        )}
      </AppBar>
      <Hidden lgUp>
        <SwipeableDrawer
          open={drawer}
          onClose={onDrawer(false)}
          onOpen={onDrawer(true)}
        >
          <div
            className={classes.list}
            role='presentation'
            onClick={onDrawer(false)}
            onKeyDown={onDrawer(false)}
          >
            <div className={classes.toolbarDrawer} />
            {adminSections.map(section => (
              <div key={section}>
                {section !== 'Common' && (
                  <T variant='body1' className={classes.section}>{section}</T>
                )}
                <List>
                  {routes.filter(i => i.section === section).map(route => (
                    <ListItem
                      key={route.path}
                      component={Link}
                      button to={route.path}
                      selected={pathname === route.path}
                    >
                      {route.icon && (
                        <ListItemIcon>
                          <route.icon />
                        </ListItemIcon>
                      )}
                      <ListItemText>{route.name}</ListItemText>
                    </ListItem>
                  ))}
                </List>
              </div>
            ))}
          </div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          variant='permanent'
          className={classes.drawer}
          classes={{ paper: classes.drawer }}
          open
        >
          <div className={classes.toolbar} />
          {adminSections.map(section => (
            <div key={section}>
              {section !== 'Common' && (
                <T variant='body1' className={classes.section}>{section}</T>
              )}
              <List>
                {routes.filter(i => i.section === section).map(route => (
                  <ListItem
                    key={route.path}
                    component={Link}
                    button to={route.path}
                    selected={pathname === route.path}
                  >
                    {route.icon && (
                      <ListItemIcon>
                        <route.icon />
                      </ListItemIcon>
                    )}
                    <ListItemText>{route.name}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </div>
          ))}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        {dashboardContainer ? (
          <>
            <div className={classes.toolbar} />
            <Container className={classes.container} maxWidth='md'>
              {children}
            </Container>
          </>
        ) : children}
      </main>
    </div>
  )
})
