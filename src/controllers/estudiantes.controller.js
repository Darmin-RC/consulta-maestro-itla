import pool from '../db/database.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const getEstudiantes = async (req, res) => {
  try {
    console.log('Solicitud recibida para /estudiantes');
    const [rows] = await pool.query('SELECT * FROM estudiantes');
    console.log('Resultados obtenidos:', rows);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ message: 'Error al obtener estudiantes' });
  }
};

export const getEstudianteById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM estudiantes WHERE EstudianteID = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEstudiante = async (req, res) => {
    try {
        const { Nombre, Correo, Contraseña } = req.body;

        const EstudianteID = uuidv4();

        const hashedPassword = await bcrypt.hash(Contraseña, 10);

        await pool.query(
            'INSERT INTO estudiantes (EstudianteID, Nombre, Correo, Contraseña) VALUES (?, ?, ?, ?)',
            [EstudianteID, Nombre, Correo, hashedPassword]
        );

        res.status(201).json({message: "Estudiante creado con éxtio"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Contraseña } = req.body;

    const [existing] = await pool.query('SELECT * FROM estudiantes WHERE EstudianteID = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });

    const updates = [];
    const values = [];

    if (Nombre) {
      updates.push('Nombre = ?');
      values.push(Nombre);
    }

    if (Contraseña) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(Contraseña, saltRounds);
      updates.push('Contraseña = ?');
      values.push(hashedPassword);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
    }

    values.push(id);

    const query = `UPDATE estudiantes SET ${updates.join(', ')} WHERE EstudianteID = ?`;
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });

    res.json({ message: 'Estudiante actualizado exitosamente', id });
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM estudiantes WHERE EstudianteID = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Estudiante no encontrado' });
    res.json({ message: 'Estudiante eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
