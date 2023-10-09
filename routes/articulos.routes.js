import { Router } from "express"; //importan modulo rutas de express
import {
    obtenerArticulos,
    obtenerArticulo,
    borrarArticulo,
    crearArticulo,
    actualizarArticulo
} from "../controllers/articulos.controller.js";

const router = Router();

// CREATE AN 
router.post('/articulos', crearArticulo);
//GET ALL   
router.get('/articulos', obtenerArticulos);
// GET AN 
router.get('/articulos/:id', obtenerArticulo);
// UPDATE
router.patch('/articulos/:id', actualizarArticulo);
// DELETE AN
router.get('/articulos/delete/:id', borrarArticulo);

export default router;