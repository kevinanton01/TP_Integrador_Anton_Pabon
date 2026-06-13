//import { stringify } from "node:querystring";

function subirDatos(){
    const formulario=document.getElementById("formulario");
    formulario.addEventListener("submit",async (event)=>{
        event.preventDefault();

        const formdata= new FormData(event.target);
        const objetojs= Object.fromEntries(formdata.entries());
        console.log(objetojs);

        const response=await fetch("http://localhost:3000/api/productos",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(objetojs)
        });

        const data=await response.json();

        console.log(data);
    })

}

subirDatos();









