import Axios from 'axios'

const PORT = 4000
const backend = Axios.create({ baseURL: `http://localhost:${PORT}/` })

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

export const getMovie = async (movieId) => {
  const response = await backend.get(`/movie/${movieId}`)
  return response.data
}

export const getActors = async (movieId) => {
  const response = await backend.get(`/movie/${movieId}/cast`)
  return response.data
}
