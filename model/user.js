const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new  Schema({
    name: String,
    email: String,
    password: String,
    addedDate: String,
    lastActive: String,
})



module.exports = mongoose.model('user', userSchema, 'user');
