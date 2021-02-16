const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const app = require('../app');
const { deleteOne } = require('../models/movie');
const axios = require('axios');
const Movie = require('../models/movie');

chai.should();
chai.use(chaiHttp);

describe('endpoint tests', () => {
    let token;

    before(() => {
        return new Promise((resolve, reject) => {
            try {
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/auth',
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
        it('It should return error due to lack of authorization token', (done) => {
            chai.request(app)
                .get('/movies')
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(401);
                    }
                    done();
                })
        })

        it('It should return error due to invalid token', (done) => {
            chai.request(app)
                .get('/movies')
                .set({ Authorization: `Bearer ${token.slice(0,-1) + 'b'}` })
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(403);
                    }
                    done();
                })
        })

        it('It should get all movies from database', (done) => {
            chai.request(app)
                .get('/movies')
                .set({ Authorization: `Bearer ${token}` })
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(200);
                    }
                    done();
                })
        })
    })

    // POST Movies
    describe('POST Movies', (done) => {
        before(()=> {
            Movie.deleteMany({}, ()=>{
                console.log('db clean')
            })
        })

        it('It should create new movie and save it to database', (done) => {
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
                    done();
                })
            
        })

        it('It should return error due to invalid token', (done) => {
            chai.request(app)
                .post('/movies')
                .set({Authorization: `Bearer ${token.slice(0,-1) + 'b'}`})
                .send({movieName: 'test'})
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(403);
                    }
                    done()
                })
        })

        it('It should return error due to lack of authorization token', (done) => {
            chai.request(app)
                .post('/movies')
                .send({movieName: 'test'})
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(401);
                    }
                    done();
                })
        })

        it('It should return error due to no movie found', (done) => {
            chai.request(app)
                .post('/movies')
                .set({Authorization: `Bearer ${token}` })
                .send({movieName: 'tttittaniiccc'})
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(400);
                    }
                    done();
                })
        })

        it('It should return error due to entry already found', (done) => {
            chai.request(app)
                .post('/movies')
                .set({Authorization: `Bearer ${token}` })
                .send({movieName: 'test'})
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(409);
                    }
                    done();
                })
        })

        it('It should return error due to entry already found', (done) => {
            chai.request(app)
                .post('/movies')
                .set({Authorization: `Bearer ${token}` })
                .send({movieName: 'test'})
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(409);
                    }
                    done();
                })
        })

        it('It should return error due because of too many request made by user', (done) => {
            before(()=> {
                Movie.deleteMany({}, ()=>{
                    console.log('db clean')
                })
            })
            
            var requester = chai.request(app).keepOpen();

            Promise.all([
                requester.post('/movies').set({Authorization: `Bearer ${token}` }).send({movieName: 'Titanic'}),
                requester.post('/movies').set({Authorization: `Bearer ${token}` }).send({movieName: 'Inception'}),
                requester.post('/movies').set({Authorization: `Bearer ${token}` }).send({movieName: 'Castaway'}),
                requester.post('/movies').set({Authorization: `Bearer ${token}` }).send({movieName: 'Tenet'}),
            ])
            .then(responses => {
                requester.post('/movies')
                    .set({Authorization: `Bearer ${token}` })
                    .send({movieName: 'Interstellar'})
                    .end((error, response) => {
                        if (error) {
                            console.log(error);
                        } else {
                            response.should.have.status(429);
                        }
                        requester.close();
                        done();
                    })
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