const notes = require('express').Router();
const { json } = require('express');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils.js');
const { v4: uuidv4 } = require('uuid');

// 
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    })
})

// 
notes.get('/note/:id', (req, res) => {
    const noteId = req.params.id;

    readFromFile('./db/db.json')
        .then((data) =>{
            JSON.parse(data);
        })
        .then((json) => {
            const result = json.filter((note) => note.id === noteId);
            console.log(result);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        })
})

// 
notes.post('/', (req, res)=> {
    console.log(req.body);

    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error(`Error in adding note`);
    }
})

// 
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            console.log(result);

            writeToFile('./db/db.json', result);

            res.json(`Note ${noteId} has been deleted`);
        })
})

// 
module.exports = notes;