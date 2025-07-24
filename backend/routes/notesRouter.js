const express = require('express')
const {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
} = require('../controllers/notesController')

// Importe middleware Auth
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// Auth for routes
router.use(requireAuth)

// Get all notes
router.get('/', getNotes)

// Get a single note
router.get('/:id', getNote)

// Create note
router.post('/', createNote)

// Delete note
router.delete('/:id', deleteNote)

// Update note
router.patch('/:id', updateNote)

module.exports = router