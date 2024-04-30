const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils.js');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        res.json(JSON.parse(data));
    })
})

module.exports = notes;