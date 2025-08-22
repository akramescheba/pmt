# Book a Book

Il s’agit d’améliorer une application de gestion de bibliothèque en ligne appelée BAB : Book A Book. Cette application permet aux utilisateurs de rechercher et réserver des livres en ligne. Un livre réservé peut ensuite être récupéré à la bibliothèque. Cependant, plusieurs utilisateurs ont signalé des anomalies et des fonctionnalités manquantes.

## Préréquis

- Java 21
- Spring Boot 3.3.1
- Spring Web / Spring Data JPA / H2 Database

## Reference API

#### Endpoints

```http
  http://localhost:8081/
```

| Type de requête | url      | Valeurs de retour                                                | Paramètres                                          |
| :-------------- | :------- | :--------------------------------------------------------------- | :-------------------------------------------------- |
| `POST`          | `/login` | Les informations de l’utilisateur et sa liste de livres réservés | L’email Le mot de passe Dans le corps de la requête |

|
| `GET` | `/book` | Liste de tous les livres| Aucun |
|
| `POST` | `/book/reserve/{bookId}/{userId}` |Les informations de la réservation | L’id du livre dans l’URL L’id de l’utilisateur dans l’URL|
|
| `GET` | `/book/{userId}` |La liste des livres réservés par l’utilisateur | L’id de l’utilisateur dans l’URL|
| `GET` | `/book/notget` | La liste des livres réservés depuis plus de 21 jours |Aucun |
|
