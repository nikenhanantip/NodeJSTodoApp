const TodoModel = require('../../models/todo.model');

// Import the dev-dependencies
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../index');
const assert = require('assert');

const route = '/todo';
const requestHelper = require('./todo.helper');

chai.use(chaiHttp);

// Begin parent block
describe('Todo controller', () => {
    let dummyTodo;

    before(async() => {
        await mongoose.connection.dropCollection('todos');
        TodoModel.counterReset('id', (err) => {
            if (err) throw err;
            console.log('Success reset Todo model');
        })
        dummyTodo = await TodoModel.create(requestHelper[2]);
    })

    after((done) => {
        TodoModel.deleteMany({});
        done();
    })

    /** Begin /todo route */
    describe('GET /todo', () => {
        it('Should success get all todo list', (done) => {
            chai.request(server)
                .get(route)
                .end((err, res) => {
                    if (err) done();
                    assert.equal(res.status, 200);
                    done();
                })
        })
    })

    describe('POST /todo', () => {
        it('Should success create todo', (done) => {
            chai.request(server)
                .post(route)
                .send(requestHelper[2])
                .end((err, res) => {
                    if (err) done();
                    assert.equal(res.status, 201);
                    done();
                })
        })
    })

    /** Begin /todo/:id route */
    describe('GET /todo/:id', () => {
        it('Should success get detail todo by id', (done) => {
            chai.request(server)
                .get(`${route}/${dummyTodo.id}`)
                .end((err, res) => {
                    if (err) done();
                    assert.equal(res.status, 200);
                    done();
                })
        })

        it('Should error detail todo when send invalid id', (done) => {
            chai.request(server)
                .get(`${route}/0909`)
                .end((err, res) => {
                    if (err) done();
                    assert.equal(res.status, 404);
                    done();
                })
        })
    })
    
    describe('PUT /todo/:id', () => {
        it('Should success update todo by id', (done) => {
            chai.request(server)
                .put(`${route}/${dummyTodo.id}`)
                .send(requestHelper[3])
                .end((err, res) => {
                    if (err) done();
                    assert.equal(res.status, 200);
                    done();
                })
        })

        it('Should error update todo when send invalid id', (done) => {
            chai.request(server)
                .put(`${route}/0909`)
                .send(requestHelper[3])
                .end((err, res) => {
                    if (err) done();
                    assert.equal(res.status, 404);
                    done();
                })
        })
    })

    describe('DELETE /todo/:id', () => {
        it('Should success delete todo by id', (done) => {
            chai.request(server)
                .delete(`${route}/${dummyTodo.id}`)
                .end((err, res) => {
                    if (err) done();
                    assert.equal(res.status, 200);
                    done();
                })
        })

        it('Should error delete todo when send invalid id', (done) => {
            chai.request(server)
                .delete(`${route}/0909`)
                .end((err, res) => {
                    if (err) done();
                    assert.equal(res.status, 404);
                    done();
                })
        })
    })
})