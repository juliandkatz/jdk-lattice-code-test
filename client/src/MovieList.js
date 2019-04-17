import React, { Component } from 'react'
import { Item, Rating } from 'semantic-ui-react'
import './App.css'

class MovieList extends Component {
  constructor (props) {
    super(props)
  }

  renderListItem (movie) {
    return (
      <Item key={movie.id}>
        <Item.Image src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} size='tiny' />
        <Item.Content>
          <Item.Header>{movie.title}</Item.Header>
          <Item.Meta>
            <div>Released: {movie.release_date}</div>
          </Item.Meta>
          <Item.Description>
            <div className='small-text'>{movie.overview}</div>
            <Rating icon='star' defaultRating={Math.round(movie.vote_average / 2)} maxRating={5} />
          </Item.Description>
        </Item.Content>
      </Item>
    )
  }

  render () {
    return (
      <Item.Group divided>
        { this.props.movies.map(movie => this.renderListItem(movie)) }
      </Item.Group>
    )
  }
}

export default MovieList
