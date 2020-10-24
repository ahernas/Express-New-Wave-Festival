const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/seats.controllers');

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getById);

router.post('/seats', SeatController.postNew);
//     (req, res) => {
//
//     const { day, seat, client, email } = req.body;
//     // randomId takes next number ID in the queue, so randomId is unique
//     if(db.seats.some( d => d.day === day && d.seat === seat)) {
//         return res.status(400).json({message: "The slot is already taken..."});
//     }
//     const randomId = db.seats.length + 1;
//     db.seats.push({id: randomId, day: day, seat: seat, client: client, email: email});
//     req.io.emit('seatsUpdated', db.seats);
//     res.json({message: 'OK'});
//
// });

router.put('/seats/:id', SeatController.putById);
router.delete('/seats/:id', SeatController.deleteById);

module.exports = router;