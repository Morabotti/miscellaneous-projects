import React, { memo } from 'react'
import { makeStyles, createStyles, Divider } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => createStyles({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& > button:not(:last-child), & > span:not(:last-child)': {
      marginRight: theme.spacing(2)
    }
  },
  alignLeft: {
    justifyContent: 'flex-start'
  },
  alignCenter: {
    justifyContent: 'center'
  },
  alignSpaceBetween: {
    justifyContent: 'space-between'
  }
}))

interface Props {
  children: JSX.Element | JSX.Element[] | false,
  align?: 'right' | 'left' | 'center' | 'space-between',
  className?: string,
  withDivider?: boolean
}

export const Actions = memo(({
  children,
  align,
  className,
  withDivider
}: Props) => {
  const classes = useStyles()

  return (
    <>
      {withDivider && (
        <Divider />
      )}
      <div
        className={clsx(classes.actions, className, {
          [classes.alignLeft]: align === 'left',
          [classes.alignCenter]: align === 'center',
          [classes.alignSpaceBetween]: align === 'space-between'
        })}
      >
        {children}
      </div>
    </>
  )
})
