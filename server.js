const express = require('express');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req,res) => {
    res.json(db);
});

app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * ( db.length - 1 ));
    res.json(db[randomIndex]);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.find(obj => obj.id == req.params.id));
});
console.log(db[0]);
app.post('/testimonials', (req, res) => {

    const { author, text } = req.body;
    // randomId takes next number ID in the queue, so randomId is unique
    const randomId = db.length;
    db.push({id: randomId, author: author, text: text})
    res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {

    const { author, text } = req.body;
    const elementById = db.find(obj => obj.id == req.params.id);

    if(!elementById) {
        res.status(404).json({error: 'Not Found'})
    }
    elementById.author = author;
    elementById.text = text;
    res.json({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {

    const objectId = req.params.id;
    db.splice(objectId-1,1);
    res.json({message: 'OK'});
});

app.use((req, res) => {
    res.status(404).send('Not found...');
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});