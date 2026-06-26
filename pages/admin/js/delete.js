//optimizacion 2:mostrar mensaje de exito o error visualmente
function mostrarMensaje(tipo,mensaje){ 
    const zonaProductos=document.getElementById("seccion-productos");
    zonaProductos.innerHTML=`<p id="mensaje-${tipo}">${mensaje}</p>`;
}


function crearEscuchadorBotonBorrar(id,producto){
    const boton=document.getElementById(id);
    const urlBase=`http://localhost:3000/api/productos/${producto.id}`
    boton.addEventListener("click",async ()=>{
        const pregunta= prompt("estas seguro que deseas borrar este producto?");
        if(pregunta==="si"){
            try {
                const response=await fetch(urlBase,{
                    method: "PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(producto)
                });
                const data=await response.json();

                //optimizacion 4: evaluamos si el servidor no respondio un ok(es decir el codigo de estado que devuelve no esta entre 200 y 299)
                if(!response.ok){
                    console.log(data.mensaje);
                    mostrarMensaje("error",data.mensaje);
                    return;
                }
                mostrarMensaje("exito",data.mensaje);
                
            } catch (error) {
                console.log(error)
                mostrarMensaje("error","Error de conexion con el servidor")
            }
        }
    })
}

async function mostrarProductos(id) {
    const seccion=document.getElementById("seccion-productos");
    try {
        const response= await fetch(`http://localhost:3000/api/productos/${id}`);
        const data= await response.json();
        //optimizacion 4: evaluamos si el servidor no respondio un ok(es decir el codigo de estado que devuelve no esta entre 200 y 299)
        if(!response.ok){
            mostrarMensaje("error",data.mensaje);
            return;
        }
    
        const objetoMostrar=data.payload[0];
    
        console.log(objetoMostrar);
        
        seccion.innerHTML= `<div id="contenedor-producto">
                <div class="contenedor-imagen">
                    <img src="${objetoMostrar.imagen}" alt="${objetoMostrar.nombre}" class="img-producto">
                </div>
                <p class="nombre-producto">${objetoMostrar.nombre}</p>
                <p class="precio-producto">$${objetoMostrar.precio}</p>
                <button id="boton-borrar">Eliminar Producto</button>
                
            </div>`;
    
        crearEscuchadorBotonBorrar("boton-borrar",objetoMostrar);
        
    } catch (error) {
        console.log(error);
        
    }

    


}

function botonBuscarPorId(){
    const formulario=document.getElementById("getProduct-form");
    formulario.addEventListener("submit",(event)=>{
        event.preventDefault();
       /* const datosForm= new FormData(event.target);
        const objetojs= Object.fromEntries(datosForm.entries());
        const valorId=objetojs.id;*/
        //optiizacion 1: si hay un solo valor podemos saltarnos el FormData + Object.fromEntries
        const idProd= event.target.id.value.trim();
        if(!idProd){
            mostrarError("ingresa un ID valido");
            return;
        }
        mostrarProductos(idProd);
        

    })
}
botonBuscarPorId();