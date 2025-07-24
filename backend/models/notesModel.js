const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    user_id:{
        type: String,
        required: true
    },
    pinned:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Note', notesSchema)