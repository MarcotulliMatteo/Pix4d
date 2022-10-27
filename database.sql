CREATE DATABASE pix4d;

CREATE TABLE cameras (
    model VARCHAR(100) PRIMARY KEY,
    megapixel VARCHAR(100),
    brand VARCHAR(100)
);

INSERT INTO cameras (model, megapixel, brand) VALUES ('hero3', '12MP', 'gopro');

CREATE TABLE drones (
    name VARCHAR(100),
    brand VARCHAR(100),
    serialNumber VARCHAR(100),
    cameraModel VARCHAR(100) REFERENCES cameras (model),
    PRIMARY KEY (brand, serialNumber)
);

INSERT INTO drones (name, brand, serialNumber, cameraModel) VALUES ('phantom', 'DJI', 'x4303', 'hero3');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    surname VARCHAR(100),
    team VARCHAR(100)
);

INSERT INTO users (name, surname, team) VALUES ('matteo', 'marcotulli', 'support');
INSERT INTO users (name, surname, team) VALUES ('giulio', 'rossi', 'generic');