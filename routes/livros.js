var express = require('express');
var router = express.Router();
var Livro = require('../models/livro');

function estaLogado(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).json({ erro: "Você precisa fazer login!" });
}

/* --- ROTAS --- */

// 1. GET (PÚBLICO)
router.get('/', function(req, res) {
    Livro.find({}).populate('autor').exec(function(err, livros) {
        if (err) return res.status(500).send(err);
        res.json(livros);
    });
});

// 2. POST (PRIVADO)
router.post('/', function(req, res) {
    var novoLivro = new Livro(req.body);
    novoLivro.save(function(err, livro) {
        if (err) return res.status(500).send(err);
        res.json(livro);
    });
});

// 3. DELETE (PRIVADO)
router.delete('/:id', function(req, res) {
    Livro.remove({_id: req.params.id}, function(err) {
        if (err) return res.status(500).send(err);
        res.json({ mensagem: "Livro deletado!" });
    });
});

module.exports = router;