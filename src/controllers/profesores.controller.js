import { v4 as uuidv4 } from 'uuid';
import pool from '../db/database.js';

export const getProfesores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Profesor');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener profesores:', error);
        res.status(500).json({ message: 'Error al obtener profesores' });
    }
};

export const getProfesorById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Profesor WHERE id = ?', [id]);
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
    const { nombre, apellido, email } = req.body;

    if (!nombre || !apellido || !email) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const id = uuidv4();

    try {
        await pool.query(
            'INSERT INTO Profesor (id, nombre, apellido, email) VALUES (?, ?, ?, ?)',
            [id, nombre, apellido, email]
        );
        res.status(201).json({ id, nombre, apellido, email });
    } catch (error) {
        console.error('Error al crear el profesor:', error);
        res.status(500).json({ message: 'Error al crear el profesor' });
    }
};

export const updateProfesor = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email } = req.body;

    if (!nombre || !apellido || !email) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE Profesor SET nombre = ?, apellido = ?, email = ? WHERE id = ?',
            [nombre, apellido, email, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.json({ id, nombre, apellido, email });
    } catch (error) {
        console.error('Error al actualizar el profesor:', error);
        res.status(500).json({ message: 'Error al actualizar el profesor' });
    }
};

export const deleteProfesor = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Profesor WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar el profesor:', error);
        res.status(500).json({ message: 'Error al eliminar el profesor' });
    }
};

