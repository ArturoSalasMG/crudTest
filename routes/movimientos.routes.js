import { Router } from "express"; //importan modulo rutas de express
import {
    obtenerMovimientos,
    obtenerMovimiento,
    borrarMovimientos,
    crearMovimientos,
    actualizarMovimientos
} from "../controllers/movimientos.controller.js";

const router = Router();

// CREATE AN 
router.post('/movimientos', crearMovimientos);
//GET ALL   
router.get('/movimientos', obtenerMovimientos);
// GET AN 
router.get('/movimientos/:id', obtenerMovimiento);
// UPDATE
router.patch('/movimientos/:id', actualizarMovimientos);
// DELETE AN
router.get('/movimientos/delete/:id', borrarMovimientos);

export default router;