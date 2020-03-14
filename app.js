/**
 * Entry point for application
 */

const express = require('express');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to MongoDB (note: this creates the db if it doesnt exist)
mongoose.connect("mongodb://localhost/ninjadb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// initialize routes
app.use('/api', require('./routes/api'));

// listen for requests
const PORT = 3000;
app.listen(process.env.port || PORT, () => {
    console.log(`listening on port ${process.env.port ? process.env.port : PORT} ...`);
});
