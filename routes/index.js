const router = require('express').Router();

// Import our modular routes for /notes
const notesRouter = require('./notes.js');

// Initialize notes route
router.use('/notes', notesRouter);

module.exports = router;