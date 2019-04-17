import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
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
      popularMovies: []
    }
  }

  async componentDidMount () {
    // make a call to the backend
    const response = await backend.get('/movie/popular')

    // setState with the array of movies
    this.setState({ popularMovies: response.data })

    console.log(response.data)
  }

  render () {
    return (
      <Container>
        <MovieList movies={this.state.popularMovies} />
      </Container>
    )
  }
}

export default App
