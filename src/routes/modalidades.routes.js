// src/routes/modalidades.routes.js
import { Router } from 'express';
import {
    getModalidades,
    getModalidadById,
    deleteModalidad
} from '../controllers/modalidades.controller.js';

const router = Router();

// Rutas para modalidades
router.get('/', getModalidades);
router.get('/:id', getModalidadById);
router.delete('/:id', deleteModalidad);

export default router;
