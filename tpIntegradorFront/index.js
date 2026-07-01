/* En caso que no se haya ingresado nombre de usuario no se podra acceder */
function ingresar() {
    const nombre = document.getElementById("nombre");

    if (nombre.value === "") {
        nombre.style.border = "2px solid red";
        return;
    }

    localStorage.setItem("nombreUsuario", nombre.value);
    location.href = "./pages/cliente/cliente.html";
}