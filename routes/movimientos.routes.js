import { Router } from "express"; //importan modulo rutas de express
import {
    crearMovimientos,
    obtenerMovimientos,
    obtenerMovimiento,
    borrarMovimientos,
    actualizarMovimientos
} from "../controllers/movimientos.controller.js";

const router = Router();

router.get('/movimientos', obtenerMovimientos);
router.get('/movimientos', obtenerMovimiento);
router.post('/movimientos', crearMovimientos);
router.delete('/movimientos', borrarMovimientos);
router.patch('/movimientos', actualizarMovimientos);


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