const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('cadastroPac');
});

router.post('/', (req, res) => {
    const {nome_completo, email, cpf, data_nascimento, tipo_usuario, sexo, senha, confirmacao_senha} = req.body;
    console.log('Colentando dados dos usuários.');
    console.log(nome_completo); 
    console.log(email);
    console.log(cpf);
    console.log(data_nascimento);
    console.log(tipo_usuario);
    console.log(sexo);
    console.log(senha);
    console.log(confirmacao_senha);

    let error = null;

    // Verificação se os campos estão vazios
    if(nome_completo === '' || email === '' || senha === '' || confirmacao_senha === ''){
        console.log('campos obrigátorios não preenchidos');
        error = 'Campos obrigátorios não preenchidos.';
    }

    // Verificação se o cpf é válido ou vazio
    if(!controllers.validarCPF(cpf) || cpf === '') {
        console.log('cpf inválido, tente novamente.');
        error = 'CPF inválido, tente novamente';
    }

       // Verificação se a Data de Nascimento é válido
       if(controllers.validarDataNascimento(data_nascimento)){
        console.log('data de nascimento inválida, tente novamente.');
        error = 'Data de nascimento inválida, tente novamente.';
    }

    const usuariosSQL = `INSERT INTO usuario (email, nome_completo, tipo_de_usuario, data_nasc, senha) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(usuariosSQL, [email, nome_completo, tipo_usuario, data_nascimento, senha], (err, result) => {
        if(err){
            console.error('ERROR ao cadastrar usuário', error);
            res.render('cadastroMed', {error: 'ERROR ao cadastrar usuário.'});
        }

        console.log('Usuário cadastrado com sucesso.');
    })
    // página inicial do paciente
    res.redirect('pagina-inicial-paciente');

});



module.exports = router;