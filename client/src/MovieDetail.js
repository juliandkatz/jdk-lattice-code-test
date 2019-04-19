import React, { Component } from 'react'
import Axios from 'axios'
import { Image, Rating, Container, Loader, Dimmer, Segment, Header, Grid, List} from 'semantic-ui-react'
import './App.css'

const PORT = 4000
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

const backend = Axios.create({
  baseURL: `http://localhost:${PORT}/`
})

class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { movie: null, isLoaded: false, actors: [] }

    this.getFormattedGenres = this.getFormattedGenres.bind(this)
    this.renderActors = this.renderActors.bind(this)
  }

  async componentDidMount () {
    const movieId = this.props.match.params.movieId
    const movieResponse = await backend.get(`/movie/${movieId}`)
    console.log('ID:', movieResponse.data.id)
    const actorsResponse = await backend.get(`/movie/${movieResponse.data.id}/cast`)

    // setState with the array of movies
    this.setState({
      movie: movieResponse.data,
      actors: actorsResponse.data,
      isLoaded: true
    })
    console.log(movieResponse.data)
    console.log(actorsResponse.data)
  }

  getFormattedGenres (genres) {
    return genres.reduce((agg, val, index) => {
      const delim = index < genres.length - 1 ? ', ' : ''
      return agg + val.name + delim
    }, ' ')
  }

  renderActors (actors) {
    console.log(actors)
    return (
      <List className='actor-list'>
        {actors.map(val => <List.Item key={val.id}>{val.name}</List.Item>)}
      </List>
    )
  }

  render () {
    return (
      <Container style={{ marginTop: '4em' }}>
        {!this.state.isLoaded &&
          <Dimmer active inverted>
            <Loader size='massive'>Loading</Loader>
          </Dimmer>
        }
        {this.state.isLoaded &&
          <div>
            <Grid stackable columns={2} >
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
            </Grid>
            <Segment>{this.state.movie.overview}</Segment>
          </div>
        }
      </Container>
    )
  }
}

export default MovieDetail
