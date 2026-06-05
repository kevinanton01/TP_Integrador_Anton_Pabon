/* En caso que no se haya ingresado nombre de usuario no se podra acceder */
function ingresar() {
    const nombre = document.getElementById("nombre");

    if (nombre.value === "") {
        nombre.style.border = "2px solid red";
        return;
    }

    location.href = "./pages/cliente/cliente.html";
}

/* Se muestra el nuevo bloque en el que se puede ingresar como administrador */
function mostrarLoginAdmin() {
    document.getElementById("loginAdmin").style.display = "block";
}

/* En caso de no ser admin, se puede cancelar y volver al login original */
function cerrarLoginAdmin() {
    document.getElementById("loginAdmin").style.display = "none";
}

function validarAdmin() {
    const usuario = document.getElementById("usuarioAdmin");
    const password = document.getElementById("passwordAdmin");

    if (usuario.value === "admin" && password.value === "1234") {
        location.href = "./pages/admin/admin.html";
    } else {
        usuario.style.border = "2px solid red";
        password.style.border = "2px solid red";
        alert("Usuario o contraseña incorrectos");
    }
}
