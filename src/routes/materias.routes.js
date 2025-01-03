// src/routes/materias.routes.js
import { Router } from 'express';
import {
    getMaterias,
    getMateriaById,
    createMateria,
    updateMateria,
    deleteMateria
} from '../controllers/materias.controller.js';

const router = Router();

// Rutas para materias
router.get('/', getMaterias);
router.get('/:id', getMateriaById);
router.post('/', createMateria);
router.put('/:id', updateMateria);
router.delete('/:id', deleteMateria);

export default router;
