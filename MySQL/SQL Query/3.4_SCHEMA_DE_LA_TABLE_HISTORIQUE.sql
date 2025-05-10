CREATE TABLE historique (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    date_history TIMESTAMP NOT NULL
);