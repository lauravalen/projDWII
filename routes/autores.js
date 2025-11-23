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