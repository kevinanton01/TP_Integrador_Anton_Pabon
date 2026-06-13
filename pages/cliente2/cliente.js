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

async function mostrarDatosBase(){
    const response= await fetch("http://localhost:3000/api/productos");
    const data= await response.json();
    
    let productos=data.payload;
    let proteinas = productos.filter(producto => producto.categoria === "proteina");
    let creatinas = productos.filter(producto => producto.categoria === "creatina");
    let shakers = productos.filter(producto => producto.categoria === "shaker");

    const response2= await fetch("http://localhost:3000/api/ventas-productos");
    const data2= await response2.json();

    let arrayCarrito= data2.payload;


    insertarProductos(proteinas, "listado-proteinas");
    insertarProductos(creatinas, "listado-creatinas");
    insertarProductos(shakers, "listado-shakers");


    function crearEscuchadorBotonAgregar(texto) {
    let boton = document.getElementById(`boton-agregar-${texto}`);
    let dato;
    boton.addEventListener("click", () => {
        proteinas.forEach(proteina => {
            if (proteina.nombre === texto) {
                //arrayCarrito.push(structuredClone(proteina));
                const response3=await fetch(`/api/ventas-productos/${proteina.id}`);
                const data3=await response3.json();
                arrayCarrito.push(data3.payload[0]);
                dato=data3.payload[0];

            }
        });
        creatinas.forEach(creatina => {
            if (creatina.nombre === texto) {
                //arrayCarrito.push(structuredClone(creatina));
                const response4=await fetch(`/api/ventas-productos/${creatina.id}`);
                const data4=await response4.json();
                arrayCarrito.push(data4.payload[0]);
                dato=data4.payload[0];
            }
        });
        shakers.forEach(shaker => {
            if (shaker.nombre === texto) {
                //arrayCarrito.push(structuredClone(shaker));
                const response5=await fetch(`/api/ventas-productos/${shaker.id}`);
                const data5=await response5.json();
                arrayCarrito.push(data5.payload[0]);
                dato=data5.payload[0];
            }
        });
        //let CarritoJSON = JSON.stringify(arrayCarrito);
        //localStorage.setItem("Carrito", CarritoJSON);

    });
}

}


mostrarDatosBase();




function mostrarNombreUsuario() {
    const nombre = localStorage.getItem("nombreUsuario");
    document.querySelector(".nombreUsuario").textContent = `Bienvenido ${nombre}`;
}
mostrarNombreUsuario();







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