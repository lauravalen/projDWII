// models/Dvd.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD
const DvdSchema = new Schema({
  title: { type: String, required: true },
  year: Number,
  price: Number,
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  createdAt: { type: Date, default: Date.now }
=======
var dvdSchema = new Schema({
    titulo: { type: String, required: true },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true },
    // ano: { type: Number }
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436
});

module.exports = mongoose.models.Dvd || mongoose.model('Dvd', DvdSchema);
