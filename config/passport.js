var LocalStrategy = require('passport-local').Strategy;
var Usuario = require('../models/user.js');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //REGISTRO
    passport.use('local-registro', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        passReqToCallback: true
    },
    function(req, email, senha, done) {
        process.nextTick(function() {
            Usuario.findOne({ 'local.email': email }, function(err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, false, req.flash('mensagem', 'Esse email já existe.'));
                } else {
                    var novoUsuario = new Usuario();
                    novoUsuario.local.email = email;
                    novoUsuario.local.senha = novoUsuario.gerarHash(senha); // Criptografa

                    novoUsuario.save(function(err) {
                        if (err) throw err;
                        return done(null, novoUsuario);
                    });
                }
            });
        });
    }));

    //LOGIN
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        passReqToCallback: true
    },
    function(req, email, senha, done) {
        Usuario.findOne({ 'local.email': email }, function(err, user) {
            if (err) return done(err);
            if (!user) return done(null, false, req.flash('mensagem', 'Usuário não encontrado.'));
            if (!user.validarSenha(senha)) return done(null, false, req.flash('mensagem', 'Senha incorreta.'));
            return done(null, user);
        });
    }));
};