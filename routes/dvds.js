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
