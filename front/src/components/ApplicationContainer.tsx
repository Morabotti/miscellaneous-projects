import React, { memo } from 'react'
import clsx from 'clsx'

import {
  Container,
  makeStyles,
  createStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  container: {
    overflow: 'hidden',
    padding: theme.spacing(3),
    [theme.breakpoints.down(425)]: {
      padding: theme.spacing(1.5)
    }
  }
}))

interface Props {
  variant?: 'default' | 'no-max-width' | 'only-padding',
  children: JSX.Element | JSX.Element[],
  className?: string
}

export const ApplicationContainer = memo(({
  variant = 'default',
  children,
  className
}: Props) => {
  const classes = useStyles()

  if (variant === 'only-padding') {
    return (
      <div className={classes.container}>
        {children}
      </div>
    )
  }

  if (variant === 'no-max-width') {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <Container
      className={clsx(classes.container, className)}
      maxWidth='md'
    >
      {children}
    </Container>
  )
})
