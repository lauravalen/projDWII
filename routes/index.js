var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

// 1. Botão "Entrar com Google" manda para cá
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// 2. O Google devolve o usuário para cá
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Sucesso!
    res.redirect('/');
  });

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;