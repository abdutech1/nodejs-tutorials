const http = require('http')
const url = require('url')

const server = http.createServer((req,res) => {
  const parsedUrl = url.parse(req.url,true)
  // console.log(parsedUrl.pathname);
  // console.log(parsedUrl.query.brand);
  // console.log(parsedUrl.query.price);
  
  // res.statusCode = 404
  // res.setHeader('Content-Type','text/html')
  res.writeHead(200,{'Content-Type':'text/plain'})
  res.write('<h1>Not Found</h1>')
  res.write('<h1>Not Found</h1>')
  res.end()
  
})

server.listen(3000,()=>{
  console.log('Server is running');
})