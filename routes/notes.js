const notes = require('express').Router();
const dbData = require('../db/db.json');

notes.post('/', (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
        const newNote = {
            title,
            text
        };
        readAndAppend(newNote, './db/db.json');
        res.json('Note Added!');
    } else {
        res.errored('Error')
    }
});

notes.get('/', (req, res) => readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))));

notes.delete('/', (req, res) => {
    const newDbData= dbData.filter((notes) => notes.id !== req.params.id);
    writeToFile('./db/db.json', newDbData);
    res.json(newDbData);
});

module.exports = notes;