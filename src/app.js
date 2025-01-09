import express from "express";
import cors from "cors";
import estudiantesRoutes from "./routes/estudiantes.routes.js";
import carrerasRoutes from "./routes/carreras.routes.js";
import materiasRoutes from "./routes/materias.routes.js";
import modalidadesRoutes from "./routes/modalidades.routes.js";
import profesoresRoutes from "./routes/profesores.routes.js";
import resenasRoutes from "./routes/resenas.routes.js";
import seccionesRoutes from "./routes/secciones.routes.js";


const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Corn
app.use(cors());

// Rutas
app.use('/estudiantes', estudiantesRoutes);
app.use('/carreras', carrerasRoutes);
app.use('/materias', materiasRoutes);
app.use('/modalidades', modalidadesRoutes);
app.use('/profesores', profesoresRoutes);
app.use('/resenas', resenasRoutes);
app.use('/secciones', seccionesRoutes);

// 404 no encontrado 
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found',
    });
});

export default app;
