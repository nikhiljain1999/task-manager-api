const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const Task = require('./task')
const sharp = require('sharp')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid")
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error("Password must be greater than or equal to 6 characters");
            }
            if (value === "password") {
                throw new Error("password must not be a password")
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be positive no")
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],
    avator: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: "_id",
    foreignField: "owner"
})
// const me=new User({
//     name:"MIke    ",
//     email:"mike123@gmail.com  ",
//     password:"nikhil123 "
// })
// me.save().then((me)=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })
// const Task=mongoose.model("Task",{
//     description:{
//         type:String,
//         trim:true,
//         require:true
//     },
//     model:{
//         type:Boolean,
//         default:false
//     }
// })
// const me=new Task({
//     description:"React js",

// })
// me.save().then((me)=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// }))

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avator

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login ')
    }
    const isMathch = await bcrypt.compare(password, user.password)
    if (!isMathch) {
        throw new Error("Unable to login")
    }
    return user
}


userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 0)

    }
    next()
})
// Delete user task when user is delete

userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User