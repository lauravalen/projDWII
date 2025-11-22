var express = require('express');
var router = express.Router();
var passport = require('passport');

// Rota de LOGIN
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/admin.html', // Sucesso: vai para o painel
    failureRedirect: '/login.html', // Falha: fica no login (ou volta pra home)
    failureFlash: true
}));

// Rota de REGISTRO (Isso que faltava!)
router.post('/registro', passport.authenticate('local-registro', {
    successRedirect: '/admin.html', // Sucesso: já entra logado
    failureRedirect: '/login.html', 
    failureFlash: true
}));

// Logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;