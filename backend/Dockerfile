
FROM maven:3.8.6-openjdk-17-slim AS build



WORKDIR /app


COPY backend/pom.xml /app/
RUN mvn dependency:go-offline


COPY backend /app/
RUN mvn clean package -DskipTests


FROM openjdk:17-jdk-slim


WORKDIR /app
COPY --from=build /app/target/*.jar /app/PmtApplication.jar


CMD ["java", "-jar", "/app/PmtApplication.jar"]
