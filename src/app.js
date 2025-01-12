import express from "express";
import cors from "cors";
import profesoresRoutes from "./routes/profesores.routes.js";
import materiasRoutes from "./routes/materias.routes.js";
import carrerasRoutes from "./routes/carreras.routes.js";
import estudiantesRoutes from "./routes/estudiantes.routes.js";
import resenasRoutes from "./routes/resenas.routes.js";
import especialRoutes from "./routes/especial.routes.js"

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Corn
app.use(cors());

// Rutas
app.use('/profesores', profesoresRoutes);
app.use('/carreras', carrerasRoutes);
app.use('/materias', materiasRoutes);
app.use('/estudiantes', estudiantesRoutes);
app.use('/resenas', resenasRoutes);
app.use('/cmitla', especialRoutes)


// 404 no encontrado 
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found',
    });
});

export default app;
