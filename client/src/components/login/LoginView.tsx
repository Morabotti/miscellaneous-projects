import React, { useState, useCallback } from 'react'
import { useLogin } from '@hooks'
import { AuthRoles } from '@types'

import {
  Container,
  createStyles,
  makeStyles,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  CircularProgress
} from '@material-ui/core'

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      color: theme.palette.text.primary,
      marginTop: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(0)
      }
    },
    paper: {
      padding: theme.spacing(2)
    },
    submit: {
      marginTop: theme.spacing(1.5),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    formControl: {
      minWidth: '140px',
      marginTop: theme.spacing(1)
    },
    main: {
      display: 'flex',
      flexDirection: 'column'
    }
  })
)

export const LoginView = () => {
  const classes = useStyles()
  const [level, setLevel] = useState<AuthRoles>(AuthRoles.ADMIN)
  const { login, loading } = useLogin()

  const handleTargetChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const nextTarget = ((event.target as HTMLInputElement).value) as AuthRoles
    setLevel(nextTarget)
  }, [setLevel])

  return (
    <Container className={classes.container} maxWidth='xs'>
      <Paper elevation={2} className={classes.paper}>
        <main className={classes.main}>
          <FormControl component='fieldset' className={classes.formControl}>
            <RadioGroup
              value={level}
              onChange={handleTargetChange}
            >
              <FormControlLabel
                value={AuthRoles.ADMIN}
                control={<Radio color='primary' />}
                label='Admin'
              />
              <FormControlLabel
                value={AuthRoles.DRIVER}
                control={<Radio color='primary' />}
                label='Driver'
              />
            </RadioGroup>
          </FormControl>
          <div className={classes.submit}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => login(level)}
            >
              {loading ? (
                <CircularProgress
                  color='inherit'
                  size={20}
                />
              ) : 'Login'}
            </Button>
          </div>
        </main>
      </Paper>
    </Container>
  )
}
