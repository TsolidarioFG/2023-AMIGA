# AMIGA Project 

## Requirements

- Node 16.
- Java 17 (tested with Eclipse Temurin).
- Maven 3.8+.
- MySQL 8.

## Database creation

Se necesita un contenedor con MySQL 8. En caso de no contar con uno ejecutar el siguiente comando para crearlo:

### Podman
Se aconseja utilizar Podman Desktop para trabajar con contenedores. [Enlace de descarga](https://podman-desktop.io/docs/Installation)
```bash
podman run -p 3306:3306 --name amiga -e MYSQL_ROOT_PASSWORD=amiga -d mysql:8
```
También se necesita otro contenedor con MySQL 8 para los tests.

```bash
podman run -p 3307:3306 --name amiga-test -e MYSQL_ROOT_PASSWORD=amiga -d mysql:8
```

Para inicializar los datos de la bbdd 
```bash
cmd /c "podman exec -i amiga mysql --password=amiga < dump-amiga.sql"
```
## Run

```
cd backend
mvn sql:execute (only first time to create tables)
mvn spring-boot:run

cd frontend
npm install (only first time to download libraries)
npm start
```
