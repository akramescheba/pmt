CREATE TABLE utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    password VARCHAR(255),
    repassword VARCHAR(255)
);
CREATE TABLE historique (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    date_history TIMESTAMP
);
CREATE TABLE projet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    objectif VARCHAR(255) NOT NULL,
    context VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    statut  VARCHAR(255) NOT NULL,
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP NOT NULL
);
