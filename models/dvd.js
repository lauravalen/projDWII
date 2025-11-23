// models/Dvd.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DvdSchema = new Schema({
  title: { type: String, required: true },
  year: Number,
  price: Number,
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Dvd || mongoose.model('Dvd', DvdSchema);
