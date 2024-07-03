const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Página Inicial (Clínica)
const paginaInicial = require('./routers/index');
app.use('/', paginaInicial);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`O servidor está rodando na porta ${PORT}`);
});