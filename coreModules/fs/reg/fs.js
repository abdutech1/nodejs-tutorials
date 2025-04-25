const fs = require('fs')
const path = require('path')

// fs.readFile('example.txt','utf8',(err,text) => {
//   if(err){
//     console.error(err)
//     return;
//   }
//   console.log(text);
  
// })
// console.log('Hello');


// let text = fs.readFileSync('example.txt','utf8')
// console.log(text);

// console.log('Hello');

// let content = '\nLorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sunt deserunt labore rem necessitatibus excepturi asperiores nam reprehenderit saepe vitae modi perspiciatis dicta perferendis, atque, sequi eaque quisquam in consectetur'
// let content2 = 'Hello'

// fs.writeFile('test.txt',content,{flag:'a+'},(err) =>{
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('File written successfully');
  
// })

// try {
//   fs.writeFileSync('test2.txt',content)
// console.log('File written successfully');
// } catch (error) {
//   console.log(error);
  
// }

// fs.appendFile('test.txt',content,(err) =>{
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('File written successfully');
  
// })

// var read = ''

// fs.readFile('test2.txt','utf8',(err,data) =>{
//   if(err){
//     console.log(err);
//     return;
//   }
//   fs.writeFile('test.txt',data,(err) => {
//     if (err) {
//       console.log(err);
      
//     }
//     console.log('file written succesfully');
//     fs.unlink('test2.txt',(err) => {
//       if (err) {
//         console.log(err);
        
//       }
//       console.log('file deleted succesfully');
      
//     })
    
//   })


// })

const textPath = path.join(__dirname,'lorem','lorem.txt')
const writetextPath = path.join(__dirname,'lorem','lorem_new_pipe.txt')

const readStream = fs.createReadStream(textPath,{encoding:'utf8'})
const writeStream = fs.createWriteStream(writetextPath)

// let contentToWrite = ''
// readStream.on('data',(chunk) =>{
//   console.log(chunk);
//   contentToWrite += chunk
// })
// readStream.on('end',()=>{
//   console.log('File ended');
//   writeStream.write(contentToWrite)
// })
// readStream.on('err',(err)=>{
//   console.log(err);
  
// })

// readStream.pipe(writeStream);
