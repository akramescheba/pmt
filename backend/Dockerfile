# Utiliser une image qui contient déjà Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Copier le fichier pom.xml et télécharger les dépendances en cache
COPY pom.xml .
RUN mvn dependency:resolve

# Copier le code source
COPY src ./src

# Compiler l’application
RUN mvn clean package

# Exécuter l’application
CMD ["java", "-jar", "target/*.jar"]
