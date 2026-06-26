function mostrarMensaje(tipo,mensaje){ 
    const zonaProductos=document.getElementById("seccion-productos");
    zonaProductos.innerHTML=`<p id="mensaje-${tipo}">${mensaje}</p>`;
}

function mostrarPantallaProductoModificar(){
    const seccionformulario= document.getElementById("mostrar-formulario");
    const seccionProducto=document.getElementById("mostrar-producto");
    
    const productoExtraido=JSON.parse(localStorage.getItem("producto"));
    if(productoExtraido!==null){
        seccionProducto.innerHTML= `<div id="contenedor-producto">
               <div class="contenedor-imagen">
                   <img src="${productoExtraido.imagen}" alt="${productoExtraido.nombre}" class="img-producto">
               </div>
               <p class="nombre-producto">${productoExtraido.nombre}</p>
               <p class="precio-producto">$${productoExtraido.precio}</p>
               
               
           </div>`;

        seccionformulario.innerHTML=`<label for="id">Ingrese un nuevo id:</label>
            <input type="text" name="id" id="id">
            <label for="nombre">Ingrese un nuevo nombre:</label>
            <input type="text" name="nombre" id="nombre">
            <label for="categoria">Ingrese una categoria:</label>
            <select name="categoria" id="categoria">
                <option value="proteina">proteina</option>
                <option value="creatina">creatina</option>
                <option value="shaker">shaker</option>
            </select>
            <label for="precio">Ingrese un nuevo precio:</label>
            <input type="text" name="precio" id="precio">
            <label for="imagen">Ingrese una nueva imagen:</label>
            <input type="text" name="imagen" id="imagen">
            <label for="estado">Estado: </label>
            <select name="estado" id="estado">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
            </select>
            <input type="submit" value="Modificar Producto" id="subir-modificacion">
            `

    }
    CrearEscuchadorSubmit(productoExtraido);

}

mostrarPantallaProductoModificar();

function CrearEscuchadorSubmit(producto){
    const formulario=document.getElementById("mostrar-formulario");
    const urlBase=`http://localhost:3000/api/modificar-producto`;
    formulario.addEventListener("submit",async(event)=>{
        event.preventDefault();
        const datosForm=new FormData(event.target);
        const objetoProducto=Object.fromEntries(datosForm.entries());
        
        const objetoEnviar={"productoViejo":producto,"productoNuevo":objetoProducto};
        try {
            const response= await fetch(urlBase,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(objetoEnviar)
            });
            const data=await response.json();
            const alerta=alert(data.mensaje);
            
        } catch (error) {
            console.log(error);
        }
        window.location.href="admin.html";
    });

}