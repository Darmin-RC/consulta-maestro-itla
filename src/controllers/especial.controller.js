import pool from '../db/database.js';
import { v4 as uuidv4 } from 'uuid';

export const asignarMateriaAProfesor = async (req, res) => {
    const { id } = req.params; // ID del profesor
    const { materia_id } = req.body; // ID de la materia
    try {
        await pool.query(
            `INSERT INTO ProfesorMateria (id, profesor_id, materia_id) VALUES (?, ?, ?)`,
            [uuidv4(), id, materia_id]
        );
        res.status(201).json({ message: 'Materia asignada al profesor correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al asignar la materia al profesor', error: error.message });
    }
};

export const listarMateriasPorProfesor = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            `SELECT m.id, m.nombre 
             FROM ProfesorMateria pm
             JOIN Materia m ON pm.materia_id = m.id
             WHERE pm.profesor_id = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron materias para este profesor' });
        }
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar las materias del profesor', error: error.message });
    }
};

export const eliminarRelacionProfesorMateria = async (req, res) => {
    const { id, materiaId } = req.params; // ID del profesor y de la materia
    try {
        const [result] = await pool.query(
            `DELETE FROM ProfesorMateria WHERE profesor_id = ? AND materia_id = ?`,
            [id, materiaId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }
        res.status(200).json({ message: 'Relación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la relación', error: error.message });
    }
};

export const listarProfesoresPorMateria = async (req, res) => {
    const { id } = req.params; // ID de la materia
    try {
        const [rows] = await pool.query(
            `SELECT p.id, p.nombre 
             FROM ProfesorMateria pm
             JOIN Profesor p ON pm.profesor_id = p.id
             WHERE pm.materia_id = ?`,
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron profesores para esta materia' });
        }
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar los profesores de la materia', error: error.message });
    }
};

export const crearRelacionProfesorMateria = async (req, res) => {
    const { profesor_id, materia_id } = req.body; // IDs del profesor y la materia
    try {
        const [exists] = await pool.query(
            `SELECT * FROM ProfesorMateria WHERE profesor_id = ? AND materia_id = ?`,
            [profesor_id, materia_id]
        );
        if (exists.length > 0) {
            return res.status(400).json({ message: 'Esta relación ya existe' });
        }
        await pool.query(
            `INSERT INTO ProfesorMateria (id, profesor_id, materia_id) VALUES (?, ?, ?)`,
            [uuidv4(), profesor_id, materia_id]
        );
        res.status(201).json({ message: 'Relación creada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la relación', error: error.message });
    }
};
