// models/Author.js
const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Author || mongoose.model('Author', AuthorSchema);
