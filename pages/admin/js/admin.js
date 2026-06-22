function activarProducto(idProducto){
    const boton=document.getElementById("btn-activar-"+idProducto);
    const objetoActivar={"id": idProducto};
    boton.addEventListener("click",async ()=>{
        console.log("editando boton--------------------------");
        const response= await fetch(`http://localhost:3000/api/activar-productos`,{
            method : "PUT",
            headers : {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(objetoActivar)
        })
        const data=await response.json();
        console.log(data);
    });

}

function modificarProducto(producto){
    const boton=document.getElementById("btn-modificar-"+producto.id);
    boton.addEventListener("click",()=>{
        localStorage.setItem("producto",JSON.stringify(producto));
        window.location.href="put.html";
    });

}

function mostrarProductos(array, id) {
    const zona = document.getElementById(id);
    let arrayzona = array.map(producto => `
        <div class="productos">
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
                activarProducto(producto.id);  
            }
        });
        array.forEach(producto=>{
            modificarProducto(producto);  
        });
    }
async function mostrarDatosBase() {
    const response = await fetch("http://localhost:3000/api/productos");
    const data = await response.json();
    const productos = data.payload;



    mostrarProductos(productos, "listado-productos");


}

mostrarDatosBase();



function irAInicio() {
    location.href = "";
}

function cambiarDeUsuario() {
    localStorage.clear();
    location.href = "../../index.html";
}
