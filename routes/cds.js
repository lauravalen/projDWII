var express = require('express');
var router = express.Router();
var Cd = require('../models/cd'); // Importa o modelo de CD

// Função para verificar login (Desativada temporariamente para facilitar seus testes)
// function estaLogado(...) { ... }

/* --- ROTAS DE CDS --- */

// 1. GET (PÚBLICO) - Lista todos os CDs
router.get('/', function(req, res) {
    Cd.find({}).populate('autor').exec(function(err, cds) {
        if (err) return res.status(500).send(err);
        res.json(cds);
    });
});

// 2. POST (DEVERIA SER PRIVADO) - Cria um CD
// Tirei o 'estaLogado' para você conseguir cadastrar sem travar no login agora
router.post('/', function(req, res) {
    var novoCd = new Cd(req.body);
    novoCd.save(function(err, cd) {
        if (err) return res.status(500).send(err);
        res.json(cd);
    });
});

// 3. DELETE (DEVERIA SER PRIVADO) - Apaga um CD
router.delete('/:id', function(req, res) {
    Cd.remove({_id: req.params.id}, function(err) {
        if (err) return res.status(500).send(err);
        res.json({ mensagem: "CD deletado!" });
    });
});

module.exports = router;