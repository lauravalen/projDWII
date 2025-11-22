// Funções de Autenticação
async function fazerLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Manda os dados para a rota que criamos no 'routes/users.js'
    const resposta = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, senha: senha })
    });

    if (resposta.ok) {
        alert("Login realizado!");
        mostrarPainel(); // Troca a tela
    } else {
        alert("Erro no login. Verifique email e senha.");
    }
}

async function fazerRegistro() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const resposta = await fetch('/users/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, senha: senha })
    });

    if (resposta.ok) {
        alert("Conta criada! Agora faça login.");
    } else {
        alert("Erro ao criar conta. Email já existe?");
    }
}

// Função de Cadastro de Itens (Livros, CDs, DVDs)
async function cadastrarItem() {
    const tipo = document.getElementById("tipo-item").value; // 'livros', 'cds' ou 'dvds'
    const titulo = document.getElementById("titulo").value;
    const preco = document.getElementById("preco").value;
    const autorId = document.getElementById("autor-id").value;

    // Monta o objeto igual ao modelo do Mongoose
    const dados = {
        titulo: titulo,
        preco: preco,
        autor: autorId // Precisa ser um ID válido de autor existente no banco
    };

    const resposta = await fetch(`/${tipo}`, { // Ex: POST /livros
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });

    if (resposta.ok) {
        alert("Item cadastrado com sucesso!");
        document.getElementById("titulo").value = ""; // Limpa o campo
    } else {
        // Se der erro 401, é porque a sessão caiu
        if (resposta.status === 401) {
            alert("Sessão expirada. Faça login novamente.");
            location.reload();
        } else {
            alert("Erro ao cadastrar. Verifique se o ID do autor é válido.");
        }
    }
}

// Funções Visuais
function mostrarPainel() {
    document.getElementById("tela-login").classList.add("escondido");
    document.getElementById("tela-gestao").classList.remove("escondido");
}

function sair() {
    fetch('/users/logout').then(() => location.reload());
}