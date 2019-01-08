'use strict'

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

require('dotenv').config();

const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
mongoose.Promise = global.Promise;

const { DATABASE_URL, PORT } = require('./config');
const { TripPost} = require('./models');

const jsonParser = bodyParser.json();

const app = express();

//logging 
app.use(morgan('common'));

app.use(express.json());

app.use(express.static("public"));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

passport.use(localStrategy);
//passport.use(jwtStrategy);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });


app.get('/api/test', (req, res) => {
  return res.json({
    data: ['hi from our test', "hello", "bye"]
  });
});

// A protected endpoint which needs a valid JWT to access it
app.get('/trips/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.get('/trips', (req, res) => {
    TripPost
    .find()
    .then(trips => {
        res.json(trips.map(trip => trip.serialize()));
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong'});
    });
});

app.post('/trips', (req, res) => {
    const requiredFields = ['destination', 'when', 'lastDayOfTrip'];
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


app.delete('/trips/:id', (req, res) => {
    TripPost.delete(req.params.id);
    console.log(`Deleted Trip \`${req.params.ID}\``);
    res.status(204).end();
});


app.put('/trips/:id', jsonParser, (req, res) => {
    const requiredFields = ['destination', 'when', 'lastDayOfTrip'];
    for (let i=0; i<requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
        }
    }
    
    if (req.params.id !== req.body.id) {
        const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
        console.error(message);
        return res.status(400).send(message);
    }
    console.log(`Updating shopping list item \`${req.params.id}\``);

    TripPost
    .update({
        id: req.params.id,
        destination: req.body.destination,
        when: req.body.when,
        lastDayOfTrip: req.body.lastDayOfTrip
    })
    .catch( err => res.status(500).json({ message: 'Something went wrong'}));
    res.status(204).end();
}); 

app.use('*', function (req, res) {
    res.status(404).json({message : 'Not Found'});
});



let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
            .on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
