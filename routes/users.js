// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

// POST /users/register
router.post('/register', async (req, res) => {
  try {
    const { email, senha, nome } = req.body;
    if (!email || !senha) return res.status(400).json({ erro: 'Email e senha são obrigatórios' });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ erro: 'Usuário já existe' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(senha, salt);

    const user = await User.create({
      nome: nome || '',
      email: email.toLowerCase(),
      password: hash
    });

    // opcional: logar automaticamente
    req.login(user, (err) => {
      if (err) return res.status(500).json({ erro: 'Erro ao autenticar' });
      return res.status(201).json({ ok: true, user: { id: user._id, email: user.email, nome: user.nome } });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno' });
  }
});

// POST /users/login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) return res.status(400).json({ erro: info?.message || 'Credenciais inválidas' });
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.json({ ok: true, user: { id: user._id, nome: user.nome, email: user.email } });
    });
  })(req, res, next);
});

// GET /users/logout
router.get('/logout', (req, res, next) => {
  req.logout(function(err){
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
