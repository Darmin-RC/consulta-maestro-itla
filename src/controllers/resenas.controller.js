import pool from '../db/database.js';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid para generar IDs únicos

// Obtener todas las reseñas
export const getResenas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM resenas');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener reseñas:', error);
        res.status(500).json({ message: 'Error al obtener reseñas' });
    }
};

// Obtener una reseña por ID
export const getResenaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM resenas WHERE ResenaID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener la reseña:', error);
        res.status(500).json({ message: 'Error al obtener la reseña' });
    }
};

// Crear una nueva reseña
export const createResena = async (req, res) => {
    const { EstudianteID, MaestroID, Titulo, Descripcion, Estrellas } = req.body;
    
    // Generar un UUID para la ReseñaID
    const reseñaId = uuidv4();

    try {
        const [result] = await pool.query(
            'INSERT INTO resenas (ResenaID, EstudianteID, MaestroID, Titulo, Descripcion, Estrellas) VALUES (?, ?, ?, ?, ?, ?)', 
            [reseñaId, EstudianteID, MaestroID, Titulo, Descripcion, Estrellas]
        );

        // Enviar respuesta con el contenido creado y su ID generado
        res.status(201).json({ 
            ReseñaID: reseñaId,
            EstudianteID,
            MaestroID,
            Titulo,
            Descripcion,
            Estrellas
        });
    } catch (error) {
        console.error('Error al crear la reseña:', error);
        res.status(500).json({ message: 'Error al crear la reseña' });
    }
};

// Actualizar una reseña existente
export const updateResena = async (req, res) => {
    const { id } = req.params;
    const { Titulo, Descripcion, Estrellas } = req.body; // Asegúrate de que los campos coincidan con tu base de datos

    try {
        const [result] = await pool.query(
            'UPDATE resenas SET Titulo = ?, Descripcion = ?, Estrellas = ? WHERE ResenaID = ?',
            [Titulo, Descripcion, Estrellas, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.json({ id, Titulo, Descripcion, Estrellas });
    } catch (error) {
        console.error('Error al actualizar la reseña:', error);
        res.status(500).json({ message: 'Error al actualizar la reseña' });
    }
};

// Eliminar una reseña
export const deleteResena = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM resenas WHERE ReseñaID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar la reseña:', error);
        res.status(500).json({ message: 'Error al eliminar la reseña' });
    }
};
