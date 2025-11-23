<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const {
    listarLivros,
    buscarLivroPorId,
    criarLivro,
    atualizarLivro,
    deletarLivro
} = require('../controllers/livroController');

// Rotas

// LISTAR
router.get('/', listarLivros);

// BUSCAR POR ID
router.get('/:id', buscarLivroPorId);

// CRIAR
router.post('/', criarLivro);
=======
var express = require('express');
var router = express.Router();
// Importar os modelos e o middleware de segurança
var Livro = require('../models/livro');
var Autor = require('../models/autor');
var { checarAutenticacao } = require('../middleware/auth'); // Importa a função que criamos

/* GET: Lista todos os livros (PÚBLICO - Qualquer um vê) */
router.get('/', async function(req, res, next) {
  try {
    // .populate('autor') preenche os dados do autor automaticamente
    const livros = await Livro.find().populate('autor');
    res.render('livros/index', { livros: livros, user: req.user });
  } catch (err) {
    next(err);
  }
});

/* GET: Formulário de cadastro (PROTEGIDO - Só logado acessa) */
router.get('/novo', checarAutenticacao, async function(req, res) {
  try {
    const autores = await Autor.find(); // Precisa dos autores para o <select>
    res.render('livros/novo', { autores: autores, user: req.user });
  } catch (err) {
    res.redirect('/livros');
  }
});

/* POST: Salvar novo livro (PROTEGIDO) */
router.post('/', checarAutenticacao, async function(req, res) {
  try {
    await Livro.create({
        titulo: req.body.titulo,
        ano: req.body.ano,
        editora: req.body.editora,
        autor: req.body.autor // Aqui vem o ID do autor selecionado
    });
    res.redirect('/livros');
  } catch (err) {
    console.log(err);
    res.redirect('/livros/novo');
  }
});

/* GET: Deletar livro (PROTEGIDO) */
router.get('/delete/:id', checarAutenticacao, async function(req, res) {
    try {
        await Livro.findByIdAndDelete(req.params.id);
        res.redirect('/livros');
    } catch (err) {
        console.log(err);
        res.redirect('/livros');
    }
});
>>>>>>> 70fd03474d969b48407c17c2dd6cc3a2ef45c436

// ATUALIZAR
router.put('/:id', atualizarLivro);

// DELETAR
router.delete('/:id', deletarLivro);

module.exports = router;
