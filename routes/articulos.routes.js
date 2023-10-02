import { Router } from "express"; //importan modulo rutas de express
import {
    crearArticulo,
    obtenerArticulo,
    obtenerArticulos,
    borrarArticulo,
    actualizarArticulo
} from "../controllers/articulos.controller.js";

const router = Router();

router.get('/articulos', obtenerArticulos);
router.get('/articulos/:id', obtenerArticulo);
router.delete('/articulos', borrarArticulo);
router.post('/articulos/:id', crearArticulo);
router.patch('/articulos/:id', actualizarArticulo);


/*
Ruta para polizas
app.get('/api/poliza', (req, res)=>{
    pool.query('SELECT * FROM poliza', (error, filas) => {
        if(error){
            throw error;
        }else {
            res.send(filas);
        }
    })
});

*/
export default router;