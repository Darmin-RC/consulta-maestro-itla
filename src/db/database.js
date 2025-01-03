import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

pool.getConnection()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((error) => console.error('Error al conectar a la base de datos:', error));

export default pool;
