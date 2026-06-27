/*function activarProducto(idProducto){
    const boton=document.getElementById("btn-activar-"+idProducto);
    const objetoActivar={"id": idProducto};
    boton.addEventListener("click",async ()=>{
        console.log("editando boton--------------------------");
        try {
            const response= await fetch(`http://localhost:3000/api/activar-productos`,{
                method : "PUT",
                headers : {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(objetoActivar)
            })
            const data=await response.json();
            console.log(data);
            
        } catch (error) {
            console.log(error);
        }
    });

}*/

function modificarProducto(producto){
    const boton=document.getElementById("btn-modificar-"+producto.id);
    boton.addEventListener("click",()=>{
        localStorage.setItem("producto",JSON.stringify(producto));
        window.location.href="put.html";
    });

}

function crearEscuchadorBotonActivar(producto){
    const boton=document.getElementById("btn-activar-"+producto.id);
    const contenedor=document.getElementById("contenedor-"+producto.id);
    const objetoActivar={"id": producto.id};
    const urlBase=`http://localhost:3000/api/activar-productos`;
    boton.addEventListener("click",async ()=>{

        try {
            const response= await fetch(urlBase,{
                method : "PUT",
                headers : {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(objetoActivar)
            })
            const data=await response.json();
            console.log(data);
            
        } catch (error) {
            console.log(error);
        }
        
        contenedor.innerHTML=`<div class="contenedor-imagen">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
            </div>
            <p class="nombre-producto">${producto.nombre}</p>
            <p class="id-producto">ID: ${producto.id}</p>
            <p class="precio-producto">$${producto.precio}</p>
            <p class="texto-estado">Estado: activo</p>
            <button id="btn-modificar-${producto.id}" >Modificar producto</button>`;
        
        modificarProducto(producto); 
        
        
        
    });
}

function mostrarProductos(array, id) {
    const zona = document.getElementById(id);
    let arrayzona = array.map(producto => `
        <div class="productos" id="contenedor-${producto.id}">
            <div class="contenedor-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
            </div>
            <p class="nombre-producto">${producto.nombre}</p>
            <p class="id-producto">ID: ${producto.id}</p>
            <p class="precio-producto">$${producto.precio}</p>
            ${producto.activo === 0 ? `<p class="texto-estado">Estado: Inactivo</p><button id="btn-activar-${producto.id}" >Activar</button>` : `<p class="texto-estado">Estado: activo</p>`}
            <button id="btn-modificar-${producto.id}" >Modificar producto</button>
            
        </div>`
        );
        const stringZona = arrayzona.join("");
        zona.innerHTML = stringZona;
        array.forEach(producto=>{
            if(producto.activo===0){
                    
                    //activarProducto(producto.id);
                    crearEscuchadorBotonActivar(producto);

                }
        });
        array.forEach(producto=>{
            modificarProducto(producto);  
        });
    }

function mostrarError(mensaje){
    const zonaProductos=document.getElementById("zona-productos");
    zonaProductos.innerHTML=`<p id="mensajeError">${mensaje}</p>`;
}


async function mostrarDatosBase() {
    const urlBase="http://localhost:3000/api/productos/mostrar-admin";
    try {
        const response = await fetch(urlBase);
        const data = await response.json();
        //aca este if da false si response.ok contiene un codigo de estado entre 200 y 299 y da true cuando tira otro codigo de estado entonces al entrar al if va a mostrar el mensaje de error y no va a ejecutar el codigo de abajo por el return y termina la funcion en el return
        if(!response.ok){
            mostrarError(data.mensaje);
            return;
        }
        const productos = data.payload;
        mostrarProductos(productos, "zona-productos");
        
    } catch (error) {
        console.log(error);
        mostrarError("Error de conexion con el servidor");
    }





}

mostrarDatosBase();



function irAInicio() {
    location.href = "";
}

function cambiarDeUsuario() {
    localStorage.clear();
    location.href = "../../index.html";
}
