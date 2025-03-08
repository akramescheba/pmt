
# Project Management Tool

PMT est une plateforme de gestion de projet collaboratif destinée aux équipes de développement logiciel. L'objectif est de créer une application qui permettra aux équipes de planifier, suivre et collaborer sur des projets de manière efficace.


## Préréquis

 - [Utiliser un éditeur de code](https://code.visualstudio.com/)
 - [Connaissance en JAVA, SpringBoot et Maven ](./)
 - [Connaissance en de Git et Github](./)


## Environment Variables

- J'ai utilisé VS Code comme éditeur de code pour ce projet. Le projet est développé avec springboot maven et angular, pour cela, vous devez configurer votre environnement de développement.
- Pour configurer votre environnement de développement, vous devez installer les outils suivants:

` Java 23.0.1 ou supérieur`

`Maven 3.9.9  ou supérieur`

`Node.js 22.13.0 ou supérieur`

`Angular CLI 18.2.14 ou supérieur`

` MySQL 8.0.21 ou supérieur`


## Installation

1. Télécharger  le [ JDK 8 ou 11 ](  https://www.oracle.com/java/technologies/downloads/) et suivre les insctructions d'installation

- Verifiez l'installation avec la commande: 

```bash
    java -version
```
2. Télécharger [ Maven](https://maven.apache.org/install.html) et suivre les insctructions d'installation

Verifiez l'installation avec la commande: 

```bash
    mvn --version
```
3. Télécharger [Node.js](https://nodejs.org/en/download/) et suivre les insctructions d'installation

- Verifiez l'installation avec la commande: 

```bash
    node -v ou node --version
```
4. Installer [Angular ](https://angular.dev/installation) avec la ligne de commande suivante:
- Verifiez l'installation avec la commande: 

```bash
    npm install -g @angular/cli@18.2.14
    ng --version
```

5. Télécharger [MySQL installer](https://dev.mysql.com/downloads/installe) et suivre les insctructions d'installation


## Lancement du backend

1. Créer un répertoire sur le bureau et ouvrez ce répertoire dans VS Code.
Cloner le projet avec la commande 


```bash
  git clone https://github.com/akramescheba/pmt
```

 2. Naviguer vers le dossier backend, dans le terminal, puis lancer le script suivant:

```bash
   mvn spring-boot:run 
  
```
Ouvrez un navigateur et naviguer vers : [http://localhost:8081](http://localhost:8081). 

Vous aurez une Erreur status=404. Vous devez ajouter les paramètres décrits plus bas pour accèder à la base des données.

## Lancement du frontend

1. Naviguer vers le dossier frontend, dans le terminal, puis lancer le script suivant:

Installation des dépendences
```bash
  npm install
  
```

Lancer le server

```bash
  ng serve
```

Ouvrez un navigateur et naviguer vers : 
[http://localhost:4200](http://localhost:4200), pour cceder au frontend.




## Reference API 

#### GET de tous les projets

```http
 http://localhost:8081/projet
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `projet` | `string` | Liste de tous les projest |

#### GET de tous les utilisateurs 

```http
 http://localhost:8081/utilisateur
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `utilisateur`      | `string` | Liste de tous les utilisateurs |


#### GET utilisateur by id

```http
  http://localhost:8081/utilisateur/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `utilisateur/id`      | `string` | Affichage des utilisateurs par ID|

#### GET de toutes les historiques

```http
 http://localhost:8081/historique
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `historique` | `string` | Liste de tous les historiques |


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfoli-iscod.web.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jordy-akra-mescheba/)



![pmt](https://github.com/user-attachments/assets/52c5ffdb-14ab-43b0-98e7-2211b62248f5)


## Auteur

- [@akramescheba](https://github.com/akramescheba)

