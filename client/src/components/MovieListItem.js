import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Item, Rating } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { IMAGE_URL } from '../services/movieBackend.service'

class MovieListItem extends PureComponent {
  render () {
    return (
      <Item>
        <Item.Image src={IMAGE_URL + this.props.posterPath} size='tiny' />
        <Item.Content>
          <Item.Header><Link to={`/${this.props.id}`}>{this.props.title}</Link></Item.Header>
          <Item.Meta>
            <div>Released: {this.props.releaseDate}</div>
          </Item.Meta>
          <Item.Description>
            <div className='small-text'>{this.props.overview}</div>
            <Rating
              icon='star'
              defaultRating={this.props.scoreOutOfFive}
              maxRating={5}
              disabled
            />
          </Item.Description>
        </Item.Content>
      </Item>
    )
  }
}

MovieListItem.propTypes = {
  posterPath: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  scoreOutOfFive: PropTypes.number.isRequired
}

export default MovieListItem
