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
   
    const {nombre,imagen,categoria,precio}=req.body; //recogemos los datos del body        
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

// Middleware simple de proteccion de rutas
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/login")
    }

    next();
}

export{
    validarId,
    validarCampos,
    requireLogin
}