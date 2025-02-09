FROM openjdk-17-slim AS build

WORKDIR /

COPY /pom.xml /

RUN mvn dependency:go-offline

COPY . .

RUN mvn clean package -DskipTests

COPY --from=build /target/*.jar /PmtApplication.jar

EXPOSE 8081
CMD ["java", "-jar", "/app/PmtApplication.jar"]
