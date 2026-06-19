import express from "express";
import connection from "./src/api/database/db.js";
import environments from "./src/api/config/environments.js";
import cors from "cors";
const app=express();
const port=parseInt(environments.port);
app.use(cors());
app.use(express.json());

app.get("/api/productos",async (req,res)=>{
    const [rows] =await connection.query("SELECT * FROM productos");
    res.status(200).json(
        {payload: rows}
    );
});
/*
app.get("/api/ventas-productos",async (req,res)=>{
    const [rows] =await connection.query("SELECT productos.id,productos.nombre,productos.imagen,productos.categoria,productos.precio,productos.activo  FROM productos JOIN ventas_productos ON productos.id = ventas_productos.id_producto");
    res.status(200).json(
        {payload: rows}
    );
});

app.get("/api/ventas-productos/:id",async (req,res)=>{
    const id = req.params.id;
    const [rows] = await connection.query("SELECT * FROM productos where productos.id = ?", [id]);
    res.status(200).json(
        {payload: rows}
    );
});*/

app.get("/api/productos/:id",async (req,res)=>{
    const id = req.params.id;
    const [rows] = await connection.query("SELECT * FROM productos where productos.id = ?", [id]);
    res.status(200).json(
        {payload: rows}
    );
});


app.post("/api/productos",async (req,res)=>{
    const producto=req.body;

    await connection.query(`INSERT INTO productos(nombre,categoria,precio,imagen,activo)
    VALUES("${producto.nombre}","${producto.categoria}",${producto.precio},"${producto.imagen}",TRUE)`);
    res.status(200).json(
        {mensaje: "producto creado con exito"}
    );
});

app.put("/api/productos",async (req,res)=>{
    const id=req.body.id;
    const sql="UPDATE productos SET activo=0 where id=?"

    await connection.query(sql,[id]);
    res.status(200).json(
        {mensaje: "producto borrado con exito"}
    );
});

app.put("/api/activar-productos",async (req,res)=>{
    const id=req.body.id;
    const sql="UPDATE productos SET activo=1 where id=?"

    await connection.query(sql,[id]);
    res.status(200).json(
        {mensaje: "producto activado con exito"}
    );
});

app.put("/api/modificar-producto",async (req,res)=>{
    const idAnterior=req.body.idAnterior;
    const objetoNuevo=req.body.producto;
    const sql="UPDATE productos SET id=? where id=?"

    await connection.query(sql,[id]);
    res.status(200).json(
        {mensaje: "producto modificado con exito"}
    );
});






app.listen(port,()=>{
    console.log("servidor activo en el puerto "+port);
})