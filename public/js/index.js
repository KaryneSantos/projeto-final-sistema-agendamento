const buttonAgendamento = document.getElementsByClassName('especialidade-card');

for (let i = 0; i < buttonAgendamento.length; i++) {
    buttonAgendamento[i].addEventListener('click', function() {
        const href = this.getAttribute('data-href');
        window.location.href = href;
    });
}
