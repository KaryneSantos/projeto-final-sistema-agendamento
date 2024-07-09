const connection = require('../models/db');

const PacienteDAO = {
    criarPaciente: function (nome, cpf, data_nascimento, sexo, callback) {
        const sql = `INSERT INTO paciente (nome, cpf, data_nascimento, sexo) VALUES (?, ?, ?, ?)`;
        connection.query(sql, [nome, cpf, data_nascimento, sexo], callback);
    },
};

module.exports = PacienteDAO;
