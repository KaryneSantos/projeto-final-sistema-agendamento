const express = require('express');
const app = express();
app.use(express.json());

function validarCPF(cpf) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
}

function validarDataNascimento(data) {
    const dataNascimento = new Date(data);
    const dataAtual = new Date();
    return dataNascimento < dataAtual;
}

module.exports = {validarCPF, validarDataNascimento};