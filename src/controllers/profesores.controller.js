import pool from '../db/database.js';

export const getProfesores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM maestros');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener profesores:', error);
        res.status(500).json({ message: 'Error al obtener profesores' });
    }
};

export const getProfesorById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM maestros WHERE MaestroID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener el profesor:', error);
        res.status(500).json({ message: 'Error al obtener el profesor' });
    }
};

export const createProfesor = async (req, res) => {
    const { nombre, calificacion, comentario } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO maestros (Nombre, Calificacion, Comentario) VALUES (?, ?, ?)', 
            [nombre, calificacion, comentario]
        );
        res.status(201).json({ id: result.insertId, nombre, calificacion, comentario });
    } catch (error) {
        console.error('Error al crear el profesor:', error);
        res.status(500).json({ message: 'Error al crear el profesor' });
    }
};

export const updateProfesor = async (req, res) => {
    const { id } = req.params;
    const { nombre, calificacion, comentario } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE maestros SET Nombre = ?, Calificacion = ?, Comentario = ? WHERE MaestroID = ?', 
            [nombre, calificacion, comentario, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json({ id, nombre, calificacion, comentario });
    } catch (error) {
        console.error('Error al actualizar el profesor:', error);
        res.status(500).json({ message: 'Error al actualizar el profesor' });
    }
};

export const deleteProfesor = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM maestros WHERE MaestroID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar el profesor:', error);
        res.status(500).json({ message: 'Error al eliminar el profesor' });
    }
};
