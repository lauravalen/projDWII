var express = require('express');
var router = express.Router();
var passport = require('passport');

/* Rota de LOGIN 
   Recebe email/senha e responde se deu certo ou errado.
*/
router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) { return res.status(500).json({ erro: err }); }
    
    // Se o usuário não for encontrado ou senha errada
    if (!user) { 
        return res.status(401).json({ erro: info.message || 'Usuário ou senha incorretos.' }); 
    }
    
    req.logIn(user, function(err) {
      if (err) { return res.status(500).json({ erro: err }); }
      return res.json({ mensagem: 'Login realizado com sucesso!' });
    });
  })(req, res, next);
});

/* Rota de REGISTRO 
   Cria o usuário no banco.
*/
router.post('/registro', function(req, res, next) {
  passport.authenticate('local-registro', function(err, user, info) {
    if (err) { return res.status(500).json({ erro: err }); }
    
    // Se o usuário já existe (user vem como false do passport)
    if (!user) { 
        return res.status(400).json({ erro: info.message || 'Este email já está registrado.' }); 
    }
    
    req.logIn(user, function(err) {
      if (err) { return res.status(500).json({ erro: err }); }
      return res.json({ mensagem: 'Conta criada com sucesso!' });
    });
  })(req, res, next);
});

// Rota de Sair
router.get('/logout', function(req, res) {
    req.logout(function(){});
    res.redirect('/');
});

module.exports = router;