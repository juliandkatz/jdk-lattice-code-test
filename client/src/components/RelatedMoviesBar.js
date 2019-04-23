import React, { Component } from 'react'
import {
  Segment,
  Image,
  Header
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getMoviesByGenre, IMAGE_URL } from '../services/movieBackend.service'

class RelatedMoviesBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: [],
      isLoaded: false
    }
  }

  async componentDidMount () {
    const response = await getMoviesByGenre(this.props.genreId)
    this.setState({ movies: response, isLoaded: true })
  }

  renderImages (movies) {
    const movieMarkup = movies
      .filter(movie => movie.id !== this.props.currentMovieId)
      .map(movie => (
        <Link to={`/${movie.id}`} key={movie.id}>
          <Image src={IMAGE_URL + movie.poster_path} size='small' wrapped />
        </Link>
      ))

    return (<Image.Group size='small'>{movieMarkup}</Image.Group>)
  }

  render () {
    return (
      <div>
        <Header as='h4'>Related Movies</Header>
        <Segment className='loading-segment' textAlign='center' loading={!this.state.isLoaded}>
          {this.renderImages(this.state.movies)}
        </Segment>
      </div>
    )
  }
}

RelatedMoviesBar.propTypes = {
  genreId: PropTypes.number.isRequired,
  currentMovieId: PropTypes.number
}

export default RelatedMoviesBar
