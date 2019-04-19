import React, { Component } from 'react'
import { Item, Container } from 'semantic-ui-react'

import './App.css'
import { getPopularMovies, searchMovie } from '../services/movieBackend.service'
import MovieListItem from './MovieListItem'
import SearchInput from './SearchInput'

class MovieList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: [],
      searchTerm: ''
    }

    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.renderMovieListItems = this.renderMovieListItems.bind(this)
  }

  async componentDidMount () {
    const response = await getPopularMovies()
    this.setState({ movies: response })
  }

  handleSearchInput (event) {
    this.setState({ searchTerm: event.target.value })
  }

  async handleSearchClick (searchTerm) {
    const response = await searchMovie(searchTerm)
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
      <div>
        <Container style={{ margin: '2em' }} >
          <SearchInput clickHandler={this.handleSearchClick} />
        </Container>
        <Container>
          {this.renderMovieListItems(this.state.movies)}
        </Container>
      </div>
    )
  }
}

export default MovieList
