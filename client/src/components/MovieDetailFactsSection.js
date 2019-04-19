import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Rating,
  Header,
  Grid,
  List
} from 'semantic-ui-react'

class MovieDetailFactsSection extends PureComponent {
  getFormattedGenres (genres) {
    return genres.reduce((agg, val, index) => {
      const delim = index < genres.length - 1 ? ', ' : ''
      return agg + val + delim
    }, ' ')
  }

  renderActors (actors) {
    return (
      <List className='actor-list'>
        {actors.map(val => <List.Item key={val.id}>{val.name}</List.Item>)}
      </List>
    )
  }

  render () {
    return (
      <Grid padded >
        <Grid.Row>
          <Header floated='left' size='huge'>{this.props.title}</Header>
        </Grid.Row>
        <Grid.Row>
          {this.getFormattedGenres(this.props.genres)}
        </Grid.Row>
        <Grid.Row>
          <List horizontal divided >
            <List.Item>
              {this.props.runtime}min
            </List.Item>
            <List.Item>
              {this.props.releaseYear}
            </List.Item>
            <List.Item>
              <Rating
                icon='star'
                defaultRating={this.props.rating}
                maxRating={5}
                disabled
              />
            </List.Item>
          </List>
        </Grid.Row>
        <Grid.Row>
          {this.renderActors(this.props.actors)}
        </Grid.Row>
      </Grid>
    )
  }
}

MovieDetailFactsSection.propTypes = {
  title: PropTypes.string.isRequired,
  genres: PropTypes.array.isRequired,
  runtime: PropTypes.number.isRequired,
  releaseYear: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  actors: PropTypes.array.isRequired
}

export default MovieDetailFactsSection
