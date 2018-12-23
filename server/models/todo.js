const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: String,
    type: String,
    priority: String
});

module.exports = mongoose.model('Todo', todoSchema);