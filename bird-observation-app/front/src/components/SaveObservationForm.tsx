import React, { useCallback, useState } from 'react'
import { Bird, NewObservation } from '@types'
import { Button, createStyles, makeStyles, MenuItem, TextField } from '@material-ui/core'
import { Actions } from '@components'
import { DatePicker } from '@material-ui/pickers'
import moment from 'moment'

const useStyles = makeStyles(theme => createStyles({
  field: {
    marginBottom: theme.spacing(2)
  }
}))

const defaultData: NewObservation = ({
  bird: 0,
  place: '',
  time: moment().toISOString(),
  user: ''
})

interface Props {
  birds: Bird[],
  onBackPush: () => void,
  onSaveObservation: (obs: NewObservation) => Promise<void>
}

export const SaveObservationForm = ({
  birds,
  onBackPush,
  onSaveObservation
}: Props) => {
  const classes = useStyles()
  const [data, setData] = useState<NewObservation>(defaultData)

  const onSave = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (data.bird === 0) {
      return 0
    }

    onSaveObservation(data)
  }, [onSaveObservation, data])

  return (
    <form onSubmit={onSave}>
      <TextField
        select
        label='Select bird'
        value={data.bird}
        fullWidth
        onChange={e => setData(prev => ({ ...prev, bird: Number(e.target.value) }))}
        variant='outlined'
        className={classes.field}
      >
        <MenuItem value={0}>Not selected</MenuItem>
        {birds.map(bird => (
          <MenuItem key={bird.id} value={bird.id}>
            {bird.textid} - {bird.finnish}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label='Place of observation'
        variant='outlined'
        fullWidth
        value={data.place}
        className={classes.field}
        onChange={e => setData(prev => ({ ...prev, place: e.target.value }))}
      />
      <DatePicker
        label='Activities from'
        value={data.time}
        className={classes.field}
        fullWidth
        onChange={date => setData(prev => ({
          ...prev,
          time: date?.toISOString() || moment().toISOString()
        }))}
        inputVariant='outlined'
        animateYearScrolling
        showTodayButton
      />
      <TextField
        label='Name of observer'
        variant='outlined'
        fullWidth
        value={data.user}
        className={classes.field}
        onChange={e => setData(prev => ({ ...prev, user: e.target.value }))}
      />
      <Actions>
        <Button
          onClick={onBackPush}
          color='secondary'
          disableElevation
          variant='outlined'
        >
          Cancel
        </Button>
        <Button
          type='submit'
          color='primary'
          autoFocus
          disableElevation
          variant='outlined'
          disabled={data.bird === 0}
        >
          Create observation
        </Button>
      </Actions>
    </form>
  )
}
