const express = require('express');
const router = express.Router();
const { validarCPF, validarDataNascimento } = require('../controllers/controller');
const UsuarioDAO = require('../models/usuarioDAO');
const MedicoDAO = require('../models/medicoDAO');

router.get('/', (req, res) => {
    res.render('cadastroMed');
});

router.post('/', (req, res) => {
    const { nome_completo, email, cpf, data_nascimento, crm, tipo_usuario, sexo, senha, confirmacao_senha } = req.body;

    console.log('nome completo:', nome_completo);
    console.log('cpf:', cpf);
    console.log('email:', email);
    console.log('data nascimento:', data_nascimento);
    console.log('tipo usuario:', tipo_usuario);
    console.log('sexo:', sexo);
    console.log('senha:', senha);
    console.log('confirmacao de senha:', confirmacao_senha);

    let error = {};

    // Verifica se os dados são preenchidos
    if (!nome_completo) {
        error.nome_completo = 'Digite seu nome completo';
    }

    if (!email) {
        error.email = 'Digite seu email';
    }

    if (!cpf) {
        error.cpf = 'Digite seu CPF';
    } else if (!validarCPF(cpf)) { // Verifica se o CPF é válido
        error.cpf = 'CPF inválido, tente novamente';
    }

    if (!data_nascimento) {
        error.data_nascimento = 'Digite sua data de nascimento';
    } else if (!validarDataNascimento(data_nascimento)) { // Verifica se a data de nascimento é válida
        error.data_nascimento = 'Data de nascimento inválida, tente novamente';
    }

    if (!senha) {
        error.senha = 'Digite sua senha';
    }

    if (!confirmacao_senha) {
        error.confirmacao_senha = 'Confirme sua senha';
    } else if (confirmacao_senha !== senha) { // Verifica se as senhas são diferentes
        error.confirmacao_senha = 'Senhas diferentes, tente novamente';
    }

    // if (!crm || crm.length < 12) { // Verifica se o CRM do médico é vazio ou menor que 12 caracteres
    //     error.crm = 'CRM inválido, tente novamente';
    // }

    // Se houver erros, retorna a página de cadastro com os erros
    if (Object.keys(error).length > 0) {
        return res.status(400).render('cadastroMed', { error, nome_completo, email, cpf, data_nascimento, senha, confirmacao_senha });
    }

    // Adicionando dados no banco de dados
    UsuarioDAO.criarUsuario(email, nome_completo, tipo_usuario, data_nascimento, senha, (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            return res.status(500).render('cadastroMed', { error: 'Erro ao cadastrar usuário.' });
        }
        console.log(result);
        console.log('Usuário cadastrado com sucesso.');

        // Após cadastrar o usuário, cadastrar o médico
        MedicoDAO.criarMedico(crm, nome_completo, (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar médico:', err);
                return res.status(500).render('cadastroMed', { error: 'Erro ao cadastrar médico.' });
            }
            console.log(result);
            console.log('Médico cadastrado com sucesso.');
            res.redirect('pagina-inicial-medico');
        });
    });
});

module.exports = router;
