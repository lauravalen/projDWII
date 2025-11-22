var express = require('express');
var router = express.Router();
var Cd = require('../models/cd');

function estaLogado(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).json({ erro: "Você precisa fazer login!" });
}

/* --- ROTAS --- */

// 1. GET (PÚBLICO)
router.get('/', function(req, res) {
    Cd.find({}).populate('autor').exec(function(err, cds) {
        if (err) return res.status(500).send(err);
        res.json(cds);
    });
});

// 2. POST (PRIVADO)
router.post('/', function(req, res) {
    var novoCd = new Cd(req.body);
    novoCd.save(function(err, cd) {
        if (err) return res.status(500).send(err);
        res.json(cd);
    });
});

// 3. DELETE (PRIVADO)
router.delete('/:id', function(req, res) {
    Cd.remove({_id: req.params.id}, function(err) {
        if (err) return res.status(500).send(err);
        res.json({ mensagem: "CD deletado!" });
    });
});

module.exports = router;