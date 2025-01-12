CREATE DATABASE IF NOT EXISTS cmitla;
USE cmitla;

-- Tabla para Profesores
CREATE TABLE Profesor (
    id CHAR(36) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100)
);

-- Tabla para Materias
CREATE TABLE Materia (
    id CHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    horario VARCHAR(50),
    seccion VARCHAR(10),
    modalidad VARCHAR(50)
);

-- Tabla para Carreras
CREATE TABLE Carrera (
    id CHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla para Estudiantes
CREATE TABLE Estudiante (
    id CHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- Tabla para Reseñas
CREATE TABLE Reseña (
    id CHAR(36) PRIMARY KEY,
    texto TEXT,
    calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
    fecha timestamp NOT NULL DEFAULT current_timestamp
);

-- Relación muchos a muchos entre Profesor y Materia
CREATE TABLE ProfesorMateria (
    id CHAR(36) PRIMARY KEY,
    profesor_id CHAR(36) NOT NULL,
    materia_id CHAR(36) NOT NULL,
    FOREIGN KEY (profesor_id) REFERENCES Profesor(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES Materia(id) ON DELETE CASCADE
);

-- Relación muchos a muchos entre Materia y Carrera
CREATE TABLE MateriaCarrera (
    id CHAR(36) PRIMARY KEY,
    materia_id CHAR(36) NOT NULL,
    carrera_id CHAR(36) NOT NULL,
    FOREIGN KEY (materia_id) REFERENCES Materia(id) ON DELETE CASCADE,
    FOREIGN KEY (carrera_id) REFERENCES Carrera(id) ON DELETE CASCADE
);

-- Relación entre Profesor y Reseña
CREATE TABLE ReseñaProfesor (
    id CHAR(36) PRIMARY KEY,
    profesor_id CHAR(36) NOT NULL,
    reseña_id CHAR(36) NOT NULL,
    FOREIGN KEY (profesor_id) REFERENCES Profesor(id) ON DELETE CASCADE,
    FOREIGN KEY (reseña_id) REFERENCES Reseña(id) ON DELETE CASCADE
);

-- Relación entre Estudiante y Reseña
CREATE TABLE ReseñaEstudiante (
    id CHAR(36) PRIMARY KEY,
    estudiante_id CHAR(36) NOT NULL,
    reseña_id CHAR(36) NOT NULL,
    FOREIGN KEY (estudiante_id) REFERENCES Estudiante(id) ON DELETE CASCADE,
    FOREIGN KEY (reseña_id) REFERENCES Reseña(id) ON DELETE CASCADE
);



-- Insertar datos en la tabla Profesor
INSERT INTO Profesor (id, nombre, apellido, email) VALUES
(UUID(), 'Juan', 'Pérez', 'juan.perez@universidad.com'),
(UUID(), 'María', 'López', 'maria.lopez@universidad.com'),
(UUID(), 'Carlos', 'García', 'carlos.garcia@universidad.com'),
(UUID(), 'Ana', 'Martínez', 'ana.martinez@universidad.com'),
(UUID(), 'Luis', 'Hernández', 'luis.hernandez@universidad.com'),
(UUID(), 'Sofía', 'Gómez', 'sofia.gomez@universidad.com'),
(UUID(), 'Jorge', 'Ruiz', 'jorge.ruiz@universidad.com'),
(UUID(), 'Clara', 'Torres', 'clara.torres@universidad.com'),
(UUID(), 'Diego', 'Ramírez', 'diego.ramirez@universidad.com'),
(UUID(), 'Laura', 'Fernández', 'laura.fernandez@universidad.com');

-- Insertar datos en la tabla Materia
INSERT INTO Materia (id, nombre, horario, seccion, modalidad) VALUES
(UUID(), 'Matemáticas Básicas', 'Lunes 8:00-10:00', 'A1', 'Presencial'),
(UUID(), 'Programación I', 'Martes 10:00-12:00', 'B1', 'Virtual'),
(UUID(), 'Física General', 'Miércoles 14:00-16:00', 'C1', 'Presencial'),
(UUID(), 'Historia Universal', 'Jueves 16:00-18:00', 'D1', 'Presencial'),
(UUID(), 'Química Orgánica', 'Viernes 10:00-12:00', 'E1', 'Presencial'),
(UUID(), 'Inglés Intermedio', 'Lunes 12:00-14:00', 'A2', 'Virtual'),
(UUID(), 'Sociología', 'Martes 8:00-10:00', 'B2', 'Presencial'),
(UUID(), 'Análisis Matemático', 'Miércoles 16:00-18:00', 'C2', 'Presencial'),
(UUID(), 'Base de Datos', 'Jueves 10:00-12:00', 'D2', 'Virtual'),
(UUID(), 'Redes de Computadoras', 'Viernes 8:00-10:00', 'E2', 'Presencial');

-- Insertar datos en la tabla Carrera
INSERT INTO Carrera (id, nombre) VALUES
(UUID(), 'Ingeniería en Sistemas'),
(UUID(), 'Administración de Empresas'),
(UUID(), 'Ingeniería Industrial'),
(UUID(), 'Arquitectura'),
(UUID(), 'Derecho'),
(UUID(), 'Medicina'),
(UUID(), 'Psicología'),
(UUID(), 'Economía'),
(UUID(), 'Comunicación Social'),
(UUID(), 'Diseño Gráfico');

-- Insertar datos en la tabla Estudiante
INSERT INTO Estudiante (id, nombre, email) VALUES
(UUID(), 'José Rodríguez', 'jose.rodriguez@universidad.com'),
(UUID(), 'Carmen Mejía', 'carmen.mejia@universidad.com'),
(UUID(), 'Luis Vargas', 'luis.vargas@universidad.com'),
(UUID(), 'Andrea Soto', 'andrea.soto@universidad.com'),
(UUID(), 'Pedro Morales', 'pedro.morales@universidad.com'),
(UUID(), 'Sara López', 'sara.lopez@universidad.com'),
(UUID(), 'David Jiménez', 'david.jimenez@universidad.com'),
(UUID(), 'Daniela Torres', 'daniela.torres@universidad.com'),
(UUID(), 'Fernando Cruz', 'fernando.cruz@universidad.com'),
(UUID(), 'Lucía Hernández', 'lucia.hernandez@universidad.com');

-- Insertar datos en la tabla ProfesorMateria (relación muchos a muchos)
INSERT INTO ProfesorMateria (id, profesor_id, materia_id) VALUES
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 0), (SELECT id FROM Materia LIMIT 1 OFFSET 0)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 1), (SELECT id FROM Materia LIMIT 1 OFFSET 1)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 2), (SELECT id FROM Materia LIMIT 1 OFFSET 2)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 3), (SELECT id FROM Materia LIMIT 1 OFFSET 3)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 4), (SELECT id FROM Materia LIMIT 1 OFFSET 4)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 5), (SELECT id FROM Materia LIMIT 1 OFFSET 5)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 6), (SELECT id FROM Materia LIMIT 1 OFFSET 6)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 7), (SELECT id FROM Materia LIMIT 1 OFFSET 7)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 8), (SELECT id FROM Materia LIMIT 1 OFFSET 8)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 9), (SELECT id FROM Materia LIMIT 1 OFFSET 9));

-- Insertar datos en la tabla MateriaCarrera (relación muchos a muchos)
INSERT INTO MateriaCarrera (id, materia_id, carrera_id) VALUES
(UUID(), (SELECT id FROM Materia LIMIT 1 OFFSET 0), (SELECT id FROM Carrera LIMIT 1 OFFSET 0)),
(UUID(), (SELECT id FROM Materia LIMIT 1 OFFSET 1), (SELECT id FROM Carrera LIMIT 1 OFFSET 1)),
(UUID(), (SELECT id FROM Materia LIMIT 1 OFFSET 2), (SELECT id FROM Carrera LIMIT 1 OFFSET 2)),
(UUID(), (SELECT id FROM Materia LIMIT 1 OFFSET 3), (SELECT id FROM Carrera LIMIT 1 OFFSET 3)),
(UUID(), (SELECT id FROM Materia LIMIT 1 OFFSET 4), (SELECT id FROM Carrera LIMIT 1 OFFSET 4)),
(UUID(), (SELECT id FROM Materia LIMIT 1 OFFSET 5), (SELECT id FROM Carrera LIMIT 1 OFFSET 5)),
(UUID(), (SELECT id FROM Materia LIMIT 1 OFFSET 6), (SELECT id FROM Carrera LIMIT 1 OFFSET 6)),
(UUID(), (SELECT id FROM Materia LIMIT 1 OFFSET 7), (SELECT id FROM Carrera LIMIT 1 OFFSET 7)),
(UUID(), (SELECT id FROM Materia LIMIT 1 OFFSET 8), (SELECT id FROM Carrera LIMIT 1 OFFSET 8)),
(UUID(), (SELECT id FROM Materia LIMIT 1 OFFSET 9), (SELECT id FROM Carrera LIMIT 1 OFFSET 9));

-- Insertar datos en la tabla Reseña
INSERT INTO Reseña (id, texto, calificacion, fecha) VALUES
(UUID(), 'Excelente profesor, explica muy bien.', 5, '2025-01-01'),
(UUID(), 'No es muy claro al explicar, podría mejorar.', 3, '2025-01-02'),
(UUID(), 'El profesor es puntual y organizado.', 4, '2025-01-03'),
(UUID(), 'No me gustó su forma de evaluar.', 2, '2025-01-04'),
(UUID(), 'Tiene mucha experiencia en la materia.', 5, '2025-01-05'),
(UUID(), 'Recomiendo este profesor para principiantes.', 4, '2025-01-06'),
(UUID(), 'Es un poco estricto, pero enseña bien.', 3, '2025-01-07'),
(UUID(), 'Las clases son dinámicas y entretenidas.', 5, '2025-01-08'),
(UUID(), 'No se entendieron bien los temas.', 2, '2025-01-09'),
(UUID(), 'Excelente manejo del contenido.', 5, '2025-01-10');

-- Insertar datos en la tabla ReseñaProfesor (relación entre Profesor y Reseña)
INSERT INTO ReseñaProfesor (id, profesor_id, reseña_id) VALUES
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 0), (SELECT id FROM Reseña LIMIT 1 OFFSET 0)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 1), (SELECT id FROM Reseña LIMIT 1 OFFSET 1)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 2), (SELECT id FROM Reseña LIMIT 1 OFFSET 2)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 3), (SELECT id FROM Reseña LIMIT 1 OFFSET 3)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 4), (SELECT id FROM Reseña LIMIT 1 OFFSET 4)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 5), (SELECT id FROM Reseña LIMIT 1 OFFSET 5)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 6), (SELECT id FROM Reseña LIMIT 1 OFFSET 6)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 7), (SELECT id FROM Reseña LIMIT 1 OFFSET 7)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 8), (SELECT id FROM Reseña LIMIT 1 OFFSET 8)),
(UUID(), (SELECT id FROM Profesor LIMIT 1 OFFSET 9), (SELECT id FROM Reseña LIMIT 1 OFFSET 9));

-- Insertar datos en la tabla ReseñaEstudiante (relación entre Estudiante y Reseña)
INSERT INTO ReseñaEstudiante (id, estudiante_id, reseña_id) VALUES
(UUID(), (SELECT id FROM Estudiante LIMIT 1 OFFSET 0), (SELECT id FROM Reseña LIMIT 1 OFFSET 0)),
(UUID(), (SELECT id FROM Estudiante LIMIT 1 OFFSET 1), (SELECT id FROM Reseña LIMIT 1 OFFSET 1)),
(UUID(), (SELECT id FROM Estudiante LIMIT 1 OFFSET 2), (SELECT id FROM Reseña LIMIT 1 OFFSET 2)),
(UUID(), (SELECT id FROM Estudiante LIMIT 1 OFFSET 3), (SELECT id FROM Reseña LIMIT 1 OFFSET 3)),
(UUID(), (SELECT id FROM Estudiante LIMIT 1 OFFSET 4), (SELECT id FROM Reseña LIMIT 1 OFFSET 4)),
(UUID(), (SELECT id FROM Estudiante LIMIT 1 OFFSET 5), (SELECT id FROM Reseña LIMIT 1 OFFSET 5)),
(UUID(), (SELECT id FROM Estudiante LIMIT 1 OFFSET 6), (SELECT id FROM Reseña LIMIT 1 OFFSET 6)),
(UUID(), (SELECT id FROM Estudiante LIMIT 1 OFFSET 7), (SELECT id FROM Reseña LIMIT 1 OFFSET 7)),
(UUID(), (SELECT id FROM Estudiante LIMIT 1 OFFSET 8), (SELECT id FROM Reseña LIMIT 1 OFFSET 8)),
(UUID(), (SELECT id FROM Estudiante LIMIT 1 OFFSET 9), (SELECT id FROM Reseña LIMIT 1 OFFSET 9));

Select * from Profesor

