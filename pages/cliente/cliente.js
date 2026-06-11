let proteinas = [{ 'id': 1, 'nombre': 'Isoprot', 'precio': 126000, 'img': '../../img/Isoprot.webp' }, { 'id': 2, 'nombre': 'Ultra-mass', 'precio': 59400, 'img': '../../img/Ultra-mass.webp' }, { 'id': 3, 'nombre': 'Whey-x-pro', 'precio': 98000, 'img': '../../img/Whey-x-pro.webp' }, { 'id': 4, 'nombre': 'Starter-protein', 'precio': 42300, 'img': '../../img/Starter-protein.webp' }, { 'id': 5, 'nombre': 'Plant-protein', 'precio': 53000, 'img': '../../img/Plant-protein.webp' }];
let creatinas = [{ 'id': 6, 'nombre': 'Creatina-monohidrato', 'precio': 45000, 'img': '../../img/Creatina-monohidrato.webp' }, { 'id': 7, 'nombre': 'Creatina-electrolitos', 'precio': 31200, 'img': '../../img/Creatina-electrolitos.webp' }, { 'id': 8, 'nombre': 'Creatina-monohidrato-1kilo', 'precio': 92000, 'img': '../../img/Creatina-monohidrato-1kilo.webp' }];
let shakers = [{ 'id': 9, 'nombre': 'Shaker-ENA', 'precio': 6700, 'img': '../../img/Shaker-ENA.webp' }, { 'id': 10, 'nombre': 'Shaker-PLUS', 'precio': 7400, 'img': '../../img/Shaker-PLUS.webp' }, { 'id': 11, 'nombre': 'Shaker-premium-truemade', 'precio': 27000, 'img': '../../img/Shaker-premium-truemade.webp' }, { 'id': 12, 'nombre': 'Shaker-premium', 'precio': 27000, 'img': '../../img/Shaker-premium.webp' }];

let arrayCarrito = JSON.parse(localStorage.getItem("Carrito")) || [];

function mostrarNombreUsuario() {
    const nombre = localStorage.getItem("nombreUsuario");
    document.querySelector(".nombreUsuario").textContent = `Bienvenido ${nombre}`;
}
mostrarNombreUsuario();

function insertarProductos(array, id) {
    const zona = document.getElementById(id);
    let arrayzona = array.map(producto => 
        `<div class="productos">
            <div class="contenedor-imagen">
                <img src="${producto.img}" alt="${producto.nombre}" class="img-producto">
            </div>
            <p class="nombre-producto">${producto.nombre}</p>
            <p class="precio-producto">$${producto.precio}</p>
            <div class="botones-productos">
                <button class="boton-agregar" id="boton-agregar-${producto.nombre}">+</button>
                <button class="boton-borrar" id="boton-borrar-${producto.nombre}">-</button>
            </div>
        </div>`);
    const stringZona = arrayzona.join("");
    zona.innerHTML = stringZona;
}

insertarProductos(proteinas, "listado-proteinas");
insertarProductos(creatinas, "listado-creatinas");
insertarProductos(shakers, "listado-shakers");

function crearEscuchadorBotonAgregar(texto) {
    let boton = document.getElementById(`boton-agregar-${texto}`);
    boton.addEventListener("click", () => {
        proteinas.forEach(proteina => {
            if (proteina.nombre === texto) {
                arrayCarrito.push(structuredClone(proteina));
            }
        });
        creatinas.forEach(creatina => {
            if (creatina.nombre === texto) {
                arrayCarrito.push(structuredClone(creatina));
            }
        });
        shakers.forEach(shaker => {
            if (shaker.nombre === texto) {
                arrayCarrito.push(structuredClone(shaker));
            }
        });
        let CarritoJSON = JSON.stringify(arrayCarrito);
        localStorage.setItem("Carrito", CarritoJSON);
    });
}

function crearEscuchadorBotonBorrar(texto) {
    let boton = document.getElementById("boton-borrar-" + texto);
    boton.addEventListener("click", () => {
        let JSONCarrito = localStorage.getItem("Carrito");
        if (JSONCarrito !== null) {
            let arrayCarritoBorrar = JSON.parse(JSONCarrito);
            for (let i = 0; i < arrayCarritoBorrar.length; i++) {
                if (arrayCarritoBorrar[i].nombre === texto) {
                    arrayCarritoBorrar.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem("Carrito", JSON.stringify(arrayCarritoBorrar));
        }
    })

}
proteinas.forEach(proteina => crearEscuchadorBotonAgregar(proteina.nombre));
shakers.forEach(shaker => crearEscuchadorBotonAgregar(shaker.nombre));
creatinas.forEach(creatina => crearEscuchadorBotonAgregar(creatina.nombre));

proteinas.forEach(proteina => crearEscuchadorBotonBorrar(proteina.nombre));
shakers.forEach(shaker => crearEscuchadorBotonBorrar(shaker.nombre));
creatinas.forEach(creatina => crearEscuchadorBotonBorrar(creatina.nombre));

function irAInicio() {
    location.href = "";
}

function cambiarDeUsuario(){
    localStorage.clear();
    location.href = "../../index.html";
}