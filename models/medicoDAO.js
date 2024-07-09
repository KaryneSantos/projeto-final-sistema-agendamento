const connection = require('./db');

const MedicoDAO = {
    criarMedico: (crm, nome_completo, callback) => {
        const query = 'INSERT INTO medico (crm, nome_completo) VALUES (?, ?)';
        connection.query(query, [crm, nome_completo], callback);
    }
};

module.exports = MedicoDAO;
