import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'

class LinkButton extends PureComponent {
  render () {
    return (
      <Link to={this.props.path}>
        <Button icon labelPosition='left'>
          <Icon name='left arrow' />
          {this.props.text}
        </Button>
      </Link>
    )
  }
}

export default LinkButton
