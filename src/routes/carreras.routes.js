// src/routes/carreras.routes.js
import { Router } from 'express';
import {
    getCarreras,
    getCarreraById,
    createCarrera,
    updateCarrera,
    deleteCarrera
} from '../controllers/carreras.controller.js';

const router = Router();

// Rutas para carreras
router.get('/', getCarreras); // Obtener todas las carreras
router.get('/:id', getCarreraById); // Obtener carrera por ID
router.post('/', createCarrera); // Crear nueva carrera
router.put('/:id', updateCarrera); // Actualizar carrera por ID
router.delete('/:id', deleteCarrera); // Eliminar carrera por ID

export default router;
