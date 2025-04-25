const http = require('http')
const url = require('url')


const users = [
  {id: 1,name:'John Doe'},
  {id: 2,name:'Abebe Kebede'},
  {id: 3,name:'Kim Ung'}
]

http.createServer((req,res) =>{
const parsedUrl = url.parse(req.url,true)
const pathName = parsedUrl.pathname;
//Get all users
if(pathName === '/api/users' && req.method === 'GET'){
  res.setHeader('Content-Type','application/json')
  res.statusCode = 200
  res.write(JSON.stringify(users))
  res.end();

  // Get single user
}else if (pathName.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
const id = pathName.split('/')[3]
const user = users.find(user => user.id === parseInt(id))
if(user){
  res.setHeader('Content-Type','application/json')
  res.statusCode = 200
  res.write(JSON.stringify(user))
  res.end();
}else{
  res.setHeader('Content-Type','text/plain')
  res.statusCode = 404
  res.write(`No user with id: ${id}`)
  res.end();
}
} //Create user
else if(pathName === '/api/users' && req.method === 'POST'){
let body = ''
req.on('data',(chunk) =>{
  body += chunk.toString()
})
req.on('end',() => {
  const newUser = JSON.parse(body)
  users.push(newUser)
  res.statusCode = 201
  res.write(JSON.stringify(newUser))
  res.end()
})
//Update user (using Put)
}else if(pathName.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT'){
  const id = pathName.split('/')[3]
  let body = ''
  req.on('data',(chunk) =>{
    body += chunk.toString()
  })
  req.on('end',() => {
    let index = users.findIndex(user => user.id === parseInt(id))
    if(index !== -1){
      let updatedUser = JSON.parse(body) ;
      users[index] = updatedUser;
      res.setHeader('Content-Type','application/json');
      res.statusCode = 200;
      res.write(JSON.stringify(updatedUser))
      res.end()
    }else{
      res.setHeader('Content-Type','text/plain')
      res.statusCode = 404
      res.write(`No user with id: ${id}`)
      res.end();
    }
  })//Update user (using Put)
 
}else if (pathName.match(/\/api\/users\/([0-9]+)/) && req.method === 'PATCH'){
  let body = ''
  let id = pathName.split('/')[3]
  req.on('data',(chunk) => {
    body += chunk.toString()
  })
  req.on('end',() => {
    let  index = users.findIndex(user => user.id === parseInt(id))
    if(index !== -1){
      let updatedUser = JSON.parse(body)
    users[index] = {...users[index],...updatedUser}
    res.statusCode = 200
    res.end(JSON.stringify(updatedUser))
    }else{
      res.setHeader('Content-Type','text/plain')
      res.statusCode = 404
      res.write(`No user with id: ${id}`)
      res.end();
    }
    
  })//Delete user (using Put)
}else if(pathName.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE'){
  const id = pathName.split('/')[3]
  let index = users.findIndex(user => user.id === parseInt(id))
  if(index !== -1){
    users.splice(index,1);
    res.statusCode = 200
    res.end(`user with  id ${id} is deleted`)
  }else{
    res.statusCode = 404
    res.end(`user with id:${id} is no found`)
  }
}
else{
  res.setHeader('Content-Type','text/plain')
  res.statusCode = 404
  res.write(`The route > ${pathName} not found`)
  res.end();
}

}).listen(3000,()=>{
  console.log('The server is running on port 3000');
  
})