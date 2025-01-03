import { v4 as uuidv4 } from 'uuid'; // Importar la función para generar UUID
import pool from '../db/database.js';

export const getModalidades = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM modalidades');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener modalidades:', error);
        res.status(500).json({ message: 'Error al obtener modalidades' });
    }
};

export const getModalidadById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM modalidades WHERE ModalidadID = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Modalidad no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener la modalidad:', error);
        res.status(500).json({ message: 'Error al obtener la modalidad' });
    }
};

export const deleteModalidad = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM modalidades WHERE ModalidadID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Modalidad no encontrada' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar la modalidad:', error);
        res.status(500).json({ message: 'Error al eliminar la modalidad' });
    }
};
