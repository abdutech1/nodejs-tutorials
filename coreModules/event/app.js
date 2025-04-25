const eventEmitter = require('events');

const emitter = new eventEmitter.EventEmitter()

emitter.on('connection',() => {
  console.log('Connected');
  
})

emitter.emit('connection')

console.log('Hello');
