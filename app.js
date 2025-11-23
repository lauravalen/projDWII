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

var app = express();

// Configuração do Motor de Vistas (View Engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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