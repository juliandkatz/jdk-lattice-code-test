import React, { Component } from 'react'
import { Item, Rating } from 'semantic-ui-react'
import './App.css'

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

class MovieList extends Component {
  renderListItem (movie) {
    return (
      <Item key={movie.id}>
        <Item.Image src={IMAGE_URL + movie.poster_path} size='tiny' />
        <Item.Content>
          <Item.Header>{movie.title}</Item.Header>
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
        <Item.Group divided>
          { this.props.movies.map(movie => this.renderListItem(movie)) }
        </Item.Group>
      </div>
    )
  }
}

export default MovieList
