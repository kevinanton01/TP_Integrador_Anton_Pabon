let productos = [
    { id: 1, nombre: 'Isoprot', img: '../../img/Isoprot.webp', categoria: 'proteina', precio: 126000 },
    { id: 2, nombre: 'Ultra-mass', img: '../../img/Ultra-mass.webp', categoria: 'proteina', precio: 59400 },
    { id: 3, nombre: 'Whey-x-pro', img: '../../img/Whey-x-pro.webp', categoria: 'proteina', precio: 98000 },
    { id: 4, nombre: 'Starter-protein', img: '../../img/Starter-protein.webp', categoria: 'proteina', precio: 42300 },
    { id: 5, nombre: 'Plant-protein', img: '../../img/Plant-protein.webp', categoria: 'proteina', precio: 53000 },

    { id: 6, nombre: 'Creatina-monohidrato', img: '../../img/Creatina-monohidrato.webp', categoria: 'creatina', precio: 45000 },
    { id: 7, nombre: 'Creatina-electrolitos', img: '../../img/Creatina-electrolitos.webp', categoria: 'creatina', precio: 31200 },
    { id: 8, nombre: 'Creatina-monohidrato-1kilo', img: '../../img/Creatina-monohidrato-1kilo.webp', categoria: 'creatina', precio: 92000 },

    { id: 9, nombre: 'Shaker-ENA', img: '../../img/Shaker-ENA.webp', categoria: 'shaker', precio: 6700 },
    { id: 10, nombre: 'Shaker-PLUS', img: '../../img/Shaker-PLUS.webp', categoria: 'shaker', precio: 7400 },
    { id: 11, nombre: 'Shaker-premium-truemade', img: '../../img/Shaker-premium-truemade.webp', categoria: 'shaker', precio: 27000 },
    { id: 12, nombre: 'Shaker-premium', img: '../../img/Shaker-premium.webp', categoria: 'shaker', precio: 27000 }
];

function mostrarProductos(array, id) {
    const zona = document.getElementById(id);
    let arrayzona = array.map(producto => 
        `<div class="productos">
            <div class="contenedor-imagen">
                <img src="${producto.img}" alt="${producto.nombre}" class="img-producto">
            </div>
            <p class="nombre-producto">${producto.nombre}</p>
            <p class="precio-producto">$${producto.precio}</p>
        </div>`);
    const stringZona = arrayzona.join("");
    zona.innerHTML = stringZona;
}

mostrarProductos(productos, "listado-productos");

function irAInicio() {
    location.href = "";
}

function cambiarDeUsuario(){
    localStorage.clear();
    location.href = "../../index.html";
}
