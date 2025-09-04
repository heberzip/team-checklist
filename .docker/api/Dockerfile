# syntax=docker/dockerfile:1.7
FROM maven:3.9-eclipse-temurin-21

WORKDIR /app

# Precalienta dependencias para acelerar builds
COPY backend/pom.xml ./
RUN --mount=type=cache,target=/root/.m2 mvn -q -DskipTests dependency:go-offline || true

EXPOSE 8080
