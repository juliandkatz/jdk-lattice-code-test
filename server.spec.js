const request = require('supertest')
const server = require('./server')

describe('/', () => {
  describe('GET', () => {
    it('returns a 200', done => {
      request(server)
        .get('/')
        .expect(200, done)
    })
  })
})
