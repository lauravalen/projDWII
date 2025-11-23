<<<<<<< HEAD
// models/Book.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  year: Number,
  price: Number,
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Book || mongoose.model('Book', BookSchema);
=======
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
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436
