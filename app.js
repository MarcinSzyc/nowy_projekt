const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');
const Movie = require('./models/movie');

const db = 'mongodb+srv://marcin:deodorant@cluster0.qoe8q.mongodb.net/nowy_projekt?retryWrites=true&w=majority';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> {
        console.log('connected to db');
        app.listen(3000);
    })
    .catch((err) => console.log("Error while connecting to db" + err));


//set context engine
app.set('view engine', 'ejs');

//set middleware
app.use(express.urlencoded({extended: true}))

const fetchMovieDetails = (movieTitle) => {
    return axios({
        method: 'get',
        url: 'http://www.omdbapi.com/?i=tt3896198&apikey=48caed9c&t=' + movieTitle
    })
}

app.get('/movies', (req, res) => {
    res.render('index');
})

app.post('/movies', (req, res) => {
    console.log(req.body)
    const movieTitle = req.body.movieName;
    const movieDetails = fetchMovieDetails(movieTitle)
    .then(response => {
        res.send(response.data);
    });
})
