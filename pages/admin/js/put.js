//optimizacion 1:mostrar mensaje de exito o error visualmente
function mostrarMensaje(tipo,mensaje){ 
    const zonaMensaje=document.getElementById("mensaje");
    zonaMensaje.innerHTML=`<p id="mensaje-${tipo}">${mensaje}</p>`;
}

function mostrarListaErrores(array) {
    const zonaMensaje=document.getElementById("mensaje");
    let htmlErrores = "";
    array.forEach(error => {
        htmlErrores+= `<p class="mensaje-error">${error}</p>`
    });
    zonaMensaje.innerHTML = htmlErrores;
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
        let htmlFormulario=  `
            <input type="hidden" name="id" value="${productoExtraido.id}">
            <div>
            <label for="nombre" class="label">Ingrese un nuevo nombre:</label>
            <input type="text" name="nombre" id="nombre" value="${productoExtraido.nombre}" class="input">
            </div>
            <div>
            <label for="categoria" class="label">Ingrese una nueva categoria:</label>
            `
        if(productoExtraido.categoria==="proteina"){
            htmlFormulario += ` <select name="categoria" id="categoria">
                <option value="proteina" selected>proteina</option>
                <option value="creatina">creatina</option>
                <option value="shaker">shaker</option>
            </select>
            </div>`;
        }else if(productoExtraido.categoria==="creatina"){
            htmlFormulario += ` <select name="categoria" id="categoria">
                <option value="proteina">proteina</option>
                <option value="creatina" selected>creatina</option>
                <option value="shaker">shaker</option>
            </select>
            </div>`;
        }else{
            htmlFormulario += ` <select name="categoria" id="categoria">
                <option value="proteina">proteina</option>
                <option value="creatina">creatina</option>
                <option value="shaker" selected>shaker</option>
            </select>
            </div>`;
        } 
        htmlFormulario+=`
            <div>
            <label for="precio" class="label">Ingrese un nuevo precio:</label>
            <input type="text" name="precio" id="precio" value="${productoExtraido.precio}" class="input">
            </div>
            <div>
            <label for="imagen" class=label>Ingrese una nueva imagen:</label>
            <input type="text" name="imagen" id="imagen" value="${productoExtraido.imagen}" class="input">
            </div>
            <div>
            <label for="estado" class=label>Ingrese un nuevo estado:</label>
            <select name="activo" id="activo">`;
        if(productoExtraido.activo===1){
            htmlFormulario +=`<option value="1" selected>Activo</option>
                <option value="0">Inactivo</option>`;
        }else{
            htmlFormulario +=`<option value="1">Activo</option>
                <option value="0" selected>Inactivo</option>`;
        }
        htmlFormulario +=` </select>
            </div>
            <div>
            <input type="submit" value="Modificar Producto" id="subir-modificacion">
            </div>`;
        
            

        seccionformulario.innerHTML=htmlFormulario;
        CrearEscuchadorSubmit();

    }else{
        mostrarMensaje("error","No se selecciono ningun producto para modificar");
    }
    //CrearEscuchadorSubmit(productoExtraido);

}

mostrarPantallaProductoModificar();

function CrearEscuchadorSubmit(){
    const seccionFormulario=document.getElementById("seccion-formulario");
    const seccionProducto=document.getElementById("seccion-producto");
    const formulario=document.getElementById("mostrar-formulario");
    const urlBase=`http://localhost:3000/api/modificar-producto`;
    formulario.addEventListener("submit",async(event)=>{
        event.preventDefault();
        const datosForm=new FormData(event.target);
        const objetoProducto=Object.fromEntries(datosForm.entries());
        objetoProducto.precio=Number(objetoProducto.precio);
        objetoProducto.activo=Number(objetoProducto.activo);
        
        
        try {
            const response= await fetch(urlBase,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(objetoProducto)
            });
            const data=await response.json();
            //optimizacion: manejamos una respuesta cuyo codigo de estado no esta entre 200 y 299
            if(!response.ok){
                seccionFormulario.innerHTML="";
                if (data.errores) {
                    mostrarListaErrores(data.errores);
                    return;
                }
                mostrarMensaje("error",data.mensaje);
                return;
            }
            seccionFormulario.innerHTML = "";
            seccionProducto.innerHTML = "";
            mostrarMensaje("exito",data.mensaje);
            localStorage.clear();
            
            
        } catch (error) {
            console.log(error);
        }
        //window.location.href="admin.html";
    });

}