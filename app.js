import express from "express";
import morgan from "morgan";

//importar Rutas
import articulosRoutes from "./routes/articulos.routes.js";
//import polizasRoutes from "./routes/polizas.routes.js";
//import movimientosRoutes from "./routes/movimientos.routes.js";

//se crea el servidor
const app = express(); 
//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//RUTAS
app.use("/api", articulosRoutes);
//app.use("/api", polizasRoutes);
//app.use("/api", movimientosRoutes);

//Rutas no encontradas
app.get('*', function(req, res){
    res.end('<h1>Ruta no encontrada</h1>');
});
app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
});

//Servidor corriendo en puerto 3000
app.listen(`3000`, function(){
    console.log("Servidor OK");
})

export default app;