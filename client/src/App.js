import React, { Component } from 'react'
import { List, Container } from 'semantic-ui-react'
import Axios from 'axios'

const PORT = 4000
const axInstance = Axios.create({
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
    const response = await axInstance.get('/')

    console.log(response)

    // setState with the array of movies
  }

  render () {
    return (
      <Container>
        <List>
          <List.Item>bla</List.Item>
          <List.Item>Pears</List.Item>
          <List.Item>Oranges</List.Item>
        </List>
      </Container>
    //   <div className='App'>
    //     <header className='App-header'>
    //       <img src={logo} className='App-logo' alt='logo' />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className='App-link'
    //         href='https://reactjs.org'
    //         target='_blank'
    //         rel='noopener noreferrer'
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    )
  }
}

export default App
