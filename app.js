const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Movie = require('./models/movie');

const db = 'mongodb+srv://marcin:deodorant@cluster0.qoe8q.mongodb.net/nowy_projekt?retryWrites=true&w=majority';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> {
        console.log('connected to db');
        app.listen(3000);
    })
    .catch((err) => console.log("Error while connecting to db" + err));

app.set('view engine', 'ejs');

app.post('/', (req, res) => {
    res.render('index');
})
