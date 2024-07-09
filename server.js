const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));


// Interação de Cookies e Sessões
app.use(cookieParser());
app.use(session({
    secret: 'sua_chave_secreta_aqui',
    resave: false,
    saveUninitialized: false
}));


// Página Inicial (Clínica)
const paginaInicial = require('./routers/index');
app.use('/', paginaInicial);

// Página Inicial de Agendamento
const agendamentoPagina = require('./routers/agendamento-pagina');
app.use('/agendamento-pagina-inicial', agendamentoPagina);

// Página de Contato (Inicial)
const contatoPagina = require('./routers/contato');
app.use('/contato', contatoPagina);

// Página de Pergunta Registro (Médico/Paciente)
const perguntaRegistros = require('./routers/perguntaReg');
app.use('/pergunta-registro', perguntaRegistros);

// Página de Cadastro (Médico)
const cadastroMedico = require('./routers/cadastro-medico');
app.use('/cadastro-medico', cadastroMedico);

// Página de Cadastro (Paciente)
const cadastroPaciente = require('./routers/cadastro-paciente');
app.use('/cadastro-paciente', cadastroPaciente);

//Página de Login
const paginaLogin = require('./routers/paginaLogin');
app.use('/login', paginaLogin);

// Página Inicial (Médico)
const paginaInicialMedico = require('./routers/paginaInicialMed');
app.use('/pagina-inicial-medico', paginaInicialMedico);

// Página Inicial (Paciente)
const paginaInicialPaciente = require('./routers/paginaInicialPac');
app.use('/pagina-inicial-paciente', paginaInicialPaciente);

// Página de Logout 
const paginaLogout = require('./routers/logout');
app.use('/logout', paginaLogout);

// Página de consultas (Médico)
const paginaConsultaMedico = require('./routers/consultas-medico');
app.use('/consulta-medico', paginaConsultaMedico);

// // Página de Lista de pacientes (Médico)
// const paginaListaPacientes = require('./routers/pag-lista-paciente');
// app.use('/lista-pacientes', paginaListaPacientes);

// // Página de Hórarios (Médico)
// const paginaHorarioMedico = require('./routers/horario-medico');
// app.use('/horario-medico', paginaHorarioMedico)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`O servidor está rodando na porta ${PORT}`);
});