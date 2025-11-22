var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

// 1. Carregar configuração do Banco
var configDB = require('./config/database');

// 2. Conectar no MongoDB com aviso
mongoose.connect(configDB.url)
    .then(() => console.log("✅ SUCESSO: O BANCO DE DADOS CONECTOU!"))
    .catch(erro => console.log("❌ ERRO CRÍTICO: O BANCO NÃO CONECTOU!", erro));

// 3. Configurar o Passport
require('./config/passport')(passport);

var app = express();

// Configuração da View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 4. Configuração OBRIGATÓRIA para Login
app.use(session({ secret: 'segredo-cassino', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 5. Rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var livrosRouter = require('./routes/livros'); // Descomente quando criar o arquivo

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/livros', livrosRouter); // Descomente quando criar o arquivo

// Tratamento de erros
app.use(function(req, res, next) {
  var err = new Error('Não encontrado');
  err.status = 404;
  next(err);
});

module.exports = app;