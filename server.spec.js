const request = require('supertest')
const server = require('./server')
const expect = require('chai').expect

describe('/', () => {
  describe('GET', () => {
    it('returns a 200', done => {
      request(server)
        .get('/')
        .expect(200, done)
    })
  })
})

describe('/movie/search', () => {
  describe('POST', () => {
    it('returns a list of movies', done => {
      request(server)
        .get('/movie/search')
        .query({
          query: 'Toy Story'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.equal('Toy Story')
          done()
        })
    })
  })
})

describe('/movie/popular', () => {
  describe('GET', () => {
    it('returns a list of movies', done => {
      request(server)
        .get('/movie/popular')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          expect(res.body).to.have.lengthOf(20)
          done()
        })
    })
  })
})

describe('/movie/someId', () => {
  describe('GET', () => {
    it('returns Hellboy for id 456740', done => {
      request(server)
        .get('/movie/456740')
        .expect(200)
        .end((err, res) => {
          expect(res.body.id).to.equal(456740)
          expect(res.body.title).to.equal('Hellboy')
          done()
        })
    })

    it('returns a 404 for an id that does not exist', done => {
      request(server)
        .get('/movie/01910191019101910191019101')
        .expect(404, done)
    })
  })
})
