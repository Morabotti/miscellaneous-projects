import React from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Typography } from '@material-ui/core'

import { setText } from '../actions'

import { Dispatch } from 'redux'

import { ApplicationState } from '../reducer'

interface Props {
  text: string,
  dispatch: Dispatch
}

class HelloWorld extends React.PureComponent<Props> {
  private _toggleText = () => {
    const { text, dispatch } = this.props
    const newText = text.length === 0 ? 'World' : ''

    dispatch(setText(newText))
  }

  render () {
    const { text } = this.props

    return (
      <React.Fragment>
        <Typography variant='h1'>Hello {text}</Typography>
        <Button onClick={this._toggleText}>
          Click Me!
          <Icon>fingerprint</Icon>
        </Button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  text: state.text
})

export default connect(mapStateToProps)(HelloWorld)
