# AMIGA Project 

# Para Despliegue 

## Requirimientos

- Node 16.
- Java 17 (tested with Eclipse Temurin).
- Maven 3.8+.
- MySQL 8.

### Para backend

### Creación base de datos

Instalar mysql y ejecutar el script Database.sql que está en la carpeta sql del backend.

### Configuración del back

Modificar las variables relativas a la base de datos en el pom.xml con los datos de la bbdd creada.
Son tres campos los que hay que modificar: 
- dataSourcePro.user: usuario de la base de datos.
- dataSourcePro.password: contraseña del usuario.
- dataSourcePro.url: url de acceso a la base de datos.

Terminado este proceso ejecutar:

```
mvn clean package -DskipTests
```

Esto creará el jar que contiene la aplicación en 2023-AMIGA\backend\target\amiga-backend-1.0.0.jar. 
Para lanzar la aplicación ejecutar desde esa carpeta:

```
java -jar amiga-backend-1.0.0.jar --spring.profiles.active=pro
```

### Para frontend

Actualizar el archivo .env.production con la url del backend anteriormente desplegado. Posteriormente,
dentro de la carpeta del front ejecutar:

```
npm install
npm run build
```
Esto creará la carpeta build, la cual contiene todos los archivos necesarios para ejecutar la aplicación optimizada en un servidor web. 

# Para Desarrollo

## Creación base de datos

Se necesita crear dos contenedores con MySQL 8. Se recomienda una de las dos siguientes opciones:

- Docker Desckop. [Enlace de descarga](https://www.docker.com/products/docker-desktop/)

- Podman Desktop. [Enlace de descarga](https://podman-desktop.io/docs/Installation)

Ejecutar desde carpeta sql del backend:
### Con Docker

```bash
docker run -p 3306:3306 --name amiga -e MYSQL_ROOT_PASSWORD=amiga -d mysql:8
```
Para los tests.

```bash
docker run -p 3307:3306 --name amiga-test -e MYSQL_ROOT_PASSWORD=amiga -d mysql:8
```

Para crear tablas y inicializar los datos de la bbdd
```bash
cmd /c "docker exec -i amiga mysql --password=amiga < Database.sql"
cmd /c "docker exec -i amiga-test mysql --password=amiga < CreateDatabaseTest.sql"
```

En caso de querer insertar 500 participantes ejecutar:
```bash
cmd /c "docker exec -i amiga mysql --password=amiga < MockData.sql"
```
### Con Podman

```bash
podman run -p 3306:3306 --name amiga -e MYSQL_ROOT_PASSWORD=amiga -d mysql:8
```
Para los tests.

```bash
podman run -p 3307:3306 --name amiga-test -e MYSQL_ROOT_PASSWORD=amiga -d mysql:8
```

Para crear tablas y inicializar los datos de la bbdd 
```bash
cmd /c "podman exec -i amiga mysql --password=amiga < Database.sql"
cmd /c "podman exec -i amiga-test mysql --password=amiga < CreateDatabaseTest.sql"
```
En caso de querer insertar 500 participantes ejecutar:
```bash
cmd /c "podman exec -i amiga mysql --password=amiga < MockData.sql"

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
## Swagger UI
Una vez que el backend está en funcionamiento, puedes acceder a través de http://localhost:8080/swagger-ui/index.htm 
para explorar y probar la API REST proporcionada por la aplicación. Esto te permitirá realizar consultas 
y pruebas en la interfaz de Swagger UI.