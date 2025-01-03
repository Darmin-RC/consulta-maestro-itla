import pool from '../db/database.js';
import { v4 as uuidv4 } from 'uuid'; // Importar uuid para generar IDs únicos

export const getResenas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM resenas');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener reseñas:', error);
        res.status(500).json({ message: 'Error al obtener reseñas' });
    }
};

export const getResenaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM resenas WHERE ReseñaID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener la reseña:', error);
        res.status(500).json({ message: 'Error al obtener la reseña' });
    }
};

export const createResena = async (req, res) => {
    const { usuarioID, materiaID, contenido, calificacion } = req.body;
    
    // Generar un UUID para la ReseñaID
    const reseñaId = uuidv4();

    try {
        const [result] = await pool.query(
            'INSERT INTO resenas (ReseñaID, UsuarioID, MateriaID, Contenido, Calificacion) VALUES (?, ?, ?, ?, ?)', 
            [reseñaId, usuarioID, materiaID, contenido, calificacion]
        );
        res.status(201).json({ id: reseñaId, usuarioID, materiaID, contenido, calificacion });
    } catch (error) {
        console.error('Error al crear la reseña:', error);
        res.status(500).json({ message: 'Error al crear la reseña' });
    }
};

export const updateResena = async (req, res) => {
    const { id } = req.params; // ID de la reseña a actualizar
    const { EstudianteID, MaestroID, Titulo, Descripcion, Estrellas } = req.body; // Ajustar según la estructura

    try {
        const [result] = await pool.query(
            'UPDATE resenas SET EstudianteID = ?, MaestroID = ?, Titulo = ?, Descripcion = ?, Estrellas = ? WHERE ReseñaID = ?', 
            [EstudianteID, MaestroID, Titulo, Descripcion, Estrellas, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.json({ id, EstudianteID, MaestroID, Titulo, Descripcion, Estrellas });
    } catch (error) {
        console.error('Error al actualizar la reseña:', error);
        res.status(500).json({ message: 'Error al actualizar la reseña' });
    }
};

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
