const {json} = require('express')
const Note = require('../models/notesModel')
const mongoose = require('mongoose')

// Get all notes
const getNotes = async(req, res) =>{
    const user_id = req.user._id
    
    const notes = await Note.find({user_id}).sort({createdAt: -1})


    res.status(200).json(notes)
}

// Getting a single Note
const getNote = async(req, res) =>{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Not a valid key"})
    }

    const note = await Note.findById(id)
    
    if (!note){
        return res.status(404).json({error: "No suck note exist"})
    }

    res.status(200).json(note)
}

// Creating a new Note
const createNote = async(req, res) => {
    const {title, description, pinned } = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }

    // Only added title, will add more stuff in app

    if(emptyFields.length>0){
        return res.status(400).json({error: "Please Fill all the necessary titles", emptyFields})
    }

    // Adding note to DB
    try{
        const user_id = req.user._id
        const note = await Note.create({title, description, pinned, user_id})

        res.status(200).json({
          message: "Note Added",
          note: note
        })
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// Delete a note
const deleteNote = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }

    const note = await Note.findOneAndDelete({_id: id})
    
    if(!note){
        return res.status(404).json({error: 'No such note exist'})
    }

    res.status(200).json({
        message: "Note deleted",
        note: note
    })
}

// Updating a note
const updateNote = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID'})
    }

    const note = await Note.findByIdAndUpdate(id, {
        ...req.body
    }, {new: true})

    if(!note){
        return res.status(404).json({error: 'No such note exist'})
    }

    res.status(200).json({
        message: "Note Updated",
        note: note
    })
}

module.exports = {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
}