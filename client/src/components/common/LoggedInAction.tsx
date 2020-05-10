import React, { Fragment, useState, useMemo, memo } from 'react'
import { MenuDown, MenuUp } from 'mdi-material-ui'
import { AuthUser } from '@types'
import { useLocation } from 'react-router'

import {
  createStyles,
  makeStyles,
  Button,
  Typography as T,
  Avatar,
  colors,
  Popper,
  Fade,
  Paper,
  ClickAwayListener,
  Divider,
  Hidden
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    loggedIn: {
      display: 'flex',
      alignSelf: 'center',
      margin: theme.spacing(0, 2, 0, 3),
      cursor: 'pointer',
      userSelect: 'none',
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0, 0, 0, 3)
      }
    },
    avatar: {
      color: theme.palette.common.white,
      marginRight: theme.spacing(0.75),
      fontSize: theme.typography.body1.fontSize,
      backgroundColor: colors.blue[600]
    },
    innerAvatar: {
      color: theme.palette.common.white,
      marginBottom: theme.spacing(0.75),
      fontSize: theme.typography.h3.fontSize,
      backgroundColor: colors.blue[600],
      width: '100px',
      height: '100px'
    },
    text: {
      alignSelf: 'center'
    },
    popper: {
      marginTop: theme.spacing(1.5),
      zIndex: theme.zIndex.appBar - 50
    },
    top: {
      marginBottom: theme.spacing(1),
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    bottom: {
      marginTop: theme.spacing(1),
      textAlign: 'center'
    },
    rootPaper: {
      borderBottomLeftRadius: theme.spacing(1),
      borderBottomRightRadius: theme.spacing(1),
      minWidth: '240px',
      maxWidth: '240px'
    },
    wrap: {
      padding: theme.spacing(2)
    },
    subtext: {
      color: theme.palette.text.secondary
    }
  })
)

const getFirstLetters = (name: string) => {
  return name.charAt(0)
}

interface Props {
  auth: AuthUser | null,
  revokeAuth: () => void
}

export const LoggedInAction = memo(({
  auth,
  revokeAuth
}: Props) => {
  const classes = useStyles()
  const { pathname } = useLocation()
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  useMemo(() => {
    setOpen(false)
  }, [pathname])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen(!open)
  }

  if (!auth) {
    return <Fragment />
  }

  return (
    <>
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement='bottom'
        transition
        className={classes.popper}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Fade {...TransitionProps} timeout={200}>
              <Paper square classes={{ root: classes.rootPaper }}>
                <div className={classes.wrap}>
                  <div className={classes.top}>
                    <Avatar
                      className={classes.innerAvatar}
                    >{getFirstLetters(auth.user.name)}</Avatar>
                  </div>
                  <div className={classes.bottom}>
                    <T variant='body1'>{auth.user.name}</T>
                    <T variant='body2' className={classes.subtext}>{auth.user.email}</T>
                    <T variant='body2' className={classes.subtext}>{auth.user.role}</T>
                  </div>
                </div>
                <Divider variant='fullWidth' />
                <div className={classes.wrap}>
                  <div>
                    <Button
                      variant='outlined'
                      color='default'
                      fullWidth
                      onClick={revokeAuth}
                    >
                      Kirjaudu ulos
                    </Button>
                  </div>
                </div>
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
      <div
        className={classes.loggedIn}
        onClick={handleClick}
      >
        <Avatar
          className={classes.avatar}
        >{getFirstLetters(auth.user.name)}</Avatar>
        <Hidden xsDown>
          <>
            <T className={classes.text}>{auth.user.name}</T>
            {open ? <MenuUp className={classes.text} /> : <MenuDown className={classes.text} /> }
          </>
        </Hidden>
      </div>
    </>
  )
})
