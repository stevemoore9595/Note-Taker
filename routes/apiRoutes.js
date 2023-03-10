const router = require('express').Router();
const { readAndAppend, readFromFile, readAndRemove } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


router.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

router.post('/notes', (req, res) => {
   const { title, text} = req.body;
    if (title && text) { 
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error');
  }
});

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id
    readAndRemove('./db/db.json', noteId)
    res.json('success')
})

module.exports = router;
