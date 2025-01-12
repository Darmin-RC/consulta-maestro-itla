import { Router } from "express";
import {
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
    obtenerEstudiantes,
    obtenerEstudiantePorId
} from "../controllers/estudiantes.controller.js";

const router = Router();

router.get('/', obtenerEstudiantes);
router.get('/:id', obtenerEstudiantePorId);
router.post('/', crearEstudiante);
router.put('/:id', actualizarEstudiante);
router.delete('/:id', eliminarEstudiante);

export default router;