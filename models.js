'use strict';

//var dateFormat = require('dateformat');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tripPostSchema = mongoose.Schema({
    destination: {type: String, required: true},
    when: {type: String, required: true },
    lastDayOfTrip: {type: String, required: true},
    tripDetails: {type: String, required: true}
});

tripPostSchema.methods.serialize = function() {
    return {
        id: this._id,
        destination: this.destination,
        when: this.when,
        lastDayOfTrip: this.lastDayOfTrip,
        tripDetails: this.tripDetails
    };
};

const TripPost = mongoose.model('TripPost', tripPostSchema)

module.exports = {TripPost};