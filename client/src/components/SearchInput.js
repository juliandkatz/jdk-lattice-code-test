import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

class SearchInput extends Component {
  constructor (props) {
    super(props)
    this.state = { searchTerm: '' }

    this.handleInput = this.handleInput.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleInput (event) {
    this.setState({ searchTerm: event.target.value })
  }

  handleClick () {
    this.props.clickHandler(this.state.searchTerm)
  }

  render () {
    return (
      <Input
        onChange={this.handleInput}
        action={{ content: 'Search', onClick: this.handleClick }}
        placeholder='Search movies...'
        value={this.state.searchTerm}
      />
    )
  }
}

SearchInput.propTypes = {
  clickHandler: function (props, propName, componentName) {
    if (typeof props[propName] !== 'function') {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Must be a function.`
      )
    }
  }
}

export default SearchInput
