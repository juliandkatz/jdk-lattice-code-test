import React, { Component } from 'react'
import { Item, List, Image, Header, Progress } from 'semantic-ui-react'
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
            <Progress percent={movie.vote_average * 10} size='small' progress />
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
