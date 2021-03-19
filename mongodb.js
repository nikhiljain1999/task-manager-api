//CRUD create read update delete
// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient
// const ObjectID=mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"


// const id=new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database")
    }
    const db = client.db(databaseName)
    // db.collection('users').insertOne({

    //     name:"Vikram",
    //     age:26
    // },(error,result)=>{
    //     if(error){
    //         return console.log("Unable to insert user")
    //     }
    //     console.log(result.ops)
    // })
    // db.collection('users').insertMany([{
    //     name:'jen',
    //     age:25,
    // },{
    //     name:"Gaunther",
    //     age:27
    // }],(error,result)=>{
    //     (error,result)=>{
    //             if(error){
    //                 return console.log("Unable to insert document")
    //             }
    //             console.log(result.ops)
    //  } })
    // db.collection('Tasks').insertMany([{
    //     description:"Java Script",
    //     completed:true
    // },{
    //     description:"Node js",
    //     completed:false
    // },{
    //     description:"React",
    //     completed:true
    // }],(error,result)=>{
    //     if(error){
    //         return console.log("Unable to enter data")
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({name:'jen', age:25},(error,user)=>{
    //     if(error){
    //         return console.log("unable to fetch")
    //     }
    //     console.log(user)
    // })
    // db.collection('users').find({ age: 22 }).toArray((error,users)=>{
    //     console.log(users)
    // })
    // db.collection('users').find({ age: 22 }).count((error,count)=>{
    //     console.log(count)
    // })
    // db.collection('Tasks').findOne({_id:new ObjectID('6049dcdaeb6d5e09c89fcc35')},(error,description)=>{
    //     console.log(description)
    // })
    // db.collection('Tasks').find({completed:false}).toArray((error,user)=>{
    //     console.log(user)
    // })

//  db.collection('users').updateOne({_id:new ObjectID("6049bedd056d071a90c30370")},{
//         $inc:{
//             age: 1
//         }
//     }).then((result)=>{
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })
    // db.collection('Tasks').updateMany({completed:true},{
    //    $set:{
    //         completed:false
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((erroe)=>{
    //     console.log(error);
    // })


})

