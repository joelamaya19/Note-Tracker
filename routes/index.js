const router = require('express').Router();

const noteRouter = require('./notes.js');

router.use('/notes', noteRouter);

module.exports = router;