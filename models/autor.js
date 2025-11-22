var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autorSchema = new Schema({
    nome: { type: String, required: true },
    biografia: { type: String, default: '' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Autor', autorSchema);