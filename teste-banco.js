const mongoose = require('mongoose');

console.log("⏳ Tentando conectar ao MongoDB...");

// Tenta conectar (note que usei 127.0.0.1 em vez de localhost, às vezes o Windows prefere isso)
mongoose.connect('mongodb://127.0.0.1:27017/teste')
    .then(() => {
        console.log("✅ SUCESSO! O Mongoose conectou no Banco!");
        console.log("Se você viu isso, seu MongoDB está perfeito.");
        process.exit(0);
    })
    .catch((erro) => {
        console.log("❌ FRACASSO. O Banco deu erro:");
        console.log(erro.message);
        console.log("---------------------------------------------------");
        console.log("DICA: Verifique se a janela preta do 'mongod' está aberta.");
        process.exit(1);
    });