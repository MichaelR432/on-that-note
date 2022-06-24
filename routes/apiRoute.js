const router = require('express').Router();
const data = require('../db/data');

router.get('/notes', function (req, res) {
    data.fetchNotes()
    .then(notes => res.json(notes))
    .catch(err => console.log(err));
});

router.post('/notes', (req, res) => {
    data.addNote(req.body)
    .then((note) => res.json(note))
    .catch(err => console.log(err));
});

module.exports = router;

