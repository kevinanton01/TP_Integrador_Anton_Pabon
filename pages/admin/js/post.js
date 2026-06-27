//optimizacion 1: validacion previa de los datos que se insertan en el formulario
function validarFormulario(data){
    const errores=[];
    if(!data.nombre || data.nombre.trim().length < 2){
        errores.push("el nombre debe tener al menos dos caracteres");  
    }

    if(!data.precio || isNaN(data.precio) || Number(data.precio) < 0){
        errores.push("el precio debe ser un numero mayor a cero");
    }

    if(!data.categoria){
        errores.push("debe seleccionar una categoria");
    }
    return errores;
}

//optimizacion 2:mostrar mensaje de exito o error visualmente
function mostrarMensaje(tipo,mensaje){ 
    const zonaProductos=document.getElementById("mensaje");
    zonaProductos.innerHTML=`<p id="mensaje-${tipo}">${mensaje}</p>`;
}


function subirDatos(){
    const urlBase="http://localhost:3000/api/productos";
    const formulario=document.getElementById("formulario");
    formulario.addEventListener("submit",async (event)=>{
        event.preventDefault();

        const formdata= new FormData(event.target);
        const objetojs= Object.fromEntries(formdata.entries());
        //optimizacion 3: parseamos precio antes de enviarlo porque formdata devuelve todo como strings
        objetojs.precio=Number(objetojs.precio);
        //optimizacion 4: llamamos a la funcion para validar los datos del formulario
        const errores= validarFormulario(objetojs);
        //si hay errores mostramos mensaje de error y terminamos aca
        if(errores.length>0){
            mostrarMensaje("error",errores.join(" ")) 
            return;
        }
        try {
            const response=await fetch(urlBase,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(objetojs)
            });
    
            const data=await response.json();
    
            console.log(data);
            //optimizacion 5: manejamos respuestas no ok del servidor(que no esten entre 200 y 299)
        
            if (!response.ok) {
                
                if (data.errores) {
                    mostrarListaErrores(data.errores);
                    return;
                }

                mostrarMensaje("error", data.mensaje);
                return;
            }

            // En caso de exito, mostramos los siguientes mensajes
            mostrarMensaje("exito", data.mensaje);
            console.log(data.mensaje);
            
            
        } catch (error) {
            
            console.error("Error al enviar los datos ", error);
            mostrarMensaje("error", "Error al procesar la solicitud");
        }
    })

}

subirDatos();









