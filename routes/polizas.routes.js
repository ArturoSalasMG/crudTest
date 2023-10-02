import { Router } from "express"; //importan modulo rutas de express
import {
    crearPoliza,
    obtenerPoliza,
    obtenerPolizas,
    borrarPoliza,
    actualizarPoliza
} from "../controllers/polizas.controller.js";

const router = Router();

router.get('/polizas', obtenerPoliza);
router.get('/polizas', obtenerPolizas);
router.post('/polizas', crearPoliza);
router.delete('/polizas', borrarPoliza);
router.patch('/polizas', actualizarPoliza);


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