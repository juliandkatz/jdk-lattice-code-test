import React, { Component } from 'react'
import {
  Image,
  Rating,
  Container,
  Segment,
  Header,
  Grid,
  List
} from 'semantic-ui-react'

import './App.css'
import { getMovie, getActors, IMAGE_URL } from '../services/movieBackend.service'
import Loading from './Loading'
import LinkButton from './LinkButton'

class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { movie: null, isLoaded: false, actors: [] }

    this.getFormattedGenres = this.getFormattedGenres.bind(this)
    this.renderActors = this.renderActors.bind(this)
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

  getFormattedGenres (genres) {
    return genres.reduce((agg, val, index) => {
      const delim = index < genres.length - 1 ? ', ' : ''
      return agg + val.name + delim
    }, ' ')
  }

  renderActors (actors) {
    return (
      <List className='actor-list'>
        {actors.map(val => <List.Item key={val.id}>{val.name}</List.Item>)}
      </List>
    )
  }

  render () {
    return (
      <Container style={{ marginTop: '3em' }}>
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
              <Grid.Row>
                <Grid.Column width={6}>
                  <Image
                    src={IMAGE_URL + this.state.movie.poster_path}
                    size='large'
                    className='large-movie-poster'
                  />
                </Grid.Column>
                <Grid.Column width={9}>
                  <Grid padded >
                    <Grid.Row>
                      <Header floated='left' size='huge'>{this.state.movie.title}</Header>
                    </Grid.Row>
                    <Grid.Row>
                      {this.getFormattedGenres(this.state.movie.genres)}
                    </Grid.Row>
                    <Grid.Row>
                      <List horizontal divided >
                        <List.Item>
                          {this.state.movie.runtime}min
                        </List.Item>
                        <List.Item>
                          {this.state.movie.release_date.split('-')[0]}
                        </List.Item>
                        <List.Item>
                          <Rating
                            icon='star'
                            defaultRating={Math.round(this.state.movie.vote_average / 2)}
                            maxRating={5}
                            disabled
                          />
                        </List.Item>
                      </List>
                    </Grid.Row>
                    <Grid.Row>
                      {this.renderActors(this.state.actors)}
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={15}>
                  <Segment>{this.state.movie.overview}</Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        }
      </Container>
    )
  }
}

export default MovieDetail
