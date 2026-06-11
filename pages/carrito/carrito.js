let arrayCarritoUnico = [];

function crearCarrito() {
    let zonaCarrito = document.getElementById("carrito-productos");
    let arrayCarritoExtraido = JSON.parse(localStorage.getItem("Carrito")) || [];

    arrayCarritoExtraido.forEach(producto => {

        let productoExistente = arrayCarritoUnico.find(
            productoBuscado => productoBuscado.nombre === producto.nombre
        );

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            arrayCarritoUnico.push({
                ...producto, // Traigo los demas datos del producto
                cantidad: 1
            });
        }
    });

    let arrayCarritoUnicoHTML = arrayCarritoUnico.map(producto =>
        `<div class=contenedor-producto>
            <div class="contenedor-imagen">
                <img src="${producto.img}" alt="${producto.nombre}" class="imagen-carrito" >
            </div>
            <div class="contenedor-info">
                <p>${producto.nombre}</p>
                <p>$${producto.precio}</p>
            </div>
            <div class="botones-carrito">
                <button class="boton-agregar" id="boton-agregar-${producto.nombre}">+</button>
                <p id="cantidad-${producto.nombre}">${producto.cantidad}</p>
                <button class="boton-borrar" id="boton-borrar-${producto.nombre}">-</button>
            </div>
        </div>
        <hr>`);

    let stringCarritoUnicoHTML = arrayCarritoUnicoHTML.join("");
    const total = arrayCarritoUnico.reduce((acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad, 0); // recorre todo el array y se obtiene un unico valor.
    stringCarritoUnicoHTML += `<p id="precio-total">TOTAL: $${total}</p>`;
    if (arrayCarritoUnico.length > 0) {
    stringCarritoUnicoHTML += `
        <button id="botonConfirmar" onclick="confirmarCompra()">
            Confirmar
        </button>
    `;
}
    zonaCarrito.innerHTML = stringCarritoUnicoHTML;
}

function crearEscuchadorBotonAgregar(texto) {
    let zonaCantidad = document.getElementById("cantidad-" + texto);
    let boton = document.getElementById(`boton-agregar-${texto}`);

    boton.addEventListener("click", () => {
        let arrayCarrito = JSON.parse(localStorage.getItem("Carrito")) || [];

        let producto = arrayCarritoUnico.find(
            item => item.nombre === texto
        );

        if (producto) {
            arrayCarrito.push(structuredClone(producto)); // agrego una copia al carrito.
        }

        localStorage.setItem("Carrito", JSON.stringify(arrayCarrito));

        let posicion;

        arrayCarritoUnico.forEach(producto => {
            if (producto.nombre === texto) {
                producto.cantidad++;
                posicion = producto.cantidad;
            }
        });

        zonaCantidad.innerHTML = posicion;

        actualizarTotal();
    });
}

function crearEscuchadorBotonBorrar(texto) {
    let zonaCantidad = document.getElementById("cantidad-" + texto);
    let boton = document.getElementById("boton-borrar-" + texto);

    boton.addEventListener("click", () => {
        let JSONCarrito = localStorage.getItem("Carrito");

        if (JSONCarrito !== null) {
            let arrayCarritoBorrar = JSON.parse(JSONCarrito); // convierto el texto JSON en un array de JavaScript.

            for (let i = 0; i < arrayCarritoBorrar.length; i++) {
                if (arrayCarritoBorrar[i].nombre === texto) {
                    arrayCarritoBorrar.splice(i, 1); // elimino un elemento a partir de posicion i.
                    break;
                }
            }

            localStorage.setItem("Carrito", JSON.stringify(arrayCarritoBorrar));
        }

        let posicion = 0;

        arrayCarritoUnico.forEach(producto => {
            if (producto.nombre === texto && producto.cantidad >= 1) {
                producto.cantidad--;
                posicion = producto.cantidad;
            }
        });

        zonaCantidad.innerHTML = posicion;

        actualizarTotal();
    });
}

crearCarrito();

arrayCarritoUnico.forEach(producto =>
    crearEscuchadorBotonAgregar(producto.nombre)
);

arrayCarritoUnico.forEach(producto =>
    crearEscuchadorBotonBorrar(producto.nombre)
);

function actualizarTotal() {
    const total = arrayCarritoUnico.reduce(
        (acumulador, elemento) =>
            acumulador + elemento.precio * elemento.cantidad,
        0
    );

    document.getElementById("precio-total").innerHTML =
        `TOTAL: $${total}`;
}

function confirmarCompra(){
    if (arrayCarritoUnico.length > 0) {
        console.log("compra confirmada.")
    }
}