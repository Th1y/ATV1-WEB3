const express = require('express'); 
const app = express();
const path = require('path');
const port = 3000; 

// Middleware para interpretar dados do formulario
app.use(express.urlencoded({ extended: true}));

// Rotas para /, /sobre, /seu_problema e /resposta_problema.

// Rota raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Rota sobre
app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sobre.html'));
});

// Rota GET - exibe o formulario para "seu problema"
app.get('/seu_problema', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formulario.html'));
});

// Rota resposta problema que vai receber dados do HTML formulario
app.post('/resposta_problema', (req, res) => {
    // Array com os dados vindos do formulario
    const { nome, nota1, nota2} = req.body;

    // trasforma as Strings de nota em float (decimais)
    const notas = [parseFloat(nota1), parseFloat(nota2)];
    
    // faz o calculo da media
    const media = (notas[0] + notas[1]) / 2;
    
     var situacao_aluno = 0 
    // verifica se o aluno esta na media
    if (media < 6) {
        var situacao_aluno = "reprovado"
    } else { 
        var situacao_aluno = "aprovado"
    };

    console.log(nome, notas, media, situacao_aluno);
    
    res.send(`
        <h1>Resultado</h1>
        <p>Nome: ${nome}</p>
        <p>notas:${notas}</p>
        <p>Média: ${media}</p>
        <p>Situação: ${situacao_aluno}</p>

    `);
});

app.listen(port, (err) => { // verifica se o site rodou corretamente ou algum erro aconteceu
    if (err) {
        console.error('Erro ao iniciar o servidor:', err);

    } else { 
        console.log(`Servidor rodando em http://localhost:${port}`);
    };
});