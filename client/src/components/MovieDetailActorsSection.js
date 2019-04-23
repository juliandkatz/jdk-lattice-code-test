import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  List,
  Dimmer,
  Loader
} from 'semantic-ui-react'

import { getActors } from '../services/movieBackend.service'

class MovieDetailActorsSection extends Component {
  constructor (props) {
    super(props)
    this.state = { actors: [] }
  }

  async componentDidMount () {
    const response = await getActors(this.props.movieId)
    this.setState({ actors: response })
  }

  render () {
    return (
      <div className='loading-actors-list'>
        <Dimmer active={this.state.actors.length === 0} inverted >
          <Loader size='medium' inline='centered'>Loading</Loader>
        </Dimmer>

        <List className='actor-list'>
          {this.state.actors.map(val => <List.Item key={val.cast_id}>{val.name}</List.Item>)}
        </List>
      </div>
    )
  }
}

MovieDetailActorsSection.propTypes = {
  movieId: PropTypes.number.isRequired
}

export default MovieDetailActorsSection
