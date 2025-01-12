import pool from '../db/database.js';
import { v4 as uuidv4 } from 'uuid';

export const crearResena = async (req, res) => {
    const { texto, calificacion } = req.body;
    const id = uuidv4();
    try {
        const result = await pool.query(
            'INSERT INTO Reseña (id, texto, calificacion) VALUES (?, ?, ?)', 
            [id, texto, calificacion]
        );
        res.status(201).json({ id, texto, calificacion });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reseña', error });
    }
};

export const obtenerResenas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Reseña');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reseñas', error });
    }
};

export const obtenerResenaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Reseña WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el reseña', error });
    }
};

export const actualizarResena = async (req, res) => {
    const { id } = req.params;
    const { texto, calificacion } = req.body;
    try {
        const result = await pool.query('UPDATE Reseña SET texto = ?, calificacion = ? WHERE id = ?', [texto, calificacion, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.status(200).json({ id, texto, calificacion });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la reseña', error });
    }
};

export const eliminarResena = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Reseña WHERE id = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Reseña no encontrada' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reseña', error });
    }
};
