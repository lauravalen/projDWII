async function girarRoleta() {
            // Efeito visual simples
            document.getElementById('res-livro').innerText = "Girando...";
            
            // Busca os dados no servidor (backend)
            try {
                const resposta = await fetch('/api/livros'); // Chama a rota que criamos
                const livros = await resposta.json();

                if(livros.length > 0) {
                    // Sorteia um aleatório
                    const sorteado = livros[Math.floor(Math.random() * livros.length)];
                    document.getElementById('res-livro').innerText = sorteado.titulo;
                } else {
                    document.getElementById('res-livro').innerText = "Vazio";
                }
                // Faça o mesmo para CD e DVD aqui
            } catch (erro) {
                alert("Erro ao conectar com o servidor!");
            }
        }