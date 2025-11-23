// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Inicia OAuth Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback do Google
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // autenticado com sucesso
    res.redirect('/'); // ou para o painel: '/painel' etc
  });

module.exports = router;
