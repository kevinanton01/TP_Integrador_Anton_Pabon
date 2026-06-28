import { productRoutes } from "./src/api/routes/index.js";

import express from "express";

import environments from "./src/api/config/environments.js";
import cors from "cors";
const app=express();
const port=parseInt(environments.port);


////////////////////
// Middlewares
//middleware de de aplicacion(middlewares que se ejecutan en todas las solicitudes)
app.use(cors());
app.use(express.json());





////////////////////
// Endpoints

app.use("/api/productos", productRoutes);







app.listen(port,()=>{
    console.log("servidor activo en el puerto "+port);
})