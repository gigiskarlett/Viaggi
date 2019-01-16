'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const tripPostSchema = mongoose.Schema({
    destination: {type: String, required: true},
    when: {type: Date, required: true },
    lastDayOfTrip: {type: Date, required: true},
    tripDetails: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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