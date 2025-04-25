const users = [
  {id: 1,name:'John Doe'},
  {id: 2,name:'Abebe Kebede'},
  {id: 3,name:'Kim Ung'}
]

const url = require('url')


exports.getUsersHandler = (req,res) => {
  res.setHeader('Content-Type','application/json')
  res.statusCode = 200
  res.write(JSON.stringify(users))
  res.end();
}
exports.getSingleUserHandler = (req,res) => {
  const parsedUrl = url.parse(req.url,true)
  const pathName = parsedUrl.pathname;
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
}

exports.addUserHandler = (req,res) => {
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
}

exports.updateWithPutHandler = (req,res) => {
  const parsedUrl = url.parse(req.url,true)
const pathName = parsedUrl.pathname;
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
  })
}

exports.updateWithPatchHandler = (req,res) => {
  const parsedUrl = url.parse(req.url,true)
const pathName = parsedUrl.pathname;
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
    
  })
}

exports.deleteHandler = (req,res) => {
  const parsedUrl = url.parse(req.url,true)
const pathName = parsedUrl.pathname;
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

exports.notFoundHandler = (req,res) => {
  const parsedUrl = url.parse(req.url,true)
const pathName = parsedUrl.pathname;
  res.setHeader('Content-Type','text/plain')
  res.statusCode = 404
  res.write(`The route > ${pathName} not found`)
  res.end();
}



const {getUsersHandler,
   getSingleUserHandler,
  addUserHandler,
  updateWithPutHandler,
  updateWithPatchHandler,
  deleteHandler,
  notFoundHandler} = require('./controlers')