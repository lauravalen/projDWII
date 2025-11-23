// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { type: String, default: '' },
  email: { type: String, lowercase: true, trim: true, index: true, unique: false },
  password: { type: String, default: '' }, // hashed password (bcrypt)
  googleId: { type: String, index: true, unique: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
