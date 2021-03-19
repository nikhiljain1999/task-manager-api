const express = require('express')
require("./db/mongoose")
const multer =require('multer')
const app = express()
const port = process.env.PORT 


// const upload =multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('Please upload a document'))
//         }
//         cb(undefined ,true)
//         // cb(new Error("File must be a PDF"))
//         // cb(undefined ,true)
//         // cb(undefined ,false)
//     }
// })
// // const errorHandler =(req,res,next)=>{
//     throw new Error('From my middleware')
// }
// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// },(error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// })

// app.use((req,res,next)=>{
//     // console.log(req.method,req.path)
//     // next()
//     if(req.method ==="GET"){
//         res.send("GET request are disabled")
//     }
//     else{
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(503).send("Site under Maintanance")
// })


const userRouter = require ('./routers/user')
const taskRouter=require('./routers/task')
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)
app.get("/",(req,res)=>{
    res.send("helloooo");
})

app.listen(port, () => {
    console.log("Server is up ", port)
})

// const jwt =require('jsonwebtoken')
// //const bcrypt=require('bcryptjs')


// const myFunction=async()=>{

//     const token = jwt.sign({_id: 'abc123'},"thisismynewcourse", {expiresIn:"7 days"})
//     console.log(token)

//     const data=jwt.verify(token,'thisismynewcourse')
//     console.log(data)


//     // const password="Red12345!"
//     // const hashedPassword = await bcrypt.hash(password,8)
//     // console.log(password)
//     // console.log(hashedPassword)

//     // const isMathch =await bcrypt.compare('Red123!',hashedPassword)
//     // console.log(isMathch)
// }
// myFunction()


// const Task =require('./models/task')
// const User =require('./models/user')
// const main =async ()=>{
//     // const task =await Task.findById('60507f874470c306d89fb771')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user =await User.findById("60507aab2f5b6131ec3ef8c7");
    // await user.populate('tasks').execPopulate();
    // console.log(user.tasks)

// }
// main()