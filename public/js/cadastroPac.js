var tipo_usuario = document.getElementById('tipo_usuario');

tipo_usuario.addEventListener('change', function() {
    if (this.value === 'medico') {
        window.location.href = '/cadastro-medico';
    }
});