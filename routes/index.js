var express = require('express');
var router = express.Router();

// Importar TODOS os modelos necessários
var Autor = require('../models/autor');
var Livro = require('../models/livro');
var CD = require('../models/cd');
var DVD = require('../models/dvd');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Projeto DWII' });
});

/* POST: Salvar Obra (Logica Unificada) */
router.post('/salvar-obra', async function(req, res) {
    try {
        const { titulo, nomeAutor, tipo } = req.body;

        // PASSO 1: Lidar com o Autor
        // Tenta achar o autor pelo nome (case insensitive se possível, mas simples por agora)
        let autor = await Autor.findOne({ nome: nomeAutor });
        
        // Se não achar, CRIA um novo autor automaticamente
        if (!autor) {
            autor = await Autor.create({ 
                nome: nomeAutor,
                nacionalidade: 'Desconhecida' // Valor padrão já que o user não digitou
            });
            console.log("Novo autor criado: " + autor.nome);
        }

        // PASSO 2: Preparar os dados comuns
        const dadosDaObra = {
            titulo: titulo,
            autor: autor._id // AQUI A MÁGICA: Usamos o ID do autor encontrado/criado
        };

        // PASSO 3: Salvar na coleção correta baseada no "Tipo"
        if (tipo === 'Livro') {
            await Livro.create(dadosDaObra);
            console.log("Livro salvo!");
        } 
        else if (tipo === 'CD') {
            await CD.create(dadosDaObra);
            console.log("CD salvo!");
        } 
        else if (tipo === 'DVD') {
            await DVD.create(dadosDaObra);
            console.log("DVD salvo!");
        }

        // Sucesso: volta para a home
        res.render('index', { msg: `${tipo} "${titulo}" salvo com sucesso!` });

    } catch (erro) {
        console.log(erro);
        res.render('index', { msg: "Erro ao salvar: " + erro.message });
    }
});

module.exports = router;