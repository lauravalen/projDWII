<<<<<<< HEAD
// routes/cds.js
const express = require('express');
const router = express.Router();
const Cd = require('../models/Cd');
const { ensureAuth } = require('./_middleware');

router.get('/', async (req, res) => {
  const items = await Cd.find().populate('author');
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const item = await Cd.findById(req.params.id).populate('author');
  if (!item) return res.status(404).json({ erro: 'CD não encontrado' });
  res.json(item);
});

router.post('/', ensureAuth, async (req, res) => {
  const item = await Cd.create(req.body);
  res.status(201).json(item);
=======
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
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436
});

router.put('/:id', ensureAuth, async (req, res) => {
  const item = await Cd.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete('/:id', ensureAuth, async (req, res) => {
  await Cd.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
