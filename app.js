const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');
const Movie = require('./models/movie');
const jwt = require('jsonwebtoken');

const db = 'mongodb+srv://marcin:deodorant@cluster0.qoe8q.mongodb.net/nowy_projekt?retryWrites=true&w=majority';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('connected to db');
        app.listen(3500);
    })
    .catch((err) => console.log("Error while connecting to db" + err));

//set middleware
app.use(express.json());

const fetchMovieDetails = (movieTitle) => {
    return axios({
        method: 'get',
        url: 'http://www.omdbapi.com/?i=tt3896198&apikey=48caed9c&t=' + movieTitle
    })
}

const authenticateUser = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader && authorizationHeader.split(' ')[1];
    
    if (token === null) {
        return res.status(401).json({ error: "No token provided" });
    }
    jwt.verify(token, 'secret', (error, user ) => {
        if (error) {
            return res.status(403).json({ error: "Provided token in invalid" });
        }
        req.userStatus = 'Authenticated';
        next()
    })
}

app.get('/movies', authenticateUser, (req, res) => {
    Movie.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(500).json({error: error})
        });
});

app.post('/movies', authenticateUser, (req, res) => {
    const movieTitle = req.body.movieName;
    const movieDetails = fetchMovieDetails(movieTitle)
    .then(response => {
        if (!response || !response.data || response.data.Error || response.data.Title === 'undefined') {
            return res.status(400).json({ error: "Movie title not found" })
        }
        Movie.find({ title : response.data.Title }, (error, data) => {
            if (error) {
                return res.status(500).json({ error: "Error while saving to DB" });
            }
            if (data.length) {
                return res.status(409).json({ error: "Object already exist" });
            }
        })
        const movie = new Movie({
            title: response.data.Title,
            released: response.data.Released,
            genre: response.data.Genre,
            directory: response.data.Director
        })
        movie.save()
            .then(() => {
                Movie.find()
                    .then(movies => {
                        res.status(200).json({success: 'Movie created successfully'});
                    });
            })
            .catch((error) => {
                res.status(500).json({error: "Error while saving data to DB"});
            })
    });
});

module.exports = app
