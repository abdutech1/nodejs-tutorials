//console.log('Hello world');

const http = require('http')

const server = http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'})
    res.write('<h1>I am a server</h1>')
    res.end()
})

server.listen(8080,()=>console.log('Server is running on port 8080'))