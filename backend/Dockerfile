FROM maven:3.8.6-openjdk-17-slim AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:resolve

COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-slim

WORKDIR /app

COPY --from=build /app/target/*.jar /app/PmtApplication.jar

EXPOSE 8081

CMD ["java", "-jar", "/app/PmtApplication.jar"]
