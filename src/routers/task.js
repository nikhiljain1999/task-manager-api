const express=require('express')
const router =new express.Router()
const Task=require('../models/task')
const auth =require('../middleware/auth')
router.post('/tasks',auth, async (req, res) => {
   // const task = new Task(req.body)
   const task =new Task({
       ...req.body,
       owner :req.user._id
   })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})
//GET/tassks?limit=10&skip=0
//tasks?sortBy=createdAt_asc
router.get('/tasks',auth, async (req, res) => {
    const match ={}
    const sort={}
    if(req.query.model){
        match.model =req.query.model ==='true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1]==='desc'?-1:1
    }
    try {
        console.log(req.query.skip)
       // const task = await Task.find({_id,owner:req.user._id});
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
                
            }
            
        }).execPopulate()
      // console.log(task);
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch(()=>{
    //     res.status(500).send()
    // })
})
router.get("/tasks/:id",auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task=await Task.find
        // const _id=req.params.id
       // const task = await Task.findById(_id)
       const task= await Task.findOne({_id,owner:req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
    //  const _id=req.params.id
    //  Task.findById(_id).then((description)=>{
    //     if(!description){
    //         return res.status(404).send()
    //     }
    //     res.send(description)
    // }).catch((e)=>{
    //     console.log(e)
    //     return res.status(500).send()
    // })
})

router.patch('/tasks/:id',auth,async (req,res)=>{
    const update=Object.keys(req.body)
    const allowUpdate=['description','model']
    const isValidOperation=update.every((update)=>allowUpdate.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:"invalid Update"})

    }
    try{
       const task =await Task.findOne({_id :req.params.id,owner:req.user._id})
        //const task =await Task.findById(req.params.id);
        
        //const task =await Task.findByIdAndUpdate(req.params.id ,req.body ,{new:true ,runValidators:true})
        if(!task){
            return res.status(400).send()
        }
        update.forEach((upsates)=>task[upsates]=req.body[upsates])
        console.log(task);
        await task.save()
        res.send(task)
   
    }catch(e){
        res.status(400).send(e)
    }

})
router.delete('/tasks/:id',auth,async (req,res)=>{
    console.log(req.user._id)
    try{
        const user =await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!user){
            return res.status(404).send({user:"User not found"})
        }
        res.send(user)
    }catch(e){
        res.send(500)
    }
})
module.exports=router 