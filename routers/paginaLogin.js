const express = require('express');
const router = express.Router();
const UsuarioDAO = require('../models/usuarioDAO');

router.get('/', (req, res) => {
    res.render('login'); 
});

router.post('/', (req, res) => {
    const { email, senha } = req.body;

    let error = null;

    // Verifica se email e senha foram fornecidos
    if (email === "" || senha === "") {
        error = 'Campos obrigatórios não preenchidos';
        return res.status(400).render('login', { error });
    }

    UsuarioDAO.findByEmail(email, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return res.status(500).json({ error: 'Erro ao buscar usuário. Tente novamente mais tarde.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const user = results[0];

        // Verifica o tipo de usuário
        if (user.tipo_usuario === 'medico') {
            // Usuário é médico
            console.log('Médico logado:', user);
            req.session.user = user;
            res.redirect('/pagina-inicial-medico');
        } else if (user.tipo_usuario === 'paciente') {
            // Usuário é paciente
            console.log('Paciente logado:', user);
            req.session.user = user;
            res.redirect('/pagina-inicial-paciente');
        } else {
            // Tipo de usuário desconhecido
            console.error('Tipo de usuário desconhecido:', user.tipo_usuario);
            return res.status(500).json({ error: 'Erro ao processar tipo de usuário.' });
        }
    });
});

module.exports = router;
