const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    // ano: Number,
    // editora: String,
    // Aqui fazemos o relacionamento com o Autor
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor', // Nome exato do modelo acima
        required: true
    }
});

module.exports = mongoose.model('Livro', LivroSchema);