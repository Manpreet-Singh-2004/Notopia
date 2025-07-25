const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) =>{
    
    // verification auth
    const {authorization} = req.headers
    if(!authorization){
        return resizeBy.status(401).json({error: "Auth token is required"})
    }
    // Spliting Bearer token
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()
    }
    catch(error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth