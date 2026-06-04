/*En caso que no se haya ingresado nombre de usuario no se podra acceder */
function ingresar() {
    const inputNombre = document.getElementById("nombre");
    const nombre = document.getElementById("nombre").value;

    if (nombre === "") {
        inputNombre.style.border = "2px solid red";
        return;
    }

    window.location.href = "./pages/cliente/cliente.html";
}