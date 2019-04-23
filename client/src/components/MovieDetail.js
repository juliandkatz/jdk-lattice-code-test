import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Image,
  Container,
  Segment,
  Grid
} from 'semantic-ui-react'

import './App.css'
import { getMovie, getActors, IMAGE_URL } from '../services/movieBackend.service'
import Loading from './Loading'
import LinkButton from './LinkButton'
import MovieDetailFactsSection from './MovieDetailFactsSection'
import RelatedMoviesBar from './RelatedMoviesBar'

class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { movie: null, isLoaded: false, actors: [] }
  }

  async componentDidMount () {
    const movieId = this.props.match.params.movieId
    const responses = await Promise.all([ getMovie(movieId), getActors(movieId) ])

    this.setState({
      movie: responses[0],
      actors: responses[1],
      isLoaded: true
    })
  }

  render () {
    return (
      <Container style={{ marginTop: '2em' }}>
        {!this.state.isLoaded &&
          <Loading />
        }
        {this.state.isLoaded &&
          <div>
            <Grid stackable columns={2} >
              <Grid.Row>
                <Grid.Column>
                  <LinkButton path='/' text='Back to Popular movies' />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row stretched >
                <Grid.Column width={6}>
                  <Image
                    src={IMAGE_URL + this.state.movie.poster_path}
                    size='large'
                    verticalAlign='top'
                  />
                </Grid.Column>
                <Grid.Column width={9}>
                  <Segment>
                    <MovieDetailFactsSection
                      title={this.state.movie.title}
                      genres={this.state.movie.genres.map(ob => ob.name)}
                      runtime={this.state.movie.runtime}
                      releaseYear={Number(this.state.movie.release_date.split('-')[0])}
                      actors={this.state.actors}
                      rating={Math.round(this.state.movie.vote_average / 2)}
                    />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={15}>
                  <Segment>{this.state.movie.overview}</Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={15}>
                  <RelatedMoviesBar
                    genreId={this.state.movie.genres[0].id}
                    currentMovieId={this.state.movie.id}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        }
      </Container>
    )
  }
}

MovieDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string.isRequired
    })
  })
}

export default MovieDetail
