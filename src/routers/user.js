const express=require('express')
const router =new express.Router()
const User=require('../models/user')
const sharp=require('sharp')
const auth=require('../middleware/auth')
const multer =require('multer')
router.post("/users", async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token=await  user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})
router.post('/users/login',async (req,res)=>{
    try{
        const user =await User.findByCredentials(req.body.email ,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth , async(req,res)=>{
    try{
        req.user.tokens =req.user.tokens.filter((token)=>{
            return token.token !==req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post ('/users/logoutAll',auth ,async(req,res)=>{
    try{
        req.user.tokens =[]
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})


router.get('/users/me',auth, async (req, res) => {
    res.send(req.user)


    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch(()=>{
    //     res.status(500).send()

    // })
})

// router.get('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
    // const _id=req.params.id
    // console.log(_id)
    // User.findById(_id).then((user)=>{
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e)=>{
    //     console.log(e)
    //     return res.status(500).send()
    // })
// })



router.patch('/users/me',auth,async (req,res)=>{
    const update=Object.keys(req.body)
    const allowUpdate=['name','email','password','age']
    const isValidOperation=update.every((update)=>allowUpdate.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:"invalid Update"})

    }
    try{
       // const task =await User.findById(req.params.id)
        update.forEach((updates)=>{
           req.user[updates]=req.body[updates]
        })
        await req.user.save()
       // const task =await User.findByIdAndUpdate(req.params.id ,req.body ,{new:true ,runValidators:true})
        // if(!task){
        //     return res.status(400).send()
        // }
        res.send(req.user)
   
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth, async (req,res)=>{
    try{
        //const user=await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(400).send()
        // }

        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})
const upload =multer({
    // dest:"avatars",
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("Please upload image"))
        }
        cb(undefined,true)
    }
})
router.post('/users/me/avator',auth,upload.single('avator'),async (req,res)=>{
    const bufffer= await sharp(req.file.buffer).resize({width:250 ,height:250}).png().toBuffer()
    req.user.avator=bufffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avator',auth ,async (req,res)=>{
    req.user.avator =undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avator',async(req,res)=>{
    try{
        const user= await User.findById(req.params.id)
        if(!user || !user.avator){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avator)
    }catch(e){
        console.log(e);
        res.status(404).send()
    }
})
module.exports=router