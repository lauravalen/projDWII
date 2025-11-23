var express = require('express');
var router = express.Router();
var Dvd = require('../models/dvd'); // Importa o modelo de DVD

// 1. GET (PÚBLICO)
router.get('/', function(req, res) {
    Dvd.find({}).populate('autor').exec(function(err, dvds) {
        if (err) return res.status(500).send(err);
        res.json(dvds);
    });
});

// 2. POST (SEM BLOQUEIO DE LOGIN POR ENQUANTO)
router.post('/', function(req, res) {
    var novoDvd = new Dvd(req.body);
    novoDvd.save(function(err, dvd) {
        if (err) return res.status(500).send(err);
        res.json(dvd);
    });
});

// 3. DELETE
router.delete('/:id', function(req, res) {
    Dvd.remove({_id: req.params.id}, function(err) {
        if (err) return res.status(500).send(err);
        res.json({ mensagem: "DVD deletado!" });
    });
});

module.exports = router;