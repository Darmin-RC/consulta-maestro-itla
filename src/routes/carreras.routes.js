import { Router } from "express";
import {
    obtenerCarreras,
    actualizarCarrera,
    eliminarCarrera,
    crearCarrera,
    obtenerCarreraPorId
} from "../controllers/carreras.controller.js";

const router = Router();

router.get('/', obtenerCarreras);
router.get('/:id', obtenerCarreraPorId);
router.post('/', crearCarrera);
router.put('/:id', actualizarCarrera);
router.delete('/:id', eliminarCarrera);

export default router;