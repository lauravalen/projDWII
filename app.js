<<<<<<< HEAD
// app.js
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index'); // se existir
const usersRouter = require('./routes/users');
const livrosRouter = require('./routes/livros');
const cdsRouter = require('./routes/cds');
const dvdsRouter = require('./routes/dvds');
const autoresRouter = require('./routes/autores');
const authRouter = require('./routes/auth');

const app = express();
=======
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // Importar express-session
var passport = require('passport');     // Importar passport

// Importação das rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var livrosRouter = require('./routes/livros');
var cdsRouter = require('./routes/cds');
var dvdsRouter = require('./routes/dvds');
var autoresRouter = require('./routes/autores');

// Importação da configuração do passport e base de dados
require('./config/passport');
require('./config/database');
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436

// Conexão com MongoDB (projeto usa projDWII)
async function conectarDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/projDWII');
    console.log('MongoDB conectado com sucesso!');
  } catch (erro) {
    console.error('❌ Erro ao conectar MongoDB:', erro);
    process.exit(1);
  }
}
conectarDB();

<<<<<<< HEAD
// view engine
=======
// Configuração do Motor de Vistas (View Engine)
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
// session + passport (ordem importa)
app.use(session({
  secret: process.env.SESSION_SECRET || 'segredo_super_secreto_dwii',
  resave: false,
  saveUninitialized: false,
  cookie: { /* secure:false for dev */ }
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport'); // carrega strategies

// expõe req.user para views
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});

// rotas
app.use('/', indexRouter); // se indexRouter existir, senão ignore
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/livros', livrosRouter);
app.use('/cds', cdsRouter);
app.use('/dvds', dvdsRouter);
app.use('/autores', autoresRouter);

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  // se quiser retornar JSON para API:
  if (req.originalUrl.startsWith('/api') || req.headers.accept?.includes('application/json')) {
    return res.json({ error: err.message });
  }
  res.render('error');
});

module.exports = app;
=======
// --- BLOCO DE AUTENTICAÇÃO (A ORDEM IMPORTA MUITO) ---

// 1. Configuração da Sessão
app.use(session({
    secret: 'segredo_super_secreto_dwii', // Pode alterar este texto
    resave: false,
    saveUninitialized: false
}));

// 2. Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para disponibilizar o utilizador em todas as vistas (opcional, mas útil)
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// --- FIM DO BLOCO DE AUTENTICAÇÃO ---

// Definição das Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/livros', livrosRouter);
app.use('/cds', cdsRouter);
app.use('/dvds', dvdsRouter);
app.use('/autores', autoresRouter);

// Tratamento de erros 404
app.use(function(req, res, next) {
    next(createError(404));
});

// Manipulador de erros
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

// Middleware de segurança
function garantirAutenticacao(req, res, next) {
    // O Passport cria este método .isAuthenticated() automaticamente
    if (req.isAuthenticated()) {
        return next(); // Usuário logado? Pode passar.
    }
    // Não logado? Manda para o login
    res.redirect('/login');
}
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436
