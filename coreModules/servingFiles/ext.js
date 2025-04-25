const http = require('http')
const url = require('url')

const users = [
  {id: 1,name:'John Doe'},
  {id: 2,name:'Abebe Kebede'},
  {id: 3,name:'Kim Ung'}
]

http.createServer((req,res) =>{
let parsedUrl = url.parse(req.url,true);
let pathName = parsedUrl.pathname

if(pathName === '/api/users' && req.method === 'GET'){
  res.statusCode = 200
  res.setHeader('Content-Type','application/json')
  res.end(JSON.stringify(users))
}else if(pathName.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
  let id = pathName.split('/')[3]
  let user = users.find(user => user.id === parseInt(id))
  if(user){
    res.statusCode = 200
    res.setHeader('Content-Type','application/json')
    res.end(JSON.stringify(user))
  }else{
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain')
    res.end(`There is no user with id:${id}`)
  }
  
}else if(pathName === '/api/users' && req.method === 'POST'){
  let body = ''
  req.on('data',chunk => {
    body += chunk.toString()
  })
  req.on('end',() => {
    let newUser = JSON.parse(body)
    users.push(newUser);
    res.statusCode = 201;
    res.end(JSON.stringify(newUser))
  })
}else if (pathName.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT'){
    let id = pathName.split('/')[3]
    let index = users.findIndex(user => user.id === parseInt(id))
    if(index !==  -1){
      let body = ''
      req.on('data',chunk => {
        body += chunk.toString()
      })
      req.on('end',() => {
        let updatedUser = JSON.parse(body)
        users[index] = updatedUser;
        res.statusCode = 200
        res.end(JSON.stringify(updatedUser))
      })
    }else{
      res.statusCode = 404
      res.end(`There is no user with id${id}`)
    }
}else if(pathName.match(/\/api\/users\/([0-9]+)/) && req.method === 'PATCH'){
  let id = pathName.split('/')[3]
  let index = users.findIndex(user => user.id === parseInt(id))
  if(index !== -1){
    let body = ''
    req.on('data',chunk => {
      body += chunk.toString()
    })
    req.on('end',() => {
      let updatedUser = JSON.parse(body)
      users[index] = {...users[index],...updatedUser}
      res.statusCode = 200
      res.end(`User with id:${id} updated`)
    })
  }else{
    res.statusCode = 404
    res.end(`There is no user with id${id}`)
  }
}else if(pathName.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE'){
  let id = pathName.split('/')[3]
  let index = users.findIndex(user => user.id === parseInt(id))
  if(index !== -1){
    users.splice(index,1)
    res.statusCode = 200
    res.end(`User with id:${id} deletd`)
  }else{
    res.statusCode = 404
    res.end(`There is no user with id${id}`)
  }
}

else{
  res.statusCode = 404
  res.end(`There is no ${pathName} route`)
}

}).listen(3000,()=>{
  console.log('Running on Port 3000');
  
})