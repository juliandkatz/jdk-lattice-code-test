import React, { PureComponent } from 'react'
import { Loader, Dimmer } from 'semantic-ui-react'

class Loading extends PureComponent {
  render () {
    return (
      <Dimmer active inverted>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>
    )
  }
}

export default Loading
