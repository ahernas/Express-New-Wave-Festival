const express = require('express');
const router = express.Router();
const db = require('./../db');

router.get('/concerts', (req,res) => {
    res.json(db.concerts);
});

router.get('/concerts/:id', (req, res) => {
    res.json(db.concerts.find(obj => obj.id == req.params.id));
});

router.post('/concerts', (req, res) => {

    const { performer, genre, price, day, image } = req.body;
    // randomId takes next number ID in the queue, so randomId is unique
    const randomId = db.concerts.length + 1;
    db.concerts.push({id: randomId, performer: performer, genre: genre, price: price, day: day, image: image});
    res.json({message: 'OK'});
});

router.put('/concerts/:id', (req, res) => {

    const { performer, genre, price, day, image } = req.body;
    const elementById = db.concerts.find(obj => obj.id == req.params.id);

    if(!elementById) {
        res.status(404).json({error: 'Not Found'})
    }
    elementById.performer = performer;
    elementById.genre = genre;
    elementById.price = price;
    elementById.day = day;
    elementById.image = image;

    res.json({message: 'OK'});
});

router.delete('/concerts/:id', (req, res) => {

    const objectId = req.params.id;
    db.concerts.splice(objectId - 1, 1);
    res.json({message: 'OK'});
});

module.exports = router;