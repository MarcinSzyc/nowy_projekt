const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const app = require('../../app');
const { deleteOne } = require('../models/movie');
const axios = require('axios');
const Movie = require('../models/movie');

chai.should();
chai.use(chaiHttp);

describe('endpoint tests', () => {
    let token;

    before(() => {
        return new Promise((resolve) => {
            try {
                axios({
                    method: 'post',
                    url: '0.0.0.0:3000/auth',
                    data: {
                        username: 'basic-thomas',
                        password:  'sR-_pcoow-27-6PAwCD8'
                    }
                })
                .then((result) => {
                    token = result.data.token;
                    resolve();
                })
            } catch (err) {
                console.error(err);
                reject();
            }
        });
    }) 

    // GET Movies
    describe('GET Movies', () => {
        it('It should get all movies from database', () => {
            chai.request(app)
                .get('/movies')
                .set({ Authorization: `Bearer ${token}` })
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(200);
                    }
                })
        })
    })

    // POST Movies
    describe('POST Movies', () => {
        it('It should create new movie and save it to database', () => {
            chai.request(app)
                .post('/movies')
                .set({Authorization: `Bearer ${token}` })
                .send({movieName: 'test'})
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(200);
                    }
                })
        })
    })

    after(() => {
        Movie.deleteMany({title: "Test" })
        .then((result) => {
            if (result.deletedCount > 0) {
                console.log('test data successfully removed');
            } else {
                console.log('nothing removed');
            }

        })
        .catch((error) => { 
            console.log(error);
        })
        .finally(() => {
            process.exit();
        })
    })
})