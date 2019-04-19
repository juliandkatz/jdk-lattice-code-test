import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Switch, Route } from 'react-router-dom'

import MovieList from './MovieList.js'
import MovieDetail from './MovieDetail.js'

class App extends Component {
  render () {
    return (
      <Container>
        <Switch>
          <Route exact path='/' component={MovieList} />
          <Route path='/:movieId' component={MovieDetail} />
        </Switch>
      </Container>
    )
  }
}

export default App
