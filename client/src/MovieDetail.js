import React, { Component } from 'react'
import Axios from 'axios'

const PORT = 4000
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

const backend = Axios.create({
  baseURL: `http://localhost:${PORT}/`
})

class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = { movie: null }
  }

  async componentDidMount () {
    const movieId = this.props.match.params.movieId
    const response = await backend.get(`/movie/${movieId}`)

    // setState with the array of movies
    this.setState({ movie: response.data })

    console.log(response.data)
  }

  render () {
    return (
      <div>Hello world</div>
    )
  }
}

export default MovieDetail
