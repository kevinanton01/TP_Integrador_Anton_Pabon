let arrayProteinas=JSON.parse(localStorage.getItem("proteinas"));
let arrayShakers=JSON.parse(localStorage.getItem("shakers"));
let arrayCreatinas=JSON.parse(localStorage.getItem("creatinas"));
//let arrayCarrito=[];
//if(localStorage.getItem("Carrito")!==null){
//    arrayCarrito=JSON.parse(localStorage.getItem("Carrito"));
//}

let arrayCarritoUnico=[];

function crearCarrito(){
    let zonaCarrito=document.getElementById("carrito-productos");
    let stringCarritoExtraido=localStorage.getItem("Carrito");
    let arrayCarritoExtraido=JSON.parse(stringCarritoExtraido);
    
    arrayCreatinas.forEach(creatina=>{
        if(arrayCarritoExtraido.some(producto=>producto.nombre===creatina.nombre)===true){
            arrayCarritoUnico.push(creatina);
        }
    });
    arrayShakers.forEach(shacker=>{
        if(arrayCarritoExtraido.some(producto=>producto.nombre===shacker.nombre)===true){
            arrayCarritoUnico.push(shacker);
        }
    });
    arrayProteinas.forEach(proteina=>{
        if(arrayCarritoExtraido.some(producto=>producto.nombre===proteina.nombre)===true){
            arrayCarritoUnico.push(proteina);
        }
    });

    arrayCarritoUnico.forEach(productounico=>{

        let arrayProductos=arrayCarritoExtraido.filter(productoextraido=>productoextraido.nombre===productounico.nombre);
        let cantidad=arrayProductos.length;
        productounico.cantidad=cantidad;
    })

    let arrayCarritoUnicoHTML=arrayCarritoUnico.map(producto =>
        `<div>
            <div class="contenedor-imagen">
                <img  src="${producto.img}" alt="${producto.nombre}" class="imagen-carrito" >
            </div>
            <p>${producto.nombre}</p>
            <p>${producto.precio}</p>
            <button class="boton-agregar" id="boton-agregar-${producto.nombre}">+</button>
            <p id="cantidad-${producto.nombre}">${producto.cantidad}</p>
            <button class="boton-borrar" id="boton-borrar-${producto.nombre}">-</button>
        </div>
        <hr>`);
    
    let stringCarritoUnicoHTML=arrayCarritoUnicoHTML.join("");
    const total=arrayCarritoUnico.reduce((acumulador,elemento)=>acumulador + elemento.precio*elemento.cantidad,0);
    stringCarritoUnicoHTML +=`<p>TOTAL:${total}</p>`;
    zonaCarrito.innerHTML=stringCarritoUnicoHTML;
}

function crearEscuchadorBotonAgregar(texto){
    //arrayCarrito=JSON.parse(localStorage.getItem("Carrito"));
    let zonaCantidad=document.getElementById("cantidad-"+texto);
    let boton=document.getElementById(`boton-agregar-${texto}`);
    boton.addEventListener("click",()=>{
        let arrayCarrito=JSON.parse(localStorage.getItem("Carrito"));
        arrayProteinas.forEach(proteina=>{
            if(proteina.nombre===texto){
                arrayCarrito.push(structuredClone(proteina));
            }
        });
        arrayCreatinas.forEach(creatina=>{
            if(creatina.nombre===texto){
                arrayCarrito.push(structuredClone(creatina));
            }
        });
        arrayShakers.forEach(shacker=>{
            if(shacker.nombre===texto){
                arrayCarrito.push(structuredClone(shacker));
            }
        });
        let CarritoJSON=JSON.stringify(arrayCarrito);
        localStorage.setItem("Carrito",CarritoJSON);

        let posicion;
        arrayCarritoUnico.forEach((producto,indice)=>{
            if(producto.nombre===texto){
                producto.cantidad += 1;
                posicion=producto.cantidad;
            }
        });

        zonaCantidad.innerHTML=posicion;
    });
}

function crearEscuchadorBotonBorrar(texto){
    let zonaCantidad=document.getElementById("cantidad-"+texto);
    let boton=document.getElementById("boton-borrar-"+texto);
    boton.addEventListener("click",()=>{
        let JSONCarrito=localStorage.getItem("Carrito");
        if(JSONCarrito!==null){
            let arrayCarritoBorrar=JSON.parse(JSONCarrito);
            for (let i = 0; i < arrayCarritoBorrar.length; i++) {
                if(arrayCarritoBorrar[i].nombre===texto){
                    arrayCarritoBorrar.splice(i,1);
                    break;
                }  
            }   
            localStorage.setItem("Carrito",JSON.stringify(arrayCarritoBorrar));
        }
        
        let posicion=0;
        arrayCarritoUnico.forEach((producto,indice)=>{
            if(producto.nombre===texto && producto.cantidad>=1){
                producto.cantidad -= 1;
                posicion=producto.cantidad;
            }
        });

        zonaCantidad.innerHTML=posicion;
    });

}
console.table(arrayCreatinas);
console.table(arrayProteinas);
console.table(arrayShakers);
crearCarrito();
arrayCarritoUnico.forEach(producto=>crearEscuchadorBotonAgregar(producto.nombre));
arrayCarritoUnico.forEach(producto=>crearEscuchadorBotonBorrar(producto.nombre));