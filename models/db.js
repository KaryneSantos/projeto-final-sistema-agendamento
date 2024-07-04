const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'karyne',
    password: 'sistemaclinico123',
    database: 'sistema-clinica'

    // host: process.env.BCDD_HOST,
    // user: process.env.BCDD_USER,
    // password: process.env.BCDD_PASSWORD,
    // database: process.env.BCDD_DATABASE
});

connection.connect(err => {
    if(err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }

    console.log('Conexão bem-sucedida ao banco de dados');
});

module.exports = connection;