# AMIGA Project 

## Requirements

- Node 16.
- Java 17 (tested with Eclipse Temurin).
- Maven 3.8+.
- MySQL 8.

## Database creation

Se necesita crear dos contenedores con MySQL 8. Se recomienda una de las dos siguientes opciones:

- Docker Desckop. [Enlace de descarga](https://www.docker.com/products/docker-desktop/)

- Podman Desktop. [Enlace de descarga](https://podman-desktop.io/docs/Installation)

### Con Docker

```bash
docker run -p 3306:3306 --name amiga -e MYSQL_ROOT_PASSWORD=amiga -d mysql:8
```
Para los tests.

```bash
docker run -p 3307:3306 --name amiga-test -e MYSQL_ROOT_PASSWORD=amiga -d mysql:8
```

Para inicializar los datos de la bbdd
```bash
cmd /c "docker exec -i amiga mysql --password=amiga < dump-amiga.sql"
cmd /c "docker exec -i amiga-test mysql --password=amiga < dump-amiga.sql"
```

### Con Podman

```bash
podman run -p 3306:3306 --name amiga -e MYSQL_ROOT_PASSWORD=amiga -d mysql:8
```
Para los tests.

```bash
podman run -p 3307:3306 --name amiga-test -e MYSQL_ROOT_PASSWORD=amiga -d mysql:8
```

Para inicializar los datos de la bbdd 
```bash
cmd /c "podman exec -i amiga mysql --password=amiga < dump-amiga.sql"
cmd /c "podman exec -i amiga-test mysql --password=amiga < dump-amiga.sql"
```
## Run

```
cd backend
mvn clean install (first time)
mvn spring-boot:run

cd frontend
npm install (only first time to download libraries)
npm start
```
