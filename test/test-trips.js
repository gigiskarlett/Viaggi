// 'use strict';

// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const faker = require('faker');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const should = chai.should();

// const expect = chai.expect;

// const { app, runServer, closeServer } = require('../server');
// const { User } = require('../users');
// const { TEST_DATABASE_URL } = require('../config');

// chai.use(chaiHttp);

// function tearDownDb() {
//     return new Promise((resolve, reject) => {
//         console.warn('Bye database');
//        return  mongoose.connection.dropDatabase()
     
//     });
// }

// function seedTripPostData() {
//     console.log('seeding data');
//     let seededData = [];
//     for (let i = 1; i <= 5; i++) {
//         seededData.push({
//             destination: faker.lorem.text(),
//             when: new Date(),
//             lastDayOfTrip: new Date(),
//             tripDetails: faker.lorem.sentence()
//         });
//     };
//     return TripPost.insertMany(seededData)
// }

// describe('Trip organizer posts API resource', function() {

//     before(function() {
//         return runServer(TEST_DATABASE_URL);
//     });

//     beforeEach(function() {
//         return seedTripPostData();
//     });

//     afterEach(function(){
//         return tearDownDb();
//     });

//     after(function(){
//         return closeServer();
//     });
// })

// describe.only('GET endpoint', function(){
//     it('should return all trips', function(){
//         let res;
//         return chai.request(app)
//         .get('/api/trips')
//         .then(_res => {
//             res = _res;
//             res.should.have.status(200);
//             res.body.should.have.lengthOf.at.least(1);

//             return TripPost.count();
//         })
//         .then(count => {
//             res.body.should.have.lengthOf(count);
//         });
//     });

//     it('should return posts with right fields', function() {
//         let resTrip;
//         return chai.request(app)
//         .get('/api/trips')
//         .then(res => {
//             console.log(res.body)
//             res.should.have.status(200);
//             res.should.be.json;
//             res.body.should.be.a('object');
//             res.body.should.have.lengthOf.at.least(1);

//             res.body.forEach(function(trip) {
//                 trip.should.be.a('object')
//                 trip.should.include.keys('id', 'destination', 'when', 'lastDayOfTrip', 'tripDetails')
//             });
//             resTrip = res.body[0];
//             return TripPost.findById(resTrip.id)
//         })
//         .then(trip => {
//             resTrip.destination.should.equal(trip.destination);
//             resTrip.when.should.equal(trip.when);
//             resTrip.lastDayOfTrip.should.equal(trip.lastDayOfTrip);
//             resTrip.tripDetails.should.equal(trip.tripDetails);
//         })
//     });
// });
