import express from "express";

//import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { /*authRoutes, */productRoutes, viewRoutes } from "./src/api/routes/index.js";
import { __dirname, join } from "./src/api/utils/index.js";

import environments from "./src/api/config/environments.js";
import cors from "cors";
const app=express();
const port=parseInt(environments.port);

////////////////////
// Middlewares
//middleware de de aplicacion(middlewares que se ejecutan en todas las solicitudes)
app.use(cors());
app.use(express.json());
// Middleware para servir archivos estaticos
app.use(express.static(join(__dirname, "src/public"))); // Estoy diciendole a la app la ruta de donde va a servir archivos estaticos


////////////////////
// Endpoints

app.use("/api/productos", productRoutes);


// Configuramos EJS como motor de plantillas
app.set("view engine", "ejs"); 
app.set("views", join(__dirname, "src/views"));


// Rutas de vistas
app.use("/dashboard", viewRoutes);

//app.use("/login", authRoutes);


app.listen(port,()=>{
    console.log("servidor activo en el puerto "+port);
})