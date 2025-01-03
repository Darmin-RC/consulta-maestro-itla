import pool from '../db/database.js';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid para generar IDs únicos

export const getSecciones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM secciones_estudiantes');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener secciones:', error);
        res.status(500).json({ message: 'Error al obtener secciones' });
    }
};

export const getSeccionById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM secciones_estudiantes WHERE SeccionID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Sección no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener la sección:', error);
        res.status(500).json({ message: 'Error al obtener la sección' });
    }
};

export const createSeccion = async (req, res) => {
    const { materiaId, estudianteId, modalidad, numeroSeccion } = req.body; // Asegúrate de que estos campos están en el cuerpo de la solicitud

    // Generar un UUID para el SeccionID
    const seccionId = uuidv4();

    try {
        const [result] = await pool.query(
            'INSERT INTO secciones_estudiantes (SeccionID, MateriaID, EstudianteID, Modalidad, NumeroSeccion) VALUES (?, ?, ?, ?, ?)', 
            [seccionId, materiaId, estudianteId, modalidad, numeroSeccion]
        );
        res.status(201).json({ id: seccionId, materiaId, estudianteId, modalidad, numeroSeccion });
    } catch (error) {
        console.error('Error al crear la sección:', error);
        res.status(500).json({ message: 'Error al crear la sección' });
    }
};

export const updateSeccion = async (req, res) => {
    const { id } = req.params;
    const { materiaId, estudianteId, modalidad, numeroSeccion } = req.body;

    if (!materiaId || !estudianteId || !modalidad || !numeroSeccion) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    try {
        const [existing] = await pool.query('SELECT * FROM secciones_estudiantes WHERE SeccionID = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Sección no encontrada' });
        }

        const [result] = await pool.query(
            'UPDATE secciones_estudiantes SET MateriaID = ?, EstudianteID = ?, Modalidad = ?, NumeroSeccion = ? WHERE SeccionID = ?',
            [materiaId, estudianteId, modalidad, numeroSeccion, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sección no encontrada o datos no cambiaron' });
        }

        res.json({ id, materiaId, estudianteId, modalidad, numeroSeccion });
    } catch (error) {
        console.error('Error al actualizar la sección:', error);
        res.status(500).json({ message: 'Error al actualizar la sección' });
    }
};

export const deleteSeccion = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM secciones_estudiantes WHERE SeccionID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sección no encontrada' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar la sección:', error);
        res.status(500).json({ message: 'Error al eliminar la sección' });
    }
};
