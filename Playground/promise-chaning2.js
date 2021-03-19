require("../src/db/mongoose")
const Task =require("../src/models/task")

// Task.findByIdAndDelete("604b330b476bd4105c23bd17").then((task)=>{
//     console.log(task)
//     return Task.countDocuments({model:false})
// }).then((task)=>{
//     console.log(task)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount= async (id)=>{
    const remove=await Task.findByIdAndRemove(id)
    const count =await Task.countDocuments({model:false})
    return count
}
deleteTaskAndCount('604b3a7b16f91e3074409e89').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
