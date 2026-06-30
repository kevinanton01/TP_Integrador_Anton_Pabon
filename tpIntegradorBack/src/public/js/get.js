


async function mostrarProductos(id) {
    const seccion=document.getElementById("seccion-productos");
    //optimizacion 3:guardamos la url en una variable para eviar hardcodearla
    const urlBase=`http://localhost:3000/api/productos/${id}`;
    try {
        
        const response= await fetch(urlBase);
        
        const data= await response.json();
        //optimizacion 4: evaluamos si el servidor no respondio un ok(es decir el codigo de estado que devuelve no esta entre 200 y 299)
        if(!response.ok){
            mostrarError(data.mensaje);
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
                
            </div>`;
        
    } catch (error) {
        //salta aca en caso de que no tengamos internet o el servidor este caido
        console.log(error);
        mostrarError("Error de conexion con el servidor");
    }



    


}


function mostrarError(mensaje){
    const zonaProductos=document.getElementById("seccion-productos");
    zonaProductos.innerHTML=`<p id="mensajeError">${mensaje}</p>`;
}


function botonBuscarPorId(){
    const formulario=document.getElementById("getProduct-form");
    formulario.addEventListener("submit",(event)=>{
        event.preventDefault();
        /*
        const datosForm= new FormData(event.target);
        const objetojs= Object.fromEntries(datosForm.entries());
        const valorId=objetojs.id;*/
        //optiizacion 1: si hay un solo valor podemos saltarnos el FormData + Object.fromEntries
        const idProd= event.target.id.value.trim();
        //optimizacion 2:tambien filtramos en el cliente en caso de que no haya un id valido
        if(!idProd){
            mostrarError("ingresa un ID valido");
            return;
        }
        
        
        mostrarProductos(idProd);
        

    })
}
botonBuscarPorId();