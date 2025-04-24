
INSERT INTO utilisateur (id, nom, email, role, password, repassword) VALUES
(1, 'Marcelin BERTHELOT', 'marcelin@example.com', 'admin', 'pass123', 'pass123'),
(2, 'Albert EINSTEIN', 'albert@example.com', 'user', 'relativity', 'relativity');



INSERT INTO historique (id, action, username, role, date_history)
VALUES
(1, 'maj', 'Paul DOUMER', 'admin', '2025-04-24 17:00:00'),
(2, 'maj', 'Albert EINSTEIN', 'user', '2025-04-24 17:05:00');


INSERT INTO projet (id, nom, objectif, context, description, statut, date_debut, date_fin)
VALUES (
  1,
  'O''Fit',
  'Application intuitive, sécurisée et innovante',
  'Aide quotidienne au utilisateur',
  'Cette application se veut être un compagnon quotidien pour les utilisateurs, leur fournissant des conseils personnalisés basés sur l''analyse de leurs données de santé',
  'En cours',
  '2025-04-24 17:00:00',
  '2025-05-24 16:55:00'
);
