var express = require('express');
var router = express.Router();
var Livro = require('../models/livro');

// Rota GET (Pública)
router.get('/', function(req, res) {
    Livro.find({}).populate('autor').exec(function(err, livros) {
        if (err) return res.status(500).send(err);
        res.json(livros);
    });
});

// Rota POST (Agora pública para teste - recoloque 'estaLogado' antes da entrega)
router.post('/', function(req, res) {
    var novoLivro = new Livro(req.body);
    novoLivro.save(function(err, livro) {
        if (err) return res.status(500).send(err);
        res.json(livro);
    });
});

// Rota DELETE (Agora pública para teste)
router.delete('/:id', function(req, res) {
    Livro.remove({_id: req.params.id}, function(err) {
        if (err) return res.status(500).send(err);
        res.json({ mensagem: "Livro deletado!" });
    });
});

module.exports = router;