const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        requires: true
    },
    released: {
        type: Date,
        requires: true
    },
    genre: {
        type: String,
        requires: true
    },
    directory: {
        type: String,
        requires: true
    },
    createdBy: {
        type: String,
        requires: true
    }
}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;