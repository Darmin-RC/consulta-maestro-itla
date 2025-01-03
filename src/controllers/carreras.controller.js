import { v4 as uuidv4 } from 'uuid';
import pool from '../db/database.js';

// Obtener todas las carreras
export const getCarreras = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM carreras');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener carreras:', error);
        res.status(500).json({ message: 'Error al obtener carreras' });
    }
};

// Obtener una carrera por ID
export const getCarreraById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM carreras WHERE CarreraID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Carrera no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener la carrera:', error);
        res.status(500).json({ message: 'Error al obtener la carrera' });
    }
};

// Crear una nueva carrera
export const createCarrera = async (req, res) => {
    const { nombre } = req.body;
    try {
        const CarreraID = uuidv4();

        await pool.query('INSERT INTO carreras (CarreraID, Nombre) VALUES (?, ?)', [CarreraID, nombre]);

        res.status(201).json({ id: CarreraID, nombre });
    } catch (error) {
        console.error('Error al crear la carrera:', error);
        res.status(500).json({ message: 'Error al crear la carrera' });
    }
};

// Actualizar una carrera por ID
export const updateCarrera = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const [result] = await pool.query('UPDATE carreras SET Nombre = ? WHERE CarreraID = ?', [nombre, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Carrera no encontrada' });
        }
        res.json({ id, nombre });
    } catch (error) {
        console.error('Error al actualizar la carrera:', error);
        res.status(500).json({ message: 'Error al actualizar la carrera' });
    }
};

// Eliminar una carrera por ID
export const deleteCarrera = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM carreras WHERE CarreraID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Carrera no encontrada' });
        }
        res.status(204).end(); // No content
    } catch (error) {
        console.error('Error al eliminar la carrera:', error);
        res.status(500).json({ message: 'Error al eliminar la carrera' });
    }
};
