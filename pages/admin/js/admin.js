

function mostrarProductos(array, id) {
    const zona = document.getElementById(id);
    let arrayzona = array.map(producto => 
        `<div class="productos">
            <div class="contenedor-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-producto">
            </div>
            <p class="nombre-producto">${producto.nombre}</p>
            <p class="precio-producto">$${producto.precio}</p>
        </div>`);
    const stringZona = arrayzona.join("");
    zona.innerHTML = stringZona;
}
async function mostrarDatosBase(){
    const response=await fetch("http://localhost:3000/api/productos");
    const data= await response.json();
    const productos=data.payload;
    


    mostrarProductos(productos,"listado-productos");
    

}

mostrarDatosBase();



function irAInicio() {
    location.href = "";
}

function cambiarDeUsuario(){
    localStorage.clear();
    location.href = "../../index.html";
}
