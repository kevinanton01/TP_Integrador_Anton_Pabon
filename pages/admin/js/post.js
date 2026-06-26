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
        if(errores.length>0){
            mostrarMensaje("error",errores.join())
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

            
            
        } catch (error) {
            console.log(error);
        }
    })

}

subirDatos();









