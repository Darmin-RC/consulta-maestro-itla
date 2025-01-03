// src/routes/secciones.routes.js
import { Router } from 'express';
import {
    getSecciones,
    getSeccionById,
    createSeccion,
    updateSeccion,
    deleteSeccion
} from '../controllers/secciones.controller.js';

const router = Router();

// Rutas para secciones
router.get('/', getSecciones);
router.get('/:id', getSeccionById);
router.post('/', createSeccion);
router.put('/:id', updateSeccion);
router.delete('/:id', deleteSeccion);

export default router;
