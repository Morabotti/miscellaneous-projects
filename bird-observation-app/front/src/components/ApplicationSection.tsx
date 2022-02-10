import React, { memo } from 'react'
import { Skeleton } from '@material-ui/lab'
import { customPalette } from '@theme'
import clsx from 'clsx'

import {
  Paper,
  makeStyles,
  Typography as T
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  padding: {
    padding: theme.spacing(2),
    [theme.breakpoints.down(425)]: {
      padding: theme.spacing(1.5)
    }
  },
  root: {
    flexGrow: 1
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: '30px',
    marginBottom: theme.spacing(0.5),
    height: '30px'
  },
  header: {
    ...theme.typography.body1,
    color: customPalette.header.secondaryText,
    fontWeight: theme.typography.fontWeightBold
  },
  fullHeight: {
    height: '100%',
    flexDirection: 'column',
    display: 'flex'
  }
}))

interface Props {
  variant?: 'default' | 'no-padding',
  paper?: boolean,
  title?: string,
  loading?: boolean,
  className?: string,
  actions?: JSX.Element | JSX.Element[],
  children?: JSX.Element | JSX.Element[]
}

export const ApplicationSection = memo(({
  variant = 'default',
  paper = true,
  loading = false,
  title,
  actions,
  className,
  children
}: Props) => {
  const classes = useStyles()

  return (
    <section className={clsx(classes.fullHeight, className)} >
      {(title || actions) && (
        <div className={classes.headerWrapper}>
          {loading ? (
            <Skeleton variant='text' width={240} height={30} />
          ) : (
            <T variant='h2' className={classes.header}>{title}</T>
          )}
          {actions && (
            <div>
              {actions}
            </div>
          )}
        </div>
      )}
      {paper ? (
        <Paper
          square
          className={clsx(classes.root, {
            [classes.padding]: variant === 'default'
          })}
        >
          {children}
        </Paper>
      ) : (
        <div
          className={clsx(classes.root, {
            [classes.padding]: variant === 'default'
          })}
        >
          {children}
        </div>
      )}
    </section>
  )
})
