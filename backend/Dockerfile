
FROM openjdk:17-slim AS build


RUN apt-get update && apt-get install -y maven

WORKDIR /app

COPY backend/pom.xml /app/
RUN mvn dependency:go-offline


COPY backend /app/
RUN mvn clean package -DskipTests


FROM openjdk:17-slim


WORKDIR /app

COPY --from=build /app/target/*.jar /app/PmtApplication.jar


CMD ["java", "-jar", "/app/PmtApplication.jar"]
