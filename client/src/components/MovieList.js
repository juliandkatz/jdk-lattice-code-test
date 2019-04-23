import React, { Component } from 'react'
import {
  Item,
  Container,
  Dropdown,
  Menu,
  Segment
} from 'semantic-ui-react'

import './App.css'
import {
  getPopularMovies,
  getMoviesByQuery,
  getGenres,
  getMoviesByGenre
} from '../services/movieBackend.service'
import MovieListItem from './MovieListItem'
import SearchInput from './SearchInput'

class MovieList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: [],
      searchTerm: '',
      genres: []
    }

    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.renderMovieListItems = this.renderMovieListItems.bind(this)
    this.formatGenresForDropdown = this.formatGenresForDropdown.bind(this)
    this.handleGenreSelect = this.handleGenreSelect.bind(this)
  }

  async componentDidMount () {
    const responses = await Promise.all([getPopularMovies(), getGenres()])
    this.setState({
      movies: responses[0],
      genres: this.formatGenresForDropdown(responses[1])
    })
  }

  formatGenresForDropdown (rawGenreResponse) {
    return rawGenreResponse.map(val => {
      return {
        key: val.id,
        text: val.name,
        value: val.id
      }
    })
  }

  handleSearchInput (event) {
    this.setState({ searchTerm: event.target.value })
  }

  async handleSearchClick (searchTerm) {
    const response = await getMoviesByQuery(searchTerm)
    this.setState({ movies: response })
  }

  async handleGenreSelect (event, { value }) {
    const response = await getMoviesByGenre(value)
    this.setState({ movies: response })
  }

  renderMovieListItems (movies) {
    const items = movies.map(movie => {
      const props = {
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title,
        releaseDate: movie.release_date,
        overview: movie.overview,
        scoreOutOfFive: Math.round(movie.vote_average / 2)
      }
      return <MovieListItem key={movie.id} {...props} />
    })

    return (<Item.Group divided >{items}</Item.Group>)
  }

  render () {
    return (
      <Container style={{ marginTop: '2em' }} >
        <Menu attached='top' stackable >
          <Menu.Item>
            <SearchInput clickHandler={this.handleSearchClick} />
          </Menu.Item>
          <Menu.Item position='right' fitted='vertically'>
            <Dropdown
              item
              placeholder='Select a genre...'
              selection
              search
              options={this.state.genres}
              onChange={this.handleGenreSelect}
            />
          </Menu.Item>
        </Menu>
        <Segment
          className='loading-segment'
          attached='bottom'
          loading={this.state.movies.length < 1}
        >
          {this.renderMovieListItems(this.state.movies)}
        </Segment>
      </Container>
    )
  }
}

export default MovieList
