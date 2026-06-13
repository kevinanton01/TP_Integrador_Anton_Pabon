import express from "express";
import connection from "./src/database/db.js";
import cors from "cors";
const app=express();

app.use(cors());
app.use(express.json());

app.get("/api/productos",async (req,res)=>{
    const [rows] =await connection.query("SELECT * FROM productos");
    res.status(200).json(
        {payload: rows}
    );
});

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
});


app.listen(3000,()=>{
    console.log("servidor activo");
})