const express = require('express'); 
const app = express();
const path = require('path');
const port = 3000; 

// Midleware para registrar hora e rota de cada solicitação
app.use((req, res, next) => {
    const agora = new Date();
    const Hora_Formatada = agora.toLocaleString('pt-BR'); 
    
    // data e hora do brasil no momento da requisição
    console.log(`[${Hora_Formatada}] ${req.method} ${req.url}`);

    // segue para a proxima função (rota ou middleware)
    next();
});

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

    <nav> <!-- lista da barra de navegação para os links seu_problema e sobre-->
        <ul>
            <li><a href="/seu_problema">Media</a></li>
            <li><a href="/sobre">Sobre</a></li>
            </ul>
        </nav>
        
        <h1>Resultado</h1>
        <p>Nome: ${nome}</p>
        <p>notas:${notas}</p>
        <p>Média: ${media}</p>
        <p>Situação: ${situacao_aluno}</p>

    `);
});

// Middleware para erros de rota nao definida (404)
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Middleware para erros gerais (500, etc)
app.use((err, req, res, next) => {
    console.error(`[ERRO] ${err.stack}`);
    res.status(500).sendFile(path.join(__dirname, 'public', '500.html'));
});

app.listen(port, (err) => { // verifica se o site rodou corretamente ou algum erro aconteceu
    if (err) {
        console.error('Erro ao iniciar o servidor:', err);

    } else { 
        console.log(`Servidor rodando em http://localhost:${port}`);
    };
});