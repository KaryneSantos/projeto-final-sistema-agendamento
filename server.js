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

// Página Inicial de Agendamento
const agendamentoPagina = require('./routers/agendamento-pagina');
app.use('/agendamento-pagina-inicial', agendamentoPagina);

// Página de Contato (Inicial)
const contatoPagina = require('./routers/contato');
app.use('/contato', contatoPagina);

// Página de Cadastro (Médico)
const cadastroMedico = require('./routers/cadastro-medico');
app.use('/cadastro-medico', cadastroMedico);

// Página de Cadastro (Paciente)
const cadastroPaciente = require('./routers/cadastro-paciente');
app.use('/cadastro-paciente', cadastroPaciente);

//Página de Login
const paginaLogin = require('./routers/paginaLogin');
app.use('/login', paginaLogin);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`O servidor está rodando na porta ${PORT}`);
});