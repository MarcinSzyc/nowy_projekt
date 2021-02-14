const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const app = require('../app');
const { deleteOne } = require('../models/movie');

chai.should();

chai.use(chaiHttp);

describe('endpoint tests', () => {

    // GET Movies
    describe('GET Movies', () => {
        it('It should get all movies from database', (done) => {
            chai.request(app)
                .get('/movies')
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(200);
                        done()
                    }
                })
        })

    })

    // POST Movies
    // describe('POST Movies', () => {
    //     it('It should save movie to database', (done) => {
    //         const movieName = 'titanic';
    //         chai.request(app)
    //             .post('/movies')
    //             .type('form')
    //             .send({
                    
    //             })
    //     })

    // })

    // GET Login
    describe('GET Login', () => {
        it('It should show login page', (done) => {
            chai.request(app)
                .get('/login')
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(200);
                        done()
                    }
                })
        })

    })

    // POST Login
    describe('POST Login', () => {
        it('It return authorization token', (done) => {
            chai.request(app)
                .post('/login')
                .end((error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.should.have.status(200);
                        done()
                    }
                })
        })

    })

})