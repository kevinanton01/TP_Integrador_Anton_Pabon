import productModels from "../models/product.models.js";


export const getAllProducts = async (req,res)=>{
    //optimizacion 1: manejar errores con try catch
    try {
        const [rows] = await productModels.selectAllProducts();
        //optimizacion 4: devolvemos error 404 si no hay productos
        if(rows.length===0){
            return res.status(404).json({
                mensaje: "no se encontraron productos"
            });
        }
        res.status(200).json(
            {payload: rows}
        );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "error interno del servidor al obtener productos"
        });
    }
}


export const getAllProductsAdmin = async (req,res)=>{
    //optimizacion 1: manejar errores con try catch
    try {
        const [rows] =await productModels.selectAllProductsAdmin();
        //optimizacion 4: devolvemos error 404 si no hay productos
        if(rows.length===0){
            return res.status(404).json({
                mensaje: "no se encontraron productos"
            });
        }
        res.status(200).json(
            {payload: rows}
        );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "error interno del servidor al obtener productos"
        });
    }
}


export const getProductById = async (req,res)=>{
    //optimizacion 1 manejamos errores con try catch
    try {
        
        //gracias al middleware validarId valido el id que escribimos en la ruta y lo guardo en req.id
        const [rows] = await productModels.selectProductById(req.id);
        //optimizacion 4: devolvemos error 404 si no hay productos en rows
        if(rows.length===0){
            return res.status(404).json({
                mensaje: `no se encontraron productos con id ${req.id}`
            });
        }

        res.status(200).json(
            {payload: rows}
        );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        mensaje: "error interno del servidor al obtener productos"
        });
    }
}


export const createProduct = async (req,res)=>{
    //optimizacion 1: agregamos manejo de errores con try catch
    const producto=req.body;
    //optimizacion 3: sanitizamos los strings antes de insertarlos
    const cleanName=producto.nombre.trim();
    
    try {
        const [rows]=await productModels.generateProduct(cleanName,producto.imagen,producto.precio,producto.categoria,producto.activo);
        //optimizacion 4: vamos a almacenar en rows el id del nuevo producto
        //optimizacion 5: en lugar de devolver un codigo de estado 200 corresponde devolver el codigo de estado 201
        res.status(201).json(
            {mensaje: `producto creado con exito con id ${rows.insertId}`,
            productId: rows.insertId  //id del producto insertado 
            
            }
        );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        mensaje: "error interno del servidor al crear productos"
        });
    }
}


export const removeProduct = async (req,res)=>{    
    //optimizacion 1: incorporamos manejo de errores con try catch
    //el middleware de ruta validarId ya valida el id que se paso en la ruta  y lo guarda en req.id
    try {
        await productModels.deleteProduct(req.id);
        res.status(200).json(
            {mensaje: `Producto con id ${req.id} se ha eliminado correctamente`}
        );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        mensaje: "error interno del servidor al eliminar productos"
        });
    }
}


export const activeProduct = async (req,res)=>{
    const id=req.body.id;

    await productModels.enableProduct(id);
    res.status(200).json(
        {mensaje: "producto activado con exito"}
    );
}


export const modifyProduct = async (req,res)=>{
    
    const datosIngresados=req.body;
    //optimizacion 1: agregamos manejo de errores con try catch
    try {
        const [rows]=await productModels.editProduct(datosIngresados.nombre,datosIngresados.categoria,datosIngresados.precio,datosIngresados.imagen,datosIngresados.activo,datosIngresados.id);
        //optimizacion 2: verificamos si realmente se actualizo algo porque podemos darle a enviar y no actualizamos nada no cambiamos ningun campo
        if(rows.affectedRows===0){
            return res.status(404).json({
                mensaje: "no se actualizo el producto"
            });
        }
        
        res.status(200).json(
            {mensaje: "producto modificado con exito"}
        );
        
    } catch (error) {
        console.log(error);
        //optimizacion 3: devolvemos errores 500
        res.status(500).json({
            mensaje: "error interno del servidor al modificar productos"
        });
    }
}