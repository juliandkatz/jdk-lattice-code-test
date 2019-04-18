import React, { Component } from 'react'
import { Container, Input } from 'semantic-ui-react'
import Axios from 'axios'

import MovieList from './MovieList.js'

const PORT = 4000
const backend = Axios.create({
  baseURL: `http://localhost:${PORT}/`
})

class App extends Component {
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

  render () {
    return (
      <Container>
        <Input
          onChange={this.handleSearchInput}
          action={{ content: 'Search', onClick: this.handleSearchClick }}
          placeholder='Search...'
          value={this.state.searchTerm}
        />
        <MovieList movies={this.state.movies} />
      </Container>
    )
  }
}

export default App
