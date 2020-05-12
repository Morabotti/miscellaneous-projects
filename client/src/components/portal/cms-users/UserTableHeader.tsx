import React, { useState, useCallback, memo, Fragment } from 'react'
import { DotsHorizontal, DeleteEmptyOutline } from 'mdi-material-ui'

import {
  makeStyles,
  createStyles,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography as T
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  wrap: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  menuIcon: {
    minWidth: theme.spacing(5)
  }
}))

interface Props {
  disable: boolean,
  length: number | null,
  isSelected: boolean,
  onDeleteSelected: () => void
}

export const UserTableHeader = memo(({
  disable,
  length,
  isSelected,
  onDeleteSelected
}: Props) => {
  const classes = useStyles()
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget)
  }, [setAnchor])

  const handleClose = useCallback(() => {
    setAnchor(null)
  }, [setAnchor])

  if (length === null) {
    return (
      <Fragment />
    )
  }

  return (
    <div className={classes.wrap}>
      <div>
        <Button
          variant='outlined'
          onClick={handleClick}
          disabled={disable}
        >
          <DotsHorizontal />
        </Button>
        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={handleClose}
        >
          <MenuItem onClick={onDeleteSelected} disabled={isSelected}>
            <ListItemIcon className={classes.menuIcon}>
              <DeleteEmptyOutline />
            </ListItemIcon>
            <T variant='inherit'>Delete selected users</T>
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
})
