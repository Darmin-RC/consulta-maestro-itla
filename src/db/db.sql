-- Base de datos
CREATE DATABASE IF NOT EXISTS itlasecciones;
USE itlasecciones;

-- Tabla de Estudiantes
CREATE TABLE estudiantes (
    EstudianteID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Correo VARCHAR(100) UNIQUE NOT NULL,
    Contraseña VARCHAR(255) NOT NULL
);

-- Tabla de Maestros
CREATE TABLE maestros (
    MaestroID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Calificacion FLOAT DEFAULT 0,
    Comentario TEXT
);

-- Tabla de Materias
CREATE TABLE materias (
    MateriaID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Seccion VARCHAR(50) NOT NULL,
    Horario VARCHAR(50) NOT NULL,
    Modalidad ENUM('Presencial', 'Virtual', 'Híbrido') NOT NULL,
    MaestroID INT NOT NULL,
    FOREIGN KEY (MaestroID) REFERENCES maestros(MaestroID) ON DELETE CASCADE
);

-- Tabla de Reseñas
CREATE TABLE resenas (
    ReseñaID INT AUTO_INCREMENT PRIMARY KEY,
    EstudianteID INT NOT NULL,
    MaestroID INT NOT NULL,
    Titulo VARCHAR(100) NOT NULL,
    Descripcion TEXT,
    Estrellas TINYINT CHECK (Estrellas BETWEEN 1 AND 5),
    FOREIGN KEY (EstudianteID) REFERENCES estudiantes(EstudianteID) ON DELETE CASCADE,
    FOREIGN KEY (MaestroID) REFERENCES maestros(MaestroID) ON DELETE CASCADE
);

-- Tabla de Carreras
CREATE TABLE carreras (
    CarreraID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL
);

-- Relación Materias y Carreras (muchos a muchos)
CREATE TABLE carreras_materias (
    CarreraID INT NOT NULL,
    MateriaID INT NOT NULL,
    PRIMARY KEY (CarreraID, MateriaID),
    FOREIGN KEY (CarreraID) REFERENCES carreras(CarreraID) ON DELETE CASCADE,
    FOREIGN KEY (MateriaID) REFERENCES materias(MateriaID) ON DELETE CASCADE
);

-- Tabla de Días y Horarios por Materia
CREATE TABLE dias_horarios (
    DiaHorarioID INT AUTO_INCREMENT PRIMARY KEY,
    MateriaID INT NOT NULL,
    Dia ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    HoraInicio TIME NOT NULL,
    HoraFin TIME NOT NULL,
    FOREIGN KEY (MateriaID) REFERENCES materias(MateriaID) ON DELETE CASCADE
);

-- Tabla de Secciones Publicadas por Estudiantes
CREATE TABLE secciones_estudiantes (
    SeccionID INT AUTO_INCREMENT PRIMARY KEY,
    MateriaID INT NOT NULL,
    EstudianteID INT NOT NULL,
    Modalidad ENUM('Presencial', 'Virtual', 'Híbrido') NOT NULL,
    FOREIGN KEY (MateriaID) REFERENCES materias(MateriaID) ON DELETE CASCADE,
    FOREIGN KEY (EstudianteID) REFERENCES estudiantes(EstudianteID) ON DELETE CASCADE
);

CREATE TABLE modalidades (
    ModalidadID INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion TEXT
);



-- Insertar modalidades

INSERT INTO modalidades (Nombre, Descripcion)
VALUES ('Presencial', 'Caleta'), ('Presencial', '3 Ojos'), ('Virtual', 'Autogestionada');

-- Insertar estudiantes
INSERT INTO estudiantes (Nombre, Correo, Contraseña)
VALUES
('Juan Pérez', 'juan.perez@example.com', 'contraseña123'),
('Ana López', 'ana.lopez@example.com', 'contraseña123');

-- Insertar maestros
INSERT INTO maestros (Nombre, Calificacion, Comentario)
VALUES
('Freddy A. García Alvarado', 4.5, 'Excelente profesor de ética.'),
('Ricardo Moreno Díaz', 4.7, 'Experto en redes.');

-- Insertar materias
INSERT INTO materias (Nombre, Seccion, Horario, Modalidad, MaestroID)
VALUES
('Ética 4', '1', '19:00-21:59', 'Virtual', 1),
('Redacción Castellana', '1', '16:00-19:59', 'Híbrido', 2);

-- Insertar carreras
INSERT INTO carreras (Nombre)
VALUES
('Ingeniería en Sistemas'),
('Administración de Empresas');

-- Insertar relación carreras-materias
INSERT INTO carreras_materias (CarreraID, MateriaID)
VALUES
(1, 1),
(2, 2);

-- Insertar días y horarios
INSERT INTO dias_horarios (MateriaID, Dia, HoraInicio, HoraFin)
VALUES
(1, 'Lunes', '19:00', '21:59'),
(2, 'Miércoles', '16:00', '19:59');

-- Insertar reseñas
INSERT INTO resenas (EstudianteID, MaestroID, Titulo, Descripcion, Estrellas)
VALUES
(1, 1, 'Gran experiencia', 'Aprendí mucho en su clase.', 5),
(2, 2, 'Buen maestro', 'Me ayudó bastante con dudas.', 4);


