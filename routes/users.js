// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

<<<<<<< HEAD
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
=======
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
    
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.json({ ok: true, user: { id: user._id, nome: user.nome, email: user.email } });
    });
  })(req, res, next);
});

<<<<<<< HEAD
// GET /users/logout
router.get('/logout', (req, res, next) => {
  req.logout(function(err){
    if (err) return next(err);
=======
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
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436
    res.redirect('/');
  });
});

module.exports = router;
