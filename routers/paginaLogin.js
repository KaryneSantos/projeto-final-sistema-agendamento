const express = require('express');
const router = express.Router();
const UsuarioDAO = require('../models/usuarioDAO');

router.get('/', (req, res) => {
    res.render('login'); 
});

router.post('/', (req, res) => {
    const { email, senha } = req.body;
    console.log('Email:', email);
    console.log('Senha:', senha);

    let error = null;

    if (!email || !senha) {
        error = 'Campos obrigatórios não preenchidos';
    }

    UsuarioDAO.findByEmail(email, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
        }

        console.log(results);
        if (results.length === 0) {
            error = 'Usuário não encontrado';
        }

        const user = results[0];

        // Verifica a senha
        if (user.senha !== senha) {
            error = 'Credenciais inválidas';
        }

        // Verifica o tipo de usuário
        if (user.tipo_de_usuario === 'médico') {
            // Usuário é médico
            console.log('Médico logado:', user);
            req.session.user = user;
            res.redirect('/pagina-inicial-medico');
        } else if (user.tipo_de_usuario === 'paciente') {
            // Usuário é paciente
            console.log('Paciente logado:', user);
            req.session.user = user;
            res.redirect('/pagina-inicial-paciente');
        } else {
            // Tipo de usuário desconhecido
            console.error('Tipo de usuário desconhecido:', user.tipo_de_usuario);
            return res.status(500).render('login', { error: 'Erro ao processar tipo de usuário.' });
        }
    });
});

module.exports = router;
