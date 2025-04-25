const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const mime = require('mime-types')

const server = http.createServer((req,res) => {
const parsedUrl = url.parse(req.url,true);
let requestedUrl = parsedUrl.pathname;
let contentType = mime.lookup(requestedUrl)
if(requestedUrl == '/'){
  let servedFile = path.join(__dirname,'static','index.html')
  fs.readFile(servedFile,'utf8',(err,data)=>{
   if(err){
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Server error')
    return
   }
    res.writeHead(200,{'content-type':contentType || 'text/html'})
    res.write(data)
    res.end()
   
  })
}else if(requestedUrl == '/about.html'){
  let servedFile = path.join(__dirname,'static','about.html')
  fs.readFile(servedFile,'utf8',(err,data)=>{
   if(err){
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Server error')
    return
   }
    res.writeHead(200,{'content-type':contentType || 'text/html'})
    res.write(data)
    res.end()
   
  })
}else{
  let servedFile = path.join(__dirname,'static','404.html')
  fs.readFile(servedFile,'utf8',(err,data)=>{
   if(err){
    res.writeHead(500, { 'Content-Type': 'text/plain' })
    res.end('Server error')
    return
   }
    res.writeHead(200,{'content-type':contentType || 'text/html'})
    res.write(data)
    res.end()
   
  })
}

})
server.listen(3000,()=>{
 console.log( 'The server is running');
 
})
