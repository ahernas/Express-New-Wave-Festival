const express = require('express');
const router = express.Router();
const db = require('./../db');

router.get('/testimonials', (req,res) => {
    res.json(db.testimonials);
});

router.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * ( db.testimonials.length - 1 ));
    res.json(db.testimonials[randomIndex]);
});

router.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.find(obj => obj.id == req.params.id));
});

router.post('/testimonials', (req, res) => {

    const { author, text } = req.body;
    // randomId takes next number ID in the queue, so randomId is unique
    const randomId = db.testimonials.length + 1;
    db.testimonials.push({id: randomId, author: author, text: text});
    res.json({message: 'OK'});
});

router.put('/testimonials/:id', (req, res) => {

    const { author, text } = req.body;
    const elementById = db.testimonials.find(obj => obj.id == req.params.id);

    if(!elementById) {
        res.status(404).json({error: 'Not Found'})
    }
    elementById.author = author;
    elementById.text = text;
    res.json({message: 'OK'});
});

router.delete('/testimonials/:id', (req, res) => {

    const objectId = req.params.id;
    db.testimonials.splice(objectId - 1, 1);
    res.json({message: 'OK'});
});

module.exports = router;