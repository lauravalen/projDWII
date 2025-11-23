// public/js/admin.js

// Faz login com email/senha
async function fazerLogin() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('Login realizado!');
      mostrarPainel();
    } else {
      alert('Erro: ' + (dados.erro || 'Credenciais inválidas'));
    }
  } catch (e) {
    alert('Erro de conexão. O servidor está rodando?');
  }
}

// Faz registro
async function fazerRegistro() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const nome = document.getElementById('nome') ? document.getElementById('nome').value : '';

  try {
    const resposta = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, senha, nome })
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('Conta criada com sucesso!');
      mostrarPainel();
    } else {
      alert('Erro: ' + (dados.erro || 'Não foi possível criar a conta'));
    }
  } catch (e) {
    alert('Erro de conexão. Verifique o terminal.');
  }
}

// Botão Google
const googleBtn = document.getElementById('googleBtn');
if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/auth/google';
  });
}

// Cadastrar item (livro/cd/dvd)
async function cadastrarItem() {
  const tipo = document.getElementById('tipo-item').value;
  const titulo = document.getElementById('titulo').value;
  const preco = parseFloat(document.getElementById('preco').value) || 0;
  const autorId = document.getElementById('autor-id').value;

  const dados = { title: titulo, price: preco, author: autorId };

  try {
    const resposta = await fetch(`http://localhost:3000/${tipo}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(dados)
    });

    if (resposta.ok) {
      alert('Item cadastrado com sucesso!');
      document.getElementById('titulo').value = '';
    } else {
      if (resposta.status === 401) {
        alert('Sessão expirada. Faça login novamente.');
        location.reload();
      } else {
        const err = await resposta.json();
        alert('Erro: ' + (err.erro || 'Falha ao cadastrar'));
      }
    }
  } catch (e) {
    alert('Erro de conexão.');
  }
}

// Mostrar painel
function mostrarPainel() {
  const telaLogin = document.getElementById('tela-login');
  const telaGestao = document.getElementById('tela-gestao');
  if (telaLogin) telaLogin.classList.add('escondido');
  if (telaGestao) telaGestao.classList.remove('escondido');
}

// Sair
function sair() {
  fetch('http://localhost:3000/users/logout', { credentials: 'include' })
    .then(() => location.reload());
}
