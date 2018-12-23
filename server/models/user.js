const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   name: String,
   type: String,
   data: String 
});

module.exports = mongoose.model('User', userSchema);