const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect with mlab database.
mongoose.connect('mongodb://Atif:app123@ds141654.mlab.com:41654/graphqltodo', () => {
    console.log('Database connected');
});

app.use('/graphiql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(2000, () => {
    console.log("Server is listening on port 2000");
});