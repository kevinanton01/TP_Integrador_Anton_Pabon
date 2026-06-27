import express from "express";
import connection from "./src/api/database/db.js";
import environments from "./src/api/config/environments.js";
import cors from "cors";
const app=express();
const port=parseInt(environments.port);
//middleware de de aplicacion(middlewares que se ejecutan en todas las solicitudes)
app.use(cors());
app.use(express.json());
//middleware de ruta(middlewares que solo se aplican en algunos endpoints no en todos)
//los middleware de ruta se usan en algunas rutas y en otras no
const validarId=(req,res,next)=>{
    const id=Number(req.params.id);
    //entra al if si id no es un entero o si id es menor o igual a cero
    if(!Number.isInteger(id) || id<=0){
        return res.status(400).json({
            mensaje: "el id debe ser un numero entero positivo"
        });
        //aca al objeto req le creamos una clave id con el valor del id 
        
    }
    req.id=id;
    next();
}

//middleware de ruta para validar los campos de un formulario(no validamos las imagenes)
const categoriasValidas=["proteina","creatina","shaker"]
const validarCampos=(req,res,next)=>{
    console.log(req.body); // ← agregá esto
    console.log(typeof req.body.precio); // ← y esto
    const {nombre,imagen,categoria,precio}=req.body.productoNuevo; //recogemos los datos del body
    let errores=[];         //creamos un array vacio que va a contener errores
    //validamos los datos ingresados en el formulario
    if(!nombre || !imagen || !categoria || !precio){
        errores.push("Asegurate de llenar todos los campos");    
    }
    if(typeof nombre !== "string" || nombre.trim().length < 2){
        errores.push("el nombre debe tener al menos dos caracteres");    
    }
    //el precio lo parsearemos previamente en el cliente
    if(typeof precio !== "number" || precio<=0){
        errores.push("el precio debe ser un numero mayor a cero");
    }
    //no validaremos imagen porque luego usaremos multer
    if(!categoriasValidas.includes(categoria)){
        errores.push("categoria invalida");
    }

    //ahora detectamos si existe algun error en el array error y de haber algun error en el array devolvemos un estado 400
    if(errores.length>0){
        return res.status(400).json({
                mensaje:"Datos invalidos",
                errores: errores
            }); 

    }


    next();


}

app.get("/api/productos",async (req,res)=>{
    //optimizacion 3: extraemos la consulta sql en una variable y le quitamos el select * para evitar poner columnas innecesarias
    const sql="SELECT id,imagen,nombre,categoria,precio FROM productos WHERE activo=1";
    //optimizacion 1: manejar errores con try catch
    try {
        const [rows] =await connection.query(sql);
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
});


app.get("/api/productos/mostrar-admin",async (req,res)=>{
    //optimizacion 3: extraemos la consulta sql en una variable y le quitamos el select * para evitar poner columnas innecesarias
    const sql="SELECT id,imagen,nombre,categoria,precio,activo FROM productos";
    //optimizacion 1: manejar errores con try catch
    try {
        const [rows] =await connection.query(sql);
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
});



app.get("/api/productos/:id",validarId,async (req,res)=>{
    
    //optimizacion 1 manejamos errores con try catch
    try {
        //aplicamos la optimizacion 3
        const sql="SELECT id,imagen,nombre,categoria,precio FROM productos WHERE productos.id = ?"
        //gracias al middleware validarId valido el id que escribimos en la ruta y lo guardo en req.id
        const [rows] = await connection.query(sql, [req.id]);
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
});


app.post("/api/productos",validarCampos,async (req,res)=>{
    //optimizacion 1: agregamos manejo de errores con try catch
    const producto=req.body;
    //optimizacion 3: sanitizamos los strings antes de insertarlos
    const cleanName=producto.nombre.trim();
    const sql=`INSERT INTO productos(nombre,categoria,precio,imagen,activo) VALUES(?,?,?,?,?)`;
    try {
        const [rows]=await connection.query(sql,[cleanName,producto.categoria,producto.precio,producto.imagen,true]);
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

});

app.put("/api/productos/:id",validarId,async (req,res)=>{
    
    const sql="UPDATE productos SET activo=0 where id=?"
    //optimizacion 1: incorporamos manejo de errores con try catch
    //el middleware de ruta validarId ya valida el id que se paso en la ruta  y lo guarda en req.id
    try {
        await connection.query(sql,[req.id]);
        res.status(200).json(
            {mensaje: `Producto con id ${req.id} se ha eliminado correctamente`}
        );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        mensaje: "error interno del servidor al eliminar productos"
        });
    }

});

app.put("/api/activar-productos",async (req,res)=>{
    const id=req.body.id;
    const sql="UPDATE productos SET activo=1 where id=?"

    await connection.query(sql,[id]);
    res.status(200).json(
        {mensaje: "producto activado con exito"}
    );
});

app.put("/api/modificar-producto",validarCampos,async (req,res)=>{
    const idAnterior=req.body.productoViejo.id;
    const objetoNuevo=req.body.productoNuevo;
    const sql="UPDATE productos SET nombre=?,categoria=?,precio=?,imagen=? where id=?";
    //optimizacion 1: agregamos manejo de errores con try catch
    try {
        const [rows]=await connection.query(sql,[objetoNuevo.nombre,objetoNuevo.categoria,objetoNuevo.precio,objetoNuevo.imagen,idAnterior]);
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
});






app.listen(port,()=>{
    console.log("servidor activo en el puerto "+port);
})