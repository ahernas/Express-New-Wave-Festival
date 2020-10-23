const express = require('express');
const router = express.Router();
const db = require('./../db');

router.get('/seats', (req,res) => {
    res.json(db.seats);
});

router.get('/seats/:id', (req, res) => {
    res.json(db.seats.find(obj => obj.id == req.params.id));
});

router.post('/seats', (req, res) => {

    const { day, seat, client, email } = req.body;
    // randomId takes next number ID in the queue, so randomId is unique
    if(db.seats.some( d => d.day == day && d.seat == seat)) {
        res.status(400).json({message: "The slot is already taken..."});
        return;
    }
    const randomId = db.seats.length + 1;
    db.seats.push({id: randomId, day: day, seat: seat, client: client, email: email});
    res.json({message: 'OK'});

});

router.put('/seats/:id', (req, res) => {

    const { day, seat, client, email } = req.body;
    const elementById = db.seats.find(obj => obj.id == req.params.id);

    if(!elementById) {
        res.status(404).json({error: 'Not Found'})
    }
    elementById.day = day;
    elementById.seat = seat;
    elementById.client = client;
    elementById.email = email;

    res.json({message: 'OK'});
});

router.delete('/seats/:id', (req, res) => {

    const objectId = req.params.id;
    db.seats.splice(objectId - 1, 1);
    res.json({message: 'OK'});
});

module.exports = router;