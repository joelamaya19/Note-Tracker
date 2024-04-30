// Import Express Router
const router = require('express').Router();

// Import our modular routes for /notes
const notesRouter = require('./notes.js');

// Initialize notes route
router.use('/notes', notesRouter);

// Export the router to be used in the main application
module.exports = router;