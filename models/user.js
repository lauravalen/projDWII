const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: String,
    nome: String,
    email: String
});

module.exports = mongoose.model('User', UserSchema);