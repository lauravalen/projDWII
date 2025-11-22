var express = require('express');
var router = express.Router();
var Dvd = require('../models/dvd');

function estaLogado(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).json({ erro: "Você precisa fazer login!" });
}

/* --- ROTAS --- */

// 1. GET (PÚBLICO)
router.get('/', function(req, res) {
    Dvd.find({}).populate('autor').exec(function(err, dvds) {
        if (err) return res.status(500).send(err);
        res.json(dvds);
    });
});

// 2. POST (PRIVADO)
router.post('/', estaLogado, function(req, res) {
    var novoDvd = new Dvd(req.body);
    novoDvd.save(function(err, dvd) {
        if (err) return res.status(500).send(err);
        res.json(dvd);
    });
});

// 3. DELETE (PRIVADO)
router.delete('/:id', estaLogado, function(req, res) {
    Dvd.remove({_id: req.params.id}, function(err) {
        if (err) return res.status(500).send(err);
        res.json({ mensagem: "DVD deletado!" });
    });
});

module.exports = router;