import React, { useCallback, memo, Fragment } from 'react'
import { Pagination } from '@material-ui/lab'

import {
  makeStyles,
  createStyles,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  wrap: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  },
  select: {
    padding: '8.5px 14px',
    transition: 'background-color 300ms',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.08)'
    }
  }
}))

interface Props {
  setOffset: (set: number) => void,
  setLimit: (set: number) => void,
  offset: number,
  limit: number,
  length: number | null,
  loading?: boolean
}

export const UserPagination = memo(({
  offset,
  limit,
  length,
  setOffset,
  setLimit,
  loading = false
}: Props) => {
  const classes = useStyles()

  const handleChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setOffset(value)
  }, [setOffset])

  const handlePagination = useCallback((e: React.ChangeEvent<{ value: unknown }>) => {
    setLimit(e.target.value as number)
  }, [setLimit])

  if (length === null) {
    return (
      <Fragment />
    )
  }

  const maxPages = Math.ceil(length / limit)

  return (
    <div className={classes.wrap}>
      <div>
        <FormControl variant='outlined' disabled={loading}>
          <Select
            value={limit}
            onChange={handlePagination}
            classes={{ root: classes.select }}
            disabled={loading}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Pagination
          count={maxPages}
          page={offset}
          onChange={handleChange}
          variant='outlined'
          shape='rounded'
        />
      </div>
    </div>
  )
})
