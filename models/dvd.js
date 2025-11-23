var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dvdSchema = new Schema({
    titulo: { type: String, required: true },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Autor', required: true },
    // ano: { type: Number }
});

module.exports = mongoose.model('Dvd', dvdSchema);