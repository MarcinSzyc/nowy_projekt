const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        requires: true
    },
    released: {
        type: Date
    },
    genre: {
        type: String
    },
    directory: {
        type: String
    }
}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;