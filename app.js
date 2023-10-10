import express from "express";
import morgan from "morgan";
import cors from "cors";
//importar path de vistas
import {dirname, join} from 'path';
import { fileURLToPath } from "url";
import methodOverride from "method-override";
//importar Rutas
import articulosRoutes from "./routes/articulos.routes.js";
import polizasRoutes from "./routes/polizas.routes.js";
//import movimientosRoutes from "./routes/movimientos.routes.js";

//se crea el servidor
const app = express(); 

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(methodOverride('_method'));
//Motor de platilla
app.set('view engine', 'ejs');
const __dirname = dirname(fileURLToPath(import.meta.url));
 join(__dirname, 'views');
app.set('views', join(__dirname, '/views'));
app.use(express.static(__dirname + "/public"));

//RUTAS
app.use("/api", articulosRoutes); // 3000/api/articulos
app.use("/api", polizasRoutes);
//app.use("/api", movimientosRoutes);

app.get('/',function(req, res){
    res.render('prueba', {tituloWeb: "Pagina principal"});
}); 

//Rutas no encontradas
app.get('*', function(req, res){
    res.end('<h1>Ruta no encontrada</h1>');
});
// ruta 404
app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
});

//Servidor corriendo en puerto 3000
app.listen(`3000`, function(){
    console.log("Servidor OK");
})

export default app;