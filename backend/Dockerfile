#Backend
FROM openjdk:24-slim

RUN apt-get update && apt-get install -y maven

WORKDIR /app

COPY  /target/*.jar /PmtApplication.jar

COPY ./src /app/src
COPY ./pom.xml /app/pom.xml

RUN mvn clean test

CMD [ "java" , "-jar", "/PmtApplication.jar"  ]

