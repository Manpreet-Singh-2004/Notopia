const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
        default: ''
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

//  static validations and method
// Login
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All Fields must be filled')
    }
    
    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect password')
    }
    return {message: "User Loggedin successfully", user}
}


// Signup
userSchema.statics.signup = async function(email, password) {
    
    if(!email || !password){
        throw Error('All Fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not string enough')
    }

    const exist = await this.findOne({email})

    if (exist){
        throw Error('Email already exists')
    }

    // Hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return {message: "User signed up successfully" , user}
}

module.exports = mongoose.model('User', userSchema)