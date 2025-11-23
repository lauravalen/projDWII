<<<<<<< HEAD
// routes/dvds.js
const express = require('express');
const router = express.Router();
const Dvd = require('../models/Dvd');
const { ensureAuth } = require('./_middleware');

router.get('/', async (req, res) => {
  const items = await Dvd.find().populate('author');
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Dvd.findById(req.params.id).populate('author');
  if (!item) return res.status(404).json({ erro: 'DVD não encontrado' });
  res.json(item);
});

router.post('/', ensureAuth, async (req, res) => {
  const item = await Dvd.create(req.body);
  res.status(201).json(item);
=======
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
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436
});

router.put('/:id', ensureAuth, async (req, res) => {
  const item = await Dvd.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete('/:id', ensureAuth, async (req, res) => {
  await Dvd.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
