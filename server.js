// Import required modules
const express = require('express');
const path = require('path');
const api = require('./routes/index.js')

// Define the port number for the server
const PORT = process.env.PORT || 3001;

// Create an Express application
const app = express();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Mount the API routes under the '/api' prefix
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// THE ORDER MATTERS
// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

// GET * should return the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})