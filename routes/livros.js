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

// ATUALIZAR
router.put('/:id', atualizarLivro);

// DELETAR
router.delete('/:id', deletarLivro);

module.exports = router;
