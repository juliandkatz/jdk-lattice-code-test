import React, { PureComponent } from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class Loading extends PureComponent {
  render () {
    return (
      <Dimmer active inverted >
        <Loader size='massive' inline>Loading</Loader>
      </Dimmer>
    )
  }
}

Loading.propTypes = {
  inline: PropTypes.bool
}

Loading.defaultProps = {
  inline: false
}

export default Loading
