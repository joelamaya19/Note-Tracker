// Import necessary modules and functions
const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils.js');
const { v4: uuidv4 } = require('uuid');

// GET /api/notes should read the db.json file and return all saved notes as JSON.
notes.get('/', (req, res) => {
    // Read contents of db.json file
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    })
})

// GET /api/notes/note/:id should read the db.json file, filter the notes by the provided id, and return the matching note.
notes.get('/note/:id', (req, res) => {
    // Extract the note ID from the request parameters
    const noteId = req.params.id;

    // Read the contents of db.json file
    readFromFile('./db/db.json')
        .then((data) =>{
            JSON.parse(data);
        })
        .then((json) => {
            // Filter the array of notes to find the note with the provided ID
            const result = json.filter((note) => note.id === noteId);
            console.log(result); // Log the filtered result for debugging

            // Check if a note with the provided ID exists
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        })
})

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
notes.post('/', (req, res)=> {
    const { title, text } = req.body;

    // Check if both title and text are provided
    if(title && text) {
        // Create a new note object with a unique ID
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        
        // Append the new note to db.json
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error(`Error in adding note`);
    }
})

// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete.
notes.delete('/:id', (req, res) => {
    // Extract the note ID from the request parameters
    const noteId = req.params.id;

    // Read the contents of db.json file
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Filter out the note with the provided ID
            const result = json.filter((note) => note.id !== noteId);

            // Write the updated data to db.json file
            writeToFile('./db/db.json', result);

            // Send a response indicating successful deletion
            res.json(`Note ${noteId} has been deleted`);
        })
})

// Export the router object
module.exports = notes;