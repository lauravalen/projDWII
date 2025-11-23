<<<<<<< HEAD
// models/Author.js
const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Author || mongoose.model('Author', AuthorSchema);
=======
const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    // nacionalidade: String
});

module.exports = mongoose.model('Autor', AutorSchema);
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436
