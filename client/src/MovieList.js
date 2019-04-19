import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Item, Rating, Container, Input } from 'semantic-ui-react'
import Axios from 'axios'

import './App.css'

const PORT = 4000
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

const backend = Axios.create({
  baseURL: `http://localhost:${PORT}/`
})

class MovieList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: [],
      searchTerm: ''
    }

    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
  }

  async componentDidMount () {
    // make a call to the backend to retrieve the popular movies
    const response = await backend.get('/movie/popular')

    // setState with the array of movies
    this.setState({ movies: response.data })

    console.log(response.data)
  }

  handleSearchInput (event) {
    this.setState({ searchTerm: event.target.value })
  }

  async handleSearchClick () {
    const response = await backend.get('/movie/search', {
      params: {
        query: this.state.searchTerm
      }
    })

    this.setState({ movies: response.data })
  }

  renderListItem (movie) {
    return (
      <Item key={movie.id}>
        <Item.Image src={IMAGE_URL + movie.poster_path} size='tiny' />
        <Item.Content>
          <Item.Header><Link to={`/${movie.id}`}>{movie.title}</Link></Item.Header>
          <Item.Meta>
            <div>Released: {movie.release_date}</div>
          </Item.Meta>
          <Item.Description>
            <div className='small-text'>{movie.overview}</div>
            <Rating
              icon='star'
              defaultRating={Math.round(movie.vote_average / 2)}
              maxRating={5}
              disabled
            />
          </Item.Description>
        </Item.Content>
      </Item>
    )
  }

  render () {
    return (
      <div>
        <Container style={{ margin: '2em' }} >
          <Input
            onChange={this.handleSearchInput}
            action={{ content: 'Search', onClick: this.handleSearchClick }}
            placeholder='Search...'
            value={this.state.searchTerm}
          />
        </Container>
        <Container>
          <Item.Group divided>
            { this.state.movies.map(movie => this.renderListItem(movie)) }
          </Item.Group>
        </Container>
      </div>
    )
  }
}

export default MovieList
