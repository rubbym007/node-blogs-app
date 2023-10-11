// Import Express
const express = require('express');

const blogsRouter = require('./routes/blogsRoutes');
const usersRouter = require('./routes/usersRoutes');

let app = express();

app.use(express.json());


app.use(express.static('public'))

// USING Routes
app.use('/api/v1/blogs', blogsRouter)
app.use('/api/v1/users', usersRouter)
app.all('*', (req, res, next) => {

    const err = new Error(`Can't find ${req.originalUrl} on the server!`);
    err.status = 'Fail';
    err.statusCode = 404;

    next(err);
})

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status: error.status,
        message: error.message
    })
})

module.exports = app;

