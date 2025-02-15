
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:resolve

RUN mvn clean package

CMD ["java", "-jar", "target/*.jar"]
