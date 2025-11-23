// routes/autores.js
const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const { ensureAuth } = require('./_middleware');

// GET /autores
router.get('/', async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

// GET /autores/:id
router.get('/:id', async (req, res) => {
  const a = await Author.findById(req.params.id);
  if (!a) return res.status(404).json({ erro: 'Autor não encontrado' });
  res.json(a);
});

// POST /autores (protegido)
router.post('/', ensureAuth, async (req, res) => {
  const { name, bio } = req.body;
  const a = await Author.create({ name, bio });
  res.status(201).json(a);
});

// PUT /autores/:id (protegido)
router.put('/:id', ensureAuth, async (req, res) => {
  const a = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(a);
});

// DELETE /autores/:id (protegido)
router.delete('/:id', ensureAuth, async (req, res) => {
  await Author.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
