import { Router } from "express"; //importan modulo rutas de express
import {
    obtenerPolizas,
    obtenerPoliza,
    borrarPolizas,
    crearPolizas,
    actualizarPolizas
} from "../controllers/polizas.controller.js";

const router = Router();

// CREATE AN 
router.post('/polizas', crearPolizas);
//GET ALL   
router.get('/polizas', obtenerPolizas);
// GET AN 
router.get('/polizas/:id', obtenerPoliza);
// UPDATE
router.patch('/polizas/:id', actualizarPolizas);
// DELETE AN
router.get('/polizas/:id', borrarPolizas);

export default router;