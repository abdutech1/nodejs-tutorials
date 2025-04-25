const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')
const mime = require('mime-types')

http.createServer((req,res) => {
 let parsedurl = url.parse(req.url,true)
//  console.log(parsedurl);
///about.html

 let pathName = parsedurl.pathname
 if(pathName === '/'){
pathName = 'index.html'
 }

 const contentType = mime.lookup(pathName)

 let servedFilePath = path.join(__dirname, 'static',pathName)
// console.log(__filename);

fs.readFile(servedFilePath,(err,data) => {
  if(err){
    let notFoundFile = path.join(__dirname,'404.html')
    fs.readFile(notFoundFile,(err404,data404) =>{
      res.setHeader('Content-Type','text/html')
      res.statusCode = 404
      res.end(data404)
    })
    return;
  }
  res.setHeader('Content-Type',contentType)
  res.statusCode = 200
  res.end(data)
})

}).listen(4000,() => {
  console.log('Server is running on port 4000');
  
})