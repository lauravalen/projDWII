var express = require('express');
var router = express.Router();
var passport = require('passport');

// Rota de Login Customizada
router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { return res.status(500).json({ erro: err }); }
    if (!user) { return res.status(401).json({ erro: 'Usuário ou senha incorretos.' }); }
    
    req.logIn(user, function(err) {
      if (err) { return res.status(500).json({ erro: err }); }
      return res.json({ mensagem: 'Login realizado com sucesso!' });
    });
  })(req, res, next);
});

// Rota de Registro Customizada
router.post('/registro', function(req, res, next) {
  passport.authenticate('local-registro', function(err, user, info) {
    if (err) { return res.status(500).json({ erro: err }); }
    if (!user) { return res.status(400).json({ erro: 'Este email já está registrado.' }); }
    
    req.logIn(user, function(err) {
      if (err) { return res.status(500).json({ erro: err }); }
      return res.json({ mensagem: 'Conta criada com sucesso!' });
    });
  })(req, res, next);
});

// Logout
router.get('/logout', function(req, res) {
  req.logout(function(){});
  res.json({ mensagem: "Saiu" });
});

module.exports = router;