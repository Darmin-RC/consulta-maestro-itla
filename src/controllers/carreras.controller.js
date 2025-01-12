import pool from '../db/database.js';
import { v4 as uuidv4 } from 'uuid';

export const crearCarrera = async (req, res) => {
    const { nombre } = req.body;
    const id = uuidv4();
    try {
        const result = await pool.query('INSERT INTO Carrera (id, nombre) VALUES (?, ?)', [id, nombre]);
        res.status(201).json({ id, nombre});
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la carrera', error });
    }
};

export const obtenerCarreras = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Carrera');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las carrera', error });
    }
};

export const obtenerCarreraPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Carrera WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Carrera no encontrada' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la carrera', error });
    }
};

export const actualizarCarrera = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const result = await pool.query('UPDATE Carrera SET nombre = ? WHERE id = ?', [nombre, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Carrera no encontrada' });
        res.status(200).json({ id, nombre });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la carrera', error });
    }
};

export const eliminarCarrera = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Carrera WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Carrera no encontrada' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la carrera', error });
    }
};
