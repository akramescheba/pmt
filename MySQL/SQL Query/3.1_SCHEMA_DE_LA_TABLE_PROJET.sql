 CREATE TABLE projet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    objectif VARCHAR(255) NOT NULL,
    context VARCHAR(255) NOT NULL,
    description VARCHAR(1500) NOT NULL,
    statut  VARCHAR(255) NOT NULL,
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP NOT NULL
);

