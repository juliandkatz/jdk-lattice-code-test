const express = require('express')
const server = express()
const port = 3000

server.get('/', (req, res) => res.send('Hello World!'))

if (process.env.TEST !== 'true') {
  server.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

module.exports = server
