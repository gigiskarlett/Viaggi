'use strict'

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const {TripPost} = require('./models');

const jsonParser = bodyParser.json();

const app = express.Router();


// Do I need to add this to my get router?
// app.get('/protected', jwtAuth, (req, res) => {
//   });
// });

app.get('/', (req, res) => {
    TripPost
    .find()
    .sort({when: 1})
    .then(trips => {
        res.json(trips.map(trip => trip.serialize()));
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong'});
    });
});

app.get('/:id', (req, res) => {
    TripPost
    .findById(req.params.id)
    .then(trips => res.json(trips.serialize()))
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'something went horribly wrong'});
    });
});

app.post('/', jsonParser, (req, res) => {
    const requiredFields = ['destination', 'when', 'lastDayOfTrip', 'tripDetails'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`;
            console.error(message);
            return res.status(400).send(message)
        }
    }

    TripPost
    .create({ 
        destination: req.body.destination,
        when: req.body.when,
        lastDayOfTrip: req.body.lastDayOfTrip,
        tripDetails: req.body.tripDetails
    })
    .then(tripPost => res.status(201).json(tripPost.serialize()))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong'})
    });

});


app.delete('/:id', (req, res) => {
    TripPost
    .findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted blog post with id \`${req.params.id}\``);
      res.status(204).end();
    })
    .catch(err => res.status(500).json({ message: 'Something went wrong' }));
});


app.put('/:id', jsonParser, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(500).json({
          message: 'Request path id and request body id values must match'
        });
    }
    
    const updated = {};
    const updateableFields = ['destination', 'when', 'lastDayOfTrip', 'tripDetails'];
    updateableFields.forEach(field => {
        if (field in req.body) {
          updated[field] = req.body[field];
        }
    });
    console.log(updated)
    
    TripPost
        .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true }) //what differs if I have new?
        .then(TripPost => res.status(204).end())
        .catch(err => res.status(500).json({ message: 'Something went wrong' }));
}); 

app.use('*', function (req, res) {
    res.status(404).json({message : 'Not Found'});
});



module.exports = app;