let productos = [
    { id: 1, nombre: 'Isoprot', img: '../../img/Isoprot.webp', categoria: 'proteina', precio: 126000 },
    { id: 2, nombre: 'Ultra-mass', img: '../../img/Ultra-mass.webp', categoria: 'proteina', precio: 59400 },
    { id: 3, nombre: 'Whey-x-pro', img: '../../img/Whey-x-pro.webp', categoria: 'proteina', precio: 98000 },
    { id: 4, nombre: 'Starter-protein', img: '../../img/Starter-protein.webp', categoria: 'proteina', precio: 42300 },
    { id: 5, nombre: 'Plant-protein', img: '../../img/Plant-protein.webp', categoria: 'proteina', precio: 53000 },

    { id: 6, nombre: 'Creatina-monohidrato', img: '../../img/Creatina-monohidrato.webp', categoria: 'creatina', precio: 45000 },
    { id: 7, nombre: 'Creatina-electrolitos', img: '../../img/Creatina-electrolitos.webp', categoria: 'creatina', precio: 31200 },
    { id: 8, nombre: 'Creatina-monohidrato-1kilo', img: '../../img/Creatina-monohidrato-1kilo.webp', categoria: 'creatina', precio: 92000 },

    { id: 9, nombre: 'Shaker-ENA', img: '../../img/Shaker-ENA.webp', categoria: 'shaker', precio: 6700 },
    { id: 10, nombre: 'Shaker-PLUS', img: '../../img/Shaker-PLUS.webp', categoria: 'shaker', precio: 7400 },
    { id: 11, nombre: 'Shaker-premium-truemade', img: '../../img/Shaker-premium-truemade.webp', categoria: 'shaker', precio: 27000 },
    { id: 12, nombre: 'Shaker-premium', img: '../../img/Shaker-premium.webp', categoria: 'shaker', precio: 27000 }
];

let proteinas = productos.filter(producto => producto.categoria === "proteina");
let creatinas = productos.filter(producto => producto.categoria === "creatina");
let shakers = productos.filter(producto => producto.categoria === "shaker");

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