var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var usuarioSchema = mongoose.Schema({
    local: {
        email: String,
        senha: String
    }
});

usuarioSchema.methods.gerarHash = function(senha) {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
};

usuarioSchema.methods.validarSenha = function(senha) {
    return bcrypt.compareSync(senha, this.local.senha);
};

module.exports = mongoose.model('Usuario', usuarioSchema);