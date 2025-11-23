const mongoose = require('mongoose');

const AutorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    // nacionalidade: String
});

module.exports = mongoose.model('Autor', AutorSchema);