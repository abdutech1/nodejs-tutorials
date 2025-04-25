const http = require('http')
const url = require('url')

const server = http.createServer((req,res)=>{
  // console.log(req.url);
  // console.log(req.method);
  // console.log(req.headers);
  
  // const parsedurl = url.parse(req.url,true)
  // console.log(parsedurl.query);
  // console.log(parsedurl.pathname);
  res.statusCode = 404
  res.setHeader('Content-Type','application/json')

  res.write('Hello')
  res.write('Hello')
  res.write('Hello')
  res.end()
})
server.listen(4000,()=>{
  console.log('Running');
  
})