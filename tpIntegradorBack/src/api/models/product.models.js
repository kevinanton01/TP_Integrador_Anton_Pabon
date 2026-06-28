import connection from "../database/db.js";

////////////////////
// Seleccionar todos los productos
const selectAllProducts = () => {
    const sql="SELECT id,imagen,nombre,categoria,precio FROM productos WHERE activo=1";

    // Con el destructuring separamos los resultados (rows) y la metadata (field)
    return connection.query(sql);
}


////////////////////
const selectAllProductsAdmin = () => {
    //optimizacion 3: extraemos la consulta sql en una variable y le quitamos el select * para evitar poner columnas innecesarias
    const sql="SELECT id,imagen,nombre,categoria,precio,activo FROM productos";
    
    return connection.query(sql);
}


////////////////////
const selectProductById = (id) => {
    //aplicamos la optimizacion 3
    const sql="SELECT id,imagen,nombre,categoria,precio FROM productos WHERE productos.id = ?"
    
    return connection.query(sql, [id]);
}


////////////////////
const generateProduct = (nombre, imagen, precio, categoria,activo) => {
   const sql=`INSERT INTO productos(nombre,categoria,precio,imagen,activo) VALUES(?,?,?,?,?)`;
    
    return connection.query(sql, [nombre, categoria, precio, imagen,true]); 
}


////////////////////
// Eliminar producto
const deleteProduct = (id) => {
    const sql="UPDATE productos SET activo=0 where id=?"
        
    return connection.query(sql, [id]);
}


////////////////////
const enableProduct = (id) => {
    const sql="UPDATE productos SET activo=1 where id=?"
        
    return connection.query(sql, [id]);
}


////////////////////
const editProduct = (nombre,categoria,precio,imagen,activo,id) => {
    const sql="UPDATE productos SET nombre=?,categoria=?,precio=?,imagen=?,activo=? where id=?";
        
    return connection.query(sql, [nombre,categoria,precio,imagen,activo,id]);
}


export default {
    selectAllProducts,
    selectAllProductsAdmin,
    selectProductById,
    generateProduct,
    deleteProduct,
    enableProduct,
    editProduct
}