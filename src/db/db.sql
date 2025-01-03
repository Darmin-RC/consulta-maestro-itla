-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS itlasecciones;
USE itlasecciones;

-- Tabla de Estudiantes
CREATE TABLE estudiantes (
    EstudianteID CHAR(36) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) UNIQUE NOT NULL,
    Contraseña VARCHAR(255) NOT NULL
);

-- Tabla de Maestros
CREATE TABLE maestros (
    MaestroID CHAR(36) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Calificacion FLOAT DEFAULT 0,
    Comentario TEXT
);

-- Tabla de Materias
CREATE TABLE materias (
    MateriaID CHAR(36) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Seccion VARCHAR(50) NOT NULL,
    Horario VARCHAR(50) NOT NULL,
    Modalidad ENUM('Presencial', 'Virtual', 'Híbrido') NOT NULL,
    MaestroID CHAR(36) NOT NULL,
    FOREIGN KEY (MaestroID) REFERENCES maestros(MaestroID) ON DELETE CASCADE
);

-- Tabla de Reseñas
CREATE TABLE resenas (
    ResenaID CHAR(36) PRIMARY KEY,
    EstudianteID CHAR(36) NOT NULL,
    MaestroID CHAR(36) NOT NULL,
    Titulo VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    Estrellas TINYINT CHECK (Estrellas BETWEEN 1 AND 5),
    FOREIGN KEY (EstudianteID) REFERENCES estudiantes(EstudianteID) ON DELETE CASCADE,
    FOREIGN KEY (MaestroID) REFERENCES maestros(MaestroID) ON DELETE CASCADE
);

-- Tabla de Carreras
CREATE TABLE carreras (
    CarreraID CHAR(36) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

-- Relación Materias y Carreras (muchos a muchos)
CREATE TABLE carreras_materias (
    CarreraID CHAR(36) NOT NULL,
    MateriaID CHAR(36) NOT NULL,
    PRIMARY KEY (CarreraID, MateriaID),
    FOREIGN KEY (CarreraID) REFERENCES carreras(CarreraID) ON DELETE CASCADE,
    FOREIGN KEY (MateriaID) REFERENCES materias(MateriaID) ON DELETE CASCADE
);

-- Tabla de Días y Horarios por Materia
CREATE TABLE dias_horarios (
    DiaHorarioID CHAR(36) PRIMARY KEY,
    MateriaID CHAR(36) NOT NULL,
    Dia ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    HoraInicio TIME NOT NULL,
    HoraFin TIME NOT NULL,
    FOREIGN KEY (MateriaID) REFERENCES materias(MateriaID) ON DELETE CASCADE
);

-- Tabla de Secciones Publicadas por Estudiantes
CREATE TABLE secciones_estudiantes (
    SeccionID CHAR(36) PRIMARY KEY,
    MateriaID CHAR(36) NOT NULL,
    EstudianteID CHAR(36) NOT NULL,
    Modalidad ENUM('Presencial', 'Virtual', 'Híbrido') NOT NULL,
    FOREIGN KEY (MateriaID) REFERENCES materias(MateriaID) ON DELETE CASCADE,
    FOREIGN KEY (EstudianteID) REFERENCES estudiantes(EstudianteID) ON DELETE CASCADE
);

-- Tabla de Modalidades
CREATE TABLE modalidades (
    ModalidadID CHAR(36) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion TEXT
);

-- Insertar modalidades
INSERT INTO modalidades (ModalidadID, Nombre, Descripcion)
VALUES 
(UUID(), 'Presencial', 'Caleta'), 
(UUID(), 'Presencial', '3 Ojos'), 
(UUID(), 'Virtual', 'Autogestionada');

-- Insertar estudiantes
INSERT INTO estudiantes (EstudianteID, Nombre, Correo, Contraseña)
VALUES
(UUID(), 'Juan Pérez', 'juan.perez@example.com', 'contraseña123'),
(UUID(), 'Ana López', 'ana.lopez@example.com', 'contraseña123');

-- Insertar maestros
INSERT INTO maestros (MaestroID, Nombre, Calificacion, Comentario)
VALUES
(UUID(), 'Freddy A. García Alvarado', 4.5, 'Excelente profesor de ética.'),
(UUID(), 'Ricardo Moreno Díaz', 4.7, 'Experto en redes.');

-- Insertar materias
INSERT INTO materias (MateriaID, Nombre, Seccion, Horario, Modalidad, MaestroID)
VALUES
(UUID(), 'Ética 4', '1', '19:00-21:59', 'Virtual', (SELECT MaestroID FROM maestros WHERE Nombre = 'Freddy A. García Alvarado')),
(UUID(), 'Redacción Castellana', '1', '16:00-19:59', 'Híbrido', (SELECT MaestroID FROM maestros WHERE Nombre = 'Ricardo Moreno Díaz'));

-- Insertar carreras
INSERT INTO carreras (CarreraID, Nombre)
VALUES
(UUID(), 'Ingeniería en Sistemas'),
(UUID(), 'Administración de Empresas');

-- Insertar relación carreras-materias
INSERT INTO carreras_materias (CarreraID, MateriaID)
VALUES
((SELECT CarreraID FROM carreras WHERE Nombre = 'Ingeniería en Sistemas'), (SELECT MateriaID FROM materias WHERE Nombre = 'Ética 4')),
((SELECT CarreraID FROM carreras WHERE Nombre = 'Administración de Empresas'), (SELECT MateriaID FROM materias WHERE Nombre = 'Redacción Castellana'));

-- Insertar días y horarios
INSERT INTO dias_horarios (DiaHorarioID, MateriaID, Dia, HoraInicio, HoraFin)
VALUES
(UUID(), (SELECT MateriaID FROM materias WHERE Nombre = 'Ética 4'), 'Lunes', '19:00', '21:59'),
(UUID(), (SELECT MateriaID FROM materias WHERE Nombre = 'Redacción Castellana'), 'Miércoles', '16:00', '19:59');

-- Insertar reseñas
INSERT INTO resenas (ResenaID, EstudianteID, MaestroID, Titulo, Descripcion, Estrellas)
VALUES
(UUID(), (SELECT EstudianteID FROM estudiantes WHERE Nombre = 'Juan Pérez'), (SELECT MaestroID FROM maestros WHERE Nombre = 'Freddy A. García Alvarado'), 'Gran experiencia', 'Aprendí mucho en su clase.', 5),
(UUID(), (SELECT EstudianteID FROM estudiantes WHERE Nombre = 'Ana López'), (SELECT MaestroID FROM maestros WHERE Nombre = 'Ricardo Moreno Díaz'), 'Buen maestro', 'Me ayudó bastante con dudas.', 4);

