const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// Login the user
const loginUser = async(req, res)=>{
    const {email, password} = req.body

    try{
        const {user, message} = await User.login(email, password)

        // creating token
        const token = createToken(user._id)
        res.status(200).json({
            message,
            userID: user._id,
            email, 
            token
        })

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

// Signup the user
const signupUser = async(req, res)=>{
    const {email, password} = req.body

    try{
        const user = await User.signup(email, password)

        // creating token
        const token = createToken(user._id)
        res.status(200).json({
            message: "User signed up",
            userID: user._id,
            email, 
            token
        })

    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser}