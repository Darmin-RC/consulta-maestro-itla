import express from 'express';
import {
    asignarMateriaAProfesor,
    listarMateriasPorProfesor,
    eliminarRelacionProfesorMateria,
    listarProfesoresPorMateria,
    crearRelacionProfesorMateria
} from '../controllers/especial.controller.js';

const router = express.Router();

// Ruta para asignar una materia a un profesor
router.post('/profesor/:id/materia', asignarMateriaAProfesor);

// Ruta para listar las materias asignadas a un profesor
router.get('/profesor/:id/materias', listarMateriasPorProfesor);

// Ruta para eliminar la relación entre un profesor y una materia
router.delete('/profesor/:id/materia/:materiaId', eliminarRelacionProfesorMateria);

// Ruta para listar los profesores asignados a una materia
router.get('/materia/:id/profesores', listarProfesoresPorMateria);

// Ruta para crear una relación entre un profesor y una materia
router.post('/profesor-materia', crearRelacionProfesorMateria);

export default router;
