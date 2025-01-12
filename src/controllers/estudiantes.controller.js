import pool from '../db/database.js';
import { v4 as uuidv4 } from 'uuid';

export const crearEstudiante = async (req, res) => {
    const { nombre, email } = req.body;
    const id = uuidv4();
    try {
        const result = await pool.query('INSERT INTO Estudiante (id, nombre, email) VALUES (?, ?, ?)', [id, nombre, email]);
        res.status(201).json({ id, nombre, email });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el estudiante', error });
    }
};

export const obtenerEstudiantes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Estudiante');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los estudiantes', error });
    }
};

export const obtenerEstudiantePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Estudiante WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el estudiante', error });
    }
};

export const actualizarEstudiante = async (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    try {
        const result = await pool.query('UPDATE Estudiante SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
        res.status(200).json({ id, nombre, email });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estudiante', error });
    }
};

export const eliminarEstudiante = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Estudiante WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el estudiante', error });
    }
};
