// Modules
const express = require('express')
const axios = require('axios')

// Config
require('dotenv').config()
const port = 3000

// Setup
const server = express()
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.API_KEY,
    language: 'en-US'
  }
})

server.get('/', (req, res) => res.send('Hello World!'))

server.get('/movie/popular', async (req, res) => {
  console.log('POPULAR')
  const response = await instance.get('/movie/popular', {
    page: '1'
  })

  res.send(response.data.results)
})

server.get('/movie/:id', async (req, res) => {
  const response = await instance.get(`/movie/${req.params.id}`)

  if (response.data.status_code === 6) {
    res.sendStatus(404)
  } else {
    res.send(response.data)
  }
})

if (process.env.TEST !== 'true') {
  server.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

module.exports = server
