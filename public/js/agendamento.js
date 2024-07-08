document.getElementById("btn-login").addEventListener("click", function() {
    var selectedValue = document.getElementById("especialidade-select").value;
    console.log(selectedValue);
    if (selectedValue >= 1 && selectedValue <= 13) {
        window.location.href = "/pergunta-registro";
    } else {
        alert("Por favor, selecione uma especialidade válida.");
    }
});