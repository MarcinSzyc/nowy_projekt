require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');
const Movie = require('./models/movie');
const jwt = require('jsonwebtoken');

const PORT = 4000;
const { JWT_SECRET, MONGODB_PASSWORD, OMDB_KEY} = process.env;

const db = 'mongodb+srv://marcin:' + MONGODB_PASSWORD +'@cluster0.qoe8q.mongodb.net/nowy_projekt?retryWrites=true&w=majority';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('connected to DB');
        app.listen(PORT);
    })
    .catch((err) => console.log("Error while connecting to DB: " + err));

//set middleware
app.use(express.json());

const fetchMovieDetails = (movieTitle) => {
    return new Promise((resolve) => {
        try {
            axios({
                method: 'get',
                url: 'http://www.omdbapi.com/?i=tt3896198&apikey=' + OMDB_KEY + '=' + movieTitle,
            })
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                var test = 'r'
            })
        } catch (err) {
            res.status(401).json({ error: "Error while reaching omdb" });
            reject();
        }
    });
}

const authenticateUser = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader && authorizationHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, 'secret', (err, user ) => {
        if (err) {
            return res.status(403).json({ error: "Provided token in invalid: " + err });
        }
        req.userName = user;
        next()
    })
}

const checkLimit = (req, res, next) => {
    const userName = req.userName;
    const userRole = userName.role;
    if (userRole === 'basic') {
        Movie.find({createdBy : userName.name}, (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error while checking DB limits: " + err });
            }
            let month = new Date().getMonth();
            let dataLength = data.filter((element) => {
                return element.createdAt.getMonth() === month;
            })
            if (dataLength.length >= 5) {
                return res.status(429).json({ error: "User reached monthly limit of requests" })
            } else {
                next();
            }
        })  
    }
}

app.get('/movies', authenticateUser, (req, res) => {
    Movie.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
});

app.post('/movies', authenticateUser, checkLimit, (req, res) => {
    const movieTitle = req.body.movieName;
    const movieDetails = fetchMovieDetails(movieTitle)
    .then(response => {
        if (!response || !response.data || response.data.Error || response.data.Title === 'undefined') {
            return res.status(400).json({ error: "Movie title not found" })
        }
        Movie.find({ title : response.data.Title }, (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Error while saving to DB:" + err });
            }
            if (data.length) {
                return res.status(409).json({ error: "Object already exist" });
            }
        })
        const movie = new Movie({
            title: response.data.Title,
            released: response.data.Released,
            genre: response.data.Genre,
            directory: response.data.Director,
            createdBy: req.userName.name
        })
        movie.save()
            .then(() => {
                Movie.find()
                    .then(() => {
                        res.status(200).json({success: 'Movie created successfully'});
                    });
            })
            .catch((err) => {
                res.status(500).json({error: "Error while saving data to DB: " + err});
            })
    });
});

module.exports = app
