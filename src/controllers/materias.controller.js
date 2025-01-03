import pool from '../db/database.js';
import { v4 as uuidv4 } from 'uuid'; // Generación de UUID

// Obtener todas las materias
export const getMaterias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM materias');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener materias:', error);
        res.status(500).json({ message: 'Error al obtener materias' });
    }
};

// Obtener una materia por ID
export const getMateriaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM materias WHERE MateriaID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener la materia:', error);
        res.status(500).json({ message: 'Error al obtener la materia' });
    }
};

// Crear una nueva materia
export const createMateria = async (req, res) => {
    console.log(req.body); // Agregar este log para verificar el cuerpo de la solicitud
    const { maestroID, nombre, seccion, horario, modalidad } = req.body;

    if (!maestroID) {
        return res.status(400).json({ message: 'El maestroID es requerido' });
    }

    // Validar campos requeridos
    if (!nombre || !seccion || !horario || !modalidad) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Validar modalidad
    const validModalities = ['Presencial', 'Virtual', 'Híbrido'];
    if (!validModalities.includes(modalidad)) {
        return res.status(400).json({ message: 'Modalidad no válida' });
    }

    try {
        const MateriaID = uuidv4(); // Generar UUID para MateriaID
        const [result] = await pool.query(
            'INSERT INTO materias (MateriaID, MaestroID, Nombre, Seccion, Horario, Modalidad) VALUES (?, ?, ?, ?, ?, ?)', 
            [MateriaID, maestroID, nombre, seccion, horario, modalidad] // Usar modalidad
        );
        res.status(201).json({ MateriaID, maestroID, nombre, seccion, horario, modalidad });
    } catch (error) {
        console.error('Error al crear la materia:', error);
        res.status(500).json({ message: 'Error al crear la materia' });
    }
};

// Actualizar una materia existente
export const updateMateria = async (req, res) => {
    const { id } = req.params;
    const { maestroID, nombre, seccion, horario, modalidad } = req.body;

    // Validar modalidad
    const validModalities = ['Presencial', 'Virtual', 'Híbrido'];
    if (modalidad && !validModalities.includes(modalidad)) {
        return res.status(400).json({ message: 'Modalidad no válida' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE materias SET MaestroID = ?, Nombre = ?, Seccion = ?, Horario = ?, Modalidad = ? WHERE MateriaID = ?', 
            [maestroID, nombre, seccion, horario, modalidad, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.json({ MateriaID: id, maestroID, nombre, seccion, horario, modalidad });
    } catch (error) {
        console.error('Error al actualizar la materia:', error);
        res.status(500).json({ message: 'Error al actualizar la materia' });
    }
};

// Eliminar una materia por ID
export const deleteMateria = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM materias WHERE MateriaID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar la materia:', error);
        res.status(500).json({ message: 'Error al eliminar la materia' });
    }
};
