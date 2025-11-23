<<<<<<< HEAD
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
=======
var express = require('express');
var router = express.Router();
var Autor = require('../models/autor');
// Importa o middleware de segurança que criamos antes
var { checarAutenticacao } = require('../middleware/auth');

/* GET: Listar Autores (Público - opcional, para conferência) */
router.get('/', async function(req, res) {
    try {
        const autores = await Autor.find();
        res.render('autores/index', { autores: autores, user: req.user });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

/* GET: Formulário de Cadastro (PROTEGIDO) */
router.get('/novo', checarAutenticacao, function(req, res) {
    res.render('autores/novo', { user: req.user });
});

/* POST: Salvar Autor (PROTEGIDO) */
router.post('/', checarAutenticacao, async function(req, res) {
    try {
        await Autor.create({
            nome: req.body.nome,
            nacionalidade: req.body.nacionalidade
        });
        // Após criar o autor, podemos voltar para a criação de livros para facilitar
        res.redirect('/livros/novo'); 
    } catch (err) {
        console.log(err);
        res.redirect('/autores/novo');
    }
});

module.exports = router;
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436
