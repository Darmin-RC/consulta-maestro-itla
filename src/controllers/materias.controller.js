import pool from '../db/database.js';
import { v4 as uuidv4 } from 'uuid';

export const crearMateria = async (req, res) => {
    const { nombre, horario, seccion, modalidad } = req.body;
    const id = uuidv4();
    try {
        const result = await pool.query('INSERT INTO Materia (id, nombre, horario, seccion, modalidad) VALUES (?, ?, ?, ?, ?)', [id, nombre, horario, seccion, modalidad]);
        res.status(201).json({ id, nombre, horario, seccion, modalidad });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la materia', error });
    }
};

export const obtenerMaterias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Materia');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las materias', error });
    }
};

export const obtenerMateriaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Materia WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Materia no encontrada' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la materia', error });
    }
};

export const actualizarMateria = async (req, res) => {
    const { id } = req.params;
    const { nombre, horario, seccion, modalidad } = req.body;
    try {
        const result = await pool.query('UPDATE Materia SET nombre = ?, horario = ?, seccion = ?, modalidad = ? WHERE id = ?', [nombre, horario, seccion, modalidad, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Materia no encontrada' });
        res.status(200).json({ id, nombre, horario, seccion, modalidad });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la materia', error });
    }
};

export const eliminarMateria = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Materia WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Materia no encontrada' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la materia', error });
    }
};
