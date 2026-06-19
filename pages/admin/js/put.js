function CrearEscuchadorSubmit(idProducto){
    const formulario=document.getElementById("modificar-formulario");
    formulario.addEventListener("submit",async(event)=>{
        event.preventDefault();
        const datosForm=new FormData(event.target);
        const objetoProducto=Object.fromEntries(datosForm.entries());
        const formularioBusqueda=document.getElementById("idProd");
        const objetoEnviar={"idAnterior":idProducto,"producto":objetoProducto};
        const response= await fetch(`http://localhost:3000/api/productos`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(objetoEnviar)
        });
    })
}






async function mostrarProductos(id) {
    const seccion=document.getElementById("seccion-productos");
    const response= await fetch(`http://localhost:3000/api/productos/${id}`);
    const data= await response.json();

    const objetoMostrar=data.payload[0];

    console.log(objetoMostrar);
    
    seccion.innerHTML= `<div id="contenedor-producto">
            <div class="contenedor-imagen">
                <img src="${objetoMostrar.imagen}" alt="${objetoMostrar.nombre}" class="img-producto">
            </div>
            <p class="nombre-producto">${objetoMostrar.nombre}</p>
            <p class="precio-producto">$${objetoMostrar.precio}</p>
            
            
        </div>`;
    CrearEscuchadorSubmit(objetoMostrar.id);


    


}

function botonBuscarPorId(){
    const formulario=document.getElementById("getProduct-form");
    formulario.addEventListener("submit",(event)=>{
        event.preventDefault();
        const datosForm= new FormData(event.target);
        const objetojs= Object.fromEntries(datosForm.entries());
        const valorId=objetojs.id;
        mostrarProductos(valorId);
        

    })
}
botonBuscarPorId();