// src/routes/resenas.routes.js
import { Router } from 'express';
import {
    getResenas,
    getResenaById,
    createResena,
    updateResena,
    deleteResena
} from '../controllers/resenas.controller.js';

const router = Router();

// Rutas para reseñas
router.get('/', getResenas);
router.get('/:id', getResenaById);
router.post('/', createResena);
router.put('/:id', updateResena);
router.delete('/:id', deleteResena);

export default router;
