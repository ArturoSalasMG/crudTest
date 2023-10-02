import { Router } from "express"; //importan modulo rutas de express
import {
    obtenerArticulos,
    obtenerArticulo,
    borrarArticulo,
    crearArticulo,
    actualizarArticulo
} from "../controllers/articulos.controller.js";

const router = Router();

//GET ALL   
router.get('/articulos', obtenerArticulos);
// GET AN 
router.get('/articulos/:id', obtenerArticulo);
// DELETE AN
router.delete('/articulos/:id', borrarArticulo);
// CREATE AN 
router.post('/articulos', crearArticulo);
// UPDATE
router.patch('/articulos/:id', actualizarArticulo);

export default router;