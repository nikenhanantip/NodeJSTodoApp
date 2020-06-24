require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
const port = process.env.PORT || '3000';
const app = express();

// Database configuration
require('./todo-api/config/db.config');

// For parsing application/json
app.use(bodyParser.json());

// For parsing application wwww-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// Router
const todo = require('./todo-api/routers/todo.router');
app.use('/todo', todo);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware for error handling
app.use((err, req, res, next) => {
    console.log(`Error occured: ${err.message}`);
    res.status(err.statusCode || 500).json({
        error: err.message
    });
    res.send();
});

// Listen to server
const server = app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});

module.exports = server;