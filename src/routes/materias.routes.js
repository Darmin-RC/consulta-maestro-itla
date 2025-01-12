import { Router } from "express";
import {
    obtenerMaterias,
    actualizarMateria,
    eliminarMateria,
    crearMateria,
    obtenerMateriaPorId
} from "../controllers/materias.controller.js";

const router = Router();

router.get('/', obtenerMaterias);
router.get('/:id', obtenerMateriaPorId);
router.post('/', crearMateria);
router.put('/:id', actualizarMateria);
router.delete('/:id', eliminarMateria);

export default router;