import React, { memo } from 'react'
import clsx from 'clsx'

import {
  makeStyles,
  createStyles,
  Typography as T,
  Paper,
  LinearProgress
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  section: {
    margin: theme.spacing(1, 0),
    display: 'flex',
    justifyContent: 'space-between'
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2)
    }
  },
  header: {
    ...theme.typography.body1,
    color: theme.palette.text.primary,
    fontWeight: 600
  },
  noPaper: {
    marginBottom: theme.spacing(3),
    color: theme.palette.common.white,
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2)
    }
  },
  disablePadding: {
    padding: theme.spacing(0)
  }
}))

interface Props {
  children?: JSX.Element | JSX.Element[] | string,
  actions?: JSX.Element | JSX.Element[] | string,
  loading?: boolean,
  disablePaper?: boolean,
  title: string,
  disablePadding?: boolean
}

export const Section = memo(({
  children,
  title,
  actions,
  loading = false,
  disablePaper = false,
  disablePadding = false
}: Props) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.section}>
        <T variant='h2' className={classes.header}>{title}</T>
        {actions && (actions)}
      </div>
      {loading ? (
        <LinearProgress />
      ) : disablePaper ? (
        <div className={classes.noPaper}>
          {children}
        </div>
      ) : (
        <Paper
          elevation={1}
          component='section'
          className={clsx(classes.paper, {
            [classes.disablePadding]: disablePadding
          })}
        >
          {children}
        </Paper>
      )}
    </>
  )
})
