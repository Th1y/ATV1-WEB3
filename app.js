const express = require('express');
const app = express();
const path = require('path');
// const port = 3000; // teste local, nao usado no app final

// Middleware para interpretar dados do formulario
app.use(express.urlencoded({ extended: true}));

// Rotas para /, /sobre, /seu_problema e /resposta_problema.

// Rota raiz
app.get('/', (req, res) => {
    
})
// Rota sobre
app.get('/sobre', (req, res) => {

})

// Rota seu problema que vai exibir o HTML do formulario
app.get('/seu_problema', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Rota resposta problema que vai receber dados do HTML formulario
app.post('/resposta_problema', (req, res) => {
    // Array com os dados vindos do formulario
    const { nome, nota1, nota2} = req.body;
    res.send()
})
