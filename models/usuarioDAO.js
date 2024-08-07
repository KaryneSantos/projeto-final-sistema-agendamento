const connection = require('./db');

const UsuarioDAO = {
    criarUsuario: (email, nome_completo, tipo_de_usuario, data_nasc, senha, callback) => {
        const query = 'INSERT INTO usuario (email, nome_completo, tipo_de_usuario, data_nasc, senha) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [email, nome_completo, tipo_de_usuario, data_nasc, senha], callback);
    },
    
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM usuario WHERE email = ?';
        connection.query(query, [email], callback);
    }
};

module.exports = UsuarioDAO;
