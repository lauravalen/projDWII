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
