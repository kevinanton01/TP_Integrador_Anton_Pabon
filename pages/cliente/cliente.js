//let arrayCarrito = JSON.parse(localStorage.getItem("Carrito")) || [];
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

function insertarProductos(array, id) {
    const zona = document.getElementById(id);
    let arrayzona = array
       // .filter(producto => producto.activo === 1)
        .map(producto => 
        `<div class="productos">
            <div class="contenedor-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
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
    function crearEscuchadorBotonAgregar(texto) {

        let boton = document.getElementById(`boton-agregar-${texto}`);
        boton.addEventListener("click", () => {
            let arrayCarrito = JSON.parse(localStorage.getItem("Carrito")) || [];
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

    const urlBase="http://localhost:3000/api/productos";
 try {
        
        const response= await fetch(urlBase);
        const data= await response.json();
        console.log(data);
        let productos=data.payload;
        console.log(productos);
        let proteinas = productos.filter(producto => producto.categoria === "proteina");
        console.log(proteinas);
        let creatinas = productos.filter(producto => producto.categoria === "creatina");
        let shakers = productos.filter(producto => producto.categoria === "shaker");
    
        insertarProductos(proteinas, "listado-proteinas");
        insertarProductos(creatinas, "listado-creatinas");
        insertarProductos(shakers, "listado-shakers");
        console.log("insertados-------------------------");
        proteinas.forEach(proteina => crearEscuchadorBotonAgregar(proteina.nombre));
        shakers.forEach(shaker => crearEscuchadorBotonAgregar(shaker.nombre));
        creatinas.forEach(creatina => crearEscuchadorBotonAgregar(creatina.nombre));
        
        proteinas.forEach(proteina => crearEscuchadorBotonBorrar(proteina.nombre));
        shakers.forEach(shaker => crearEscuchadorBotonBorrar(shaker.nombre));
        creatinas.forEach(creatina => crearEscuchadorBotonBorrar(creatina.nombre));
    } catch (error) {
        console.log(error);
    }
}

mostrarDatosBase();

function mostrarNombreUsuario() {
    const nombre = localStorage.getItem("nombreUsuario");
    document.querySelector(".nombreUsuario").textContent = `Bienvenido ${nombre}`;
}
mostrarNombreUsuario();

function irAInicio() {
    location.href = "";
}

function cambiarDeUsuario(){
    localStorage.clear();
    location.href = "../../index.html";
}