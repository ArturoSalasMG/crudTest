import { Router } from "express"; //importan modulo rutas de express
import {
    obtenerPolizas,
    obtenerPoliza,
    borrarPolizas,
    crearPolizas,
    actualizarPolizas
} from "../controllers/polizas.controller.js";

const router = Router();

//GET ALL   
router.get('/polizas', obtenerPolizas);
// GET AN 
router.get('/polizas/:id', obtenerPoliza);
// DELETE AN
router.delete('/polizas/:id', borrarPolizas);
// CREATE AN 
router.post('/polizas', crearPolizas);
// UPDATE
router.patch('/polizas/:id', actualizarPolizas);

export default router;