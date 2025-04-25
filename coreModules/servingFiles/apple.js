const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const mime = require('mime-types')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  let requestedUrl = parsedUrl.pathname

  // If root, serve index.html
  if (requestedUrl === '/') {
    requestedUrl = 'index.html'
  }

  const servedFile = path.join(__dirname, 'static', requestedUrl)
  const contentType = mime.lookup(servedFile) || 'text/plain'

  fs.readFile(servedFile, (err, data) => {
    if (err) {
      // If file not found, serve 404.html
      const notFoundPage = path.join(__dirname, 'static', '404.html')
      fs.readFile(notFoundPage, (err404, data404) => {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end(err404 ? '404 Not Found' : data404)
      })
      return
    }

    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  })
})

server.listen(3000, () => {
  console.log('The server is running on http://localhost:3000')
})
