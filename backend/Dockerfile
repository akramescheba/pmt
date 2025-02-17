
FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY . .

RUN mvn clean package -DskipTests


FROM eclipse-temurin:17-jdk-alpine


WORKDIR /app


COPY --from=build /app/target/*.jar /app/PmtApplication.jar


EXPOSE 8081


CMD [ "java" , "-jar", "/PmtApplication.jar"  ]
