import { Router } from 'express';
import {
    getProfesores,
    getProfesorById,
    createProfesor,
    updateProfesor,
    deleteProfesor
} from '../controllers/profesores.controller.js';

const router = Router();

router.get('/', getProfesores); 
router.get('/:id', getProfesorById);
router.post('/', createProfesor); 
router.put('/:id', updateProfesor); 
router.delete('/:id', deleteProfesor); 

export default router;
