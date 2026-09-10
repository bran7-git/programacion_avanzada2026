Informe de Prueba de Persistencia de Datos (Sección 10.4)

Durante la realización de la prueba práctica, al crear una tarea nueva mediante POST /tasks y posteriormente reiniciar únicamente el contenedor de la API con el comando `docker compose restart api`, los datos almacenados permanecieron intactos. Esto ocurre porque la base de datos PostgreSQL se ejecuta en un contenedor separado (todo_db) y persiste su información en un volumen administrado por Docker (todo_pgdata) ubicado en el sistema host.

En cambio, al ejecutar `docker compose down -v`, Docker elimina los contenedores junto con el volumen de datos. Al volver a iniciar el entorno mediante `docker compose up --build`, PostgreSQL detecta un volumen completamente limpio y vuelve a ejecutar el script de inicialización db/init.sql, reestableciendo la base de datos a su estado semilla predeterminado.



##1. Petición POST - Crear Tarea
PS C:\Users\Brandon\OneDrive\facultad\tp3_prog_avanz\02-todo-api-postgres> curl.exe -X POST http://localhost:3001/tasks -H "Content-Type: application/json" -d '{"title":"Probar TP3"}'
{"id":3,"title":"Probar TP3","description":"","status":"pending","due_date":null,"created_at":"2026-09-10T14:53:49.691Z","updated_at":"2026-09-10T14:53:49.691Z"}


##2. Petición PUT - Actualizar Estado de Tarea

PS C:\Users\Brandon\OneDrive\facultad\tp3_prog_avanz\02-todo-api-postgres> curl.exe -X PUT http://localhost:3001/tasks/1 -H "Content-Type: application/json" -d '{"status":"completed"}'
{"id":1,"title":"Aprender Docker Compose","description":"Crear un archivo docker-compose.yml con API y Postgres","status":"completed","due_date":null,"created_at":"2026-09-10T14:48:42.067Z","updated_at":"2026-09-10T14:53:56.436Z"}

##3. Prueba de Persistencia - Reinicio del Contenedor API
PS C:\Users\Brandon\OneDrive\facultad\tp3_prog_avanz\02-todo-api-postgres> docker compose restart api
time="2026-09-10T11:54:06-03:00" level=warning msg="C:\\Users\\Brandon\\OneDrive\\facultad\\tp3_prog_avanz\\02-todo-api-postgres\\docker-compose.yml: the attribute version is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] restart 0/1
 - Container todo_api Restarting                                                                    4.2s

PS C:\Users\Brandon\OneDrive\facultad\tp3_prog_avanz\02-todo-api-postgres> curl.exe http://localhost:3001/tasks
[{"id":1,"title":"Aprender Docker Compose","description":"Crear un archivo docker-compose.yml con API y Postgres","status":"completed","due_date":null,"created_at":"2026-09-10T14:48:42.067Z","updated_at":"2026-09-10T14:53:56.436Z"},{"id":3,"title":"Probar TP3","description":"","status":"pending","due_date":null,"created_at":"2026-09-10T14:53:49.691Z","updated_at":"2026-09-10T14:53:49.691Z"}]

##4. Petición DELETE - Eliminar Tarea
PS C:\Users\Brandon\OneDrive\facultad\tp3_prog_avanz\02-todo-api-postgres> curl.exe -X DELETE http://localhost:3001/tasks/3

PS C:\Users\Brandon\OneDrive\facultad\tp3_prog_avanz\02-todo-api-postgres> docker compose restart api
time="2026-09-10T11:55:16-03:00" level=warning msg="C:\\Users\\Brandon\\OneDrive\\facultad\\tp3_prog_avanz\\02-todo-api-postgres\\docker-compose.yml: the attribute version is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] restart 0/1
 - Container todo_api Restarting                                                                    3.8s

PS C:\Users\Brandon\OneDrive\facultad\tp3_prog_avanz\02-todo-api-postgres> curl.exe http://localhost:3001/tasks
[{"id":1,"title":"Aprender Docker Compose","description":"Crear un archivo docker-compose.yml con API y Postgres","status":"completed","due_date":null,"created_at":"2026-09-10T14:48:42.067Z","updated_at":"2026-09-10T14:53:56.436Z"}]


##5. Destrucción del Entorno y Volúmenes
PS C:\Users\Brandon\OneDrive\facultad\tp3_prog_avanz\02-todo-api-postgres> docker compose down -v
time="2026-09-10T11:55:39-03:00" level=warning msg="C:\\Users\\Brandon\\OneDrive\\facultad\\tp3_prog_avanz\\02-todo-api-postgres\\docker-compose.yml: the attribute version is obsolete, it will be ignored, please remove it to avoid potential confusion"
[+] down 4/4
 ✔ Container todo_api                     Removed                                                               3.5s
 ✔ Container todo_db                      Removed                                                               0.8s
 ✔ Volume 02-todo-api-postgres_todo_pgdata Removed                                                               0.3s
 ✔ Network 02-todo-api-postgres_default    Removed                                                               0.4s



##6. Reconstrucción e Inicialización del Entorno
PS C:\Users\Brandon\OneDrive\facultad\tp3_prog_avanz\02-todo-api-postgres> docker compose up --build
time="2026-09-10T11:56:01-03:00" level=warning msg="C:\\Users\\Brandon\\OneDrive\\facultad\\tp3_prog_avanz\\02-todo-api-postgres\\docker-compose.yml: the attribute version is obsolete, it will be ignored, please remove it to avoid potential confusion"
#1 [internal] load local bake definitions
#1 reading from stdin 619B done
#1 DONE 0.0s

#2 [internal] load build definition from Dockerfile
#2 transferring dockerfile: 435B 0.0s done
#2 DONE 0.1s

#3 [internal] load metadata for docker.io/library/node:20-alpine
#3 DONE 1.5s

#5 [internal] load .dockerignore
#5 transferring context: 81B 0.0s done
#5 DONE 0.0s

#6 [internal] load build context
#6 transferring context: 302B 0.0s done
#6 DONE 0.0s

#7 [1/5] FROM docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
#7 DONE 0.1s

#8 [4/5] RUN npm install --omit=dev
#8 CACHED

#9 [2/5] WORKDIR /app
#9 CACHED

#10 [3/5] COPY package*.json ./
#10 CACHED

#11 [5/5] COPY . .
#11 CACHED

#12 exporting to image
#12 DONE 0.3s

[+] up 5/5
 ✔ Image 02-todo-api-postgres-api          Built                                                                  3.8s
 ✔ Network 02-todo-api-postgres_default    Created                                                                0.2s
 ✔ Volume 02-todo-api-postgres_todo_pgdata Created                                                                0.0s
 ✔ Container todo_db                      Created                                                                0.3s
 ✔ Container todo_api                     Created                                                                0.3s
Attaching to todo_api, todo_db
todo_db  | /usr/local/bin/docker-entrypoint.sh: running /docker-entrypoint-initdb.d/init.sql
todo_db  | CREATE TABLE
todo_db  | INSERT 0 2
todo_db  | 
todo_db  | 2026-09-10 14:56:11.359 UTC [1] LOG:  database system is ready to accept connections
Container todo_db Healthy 
todo_api  | Servidor API corriendo en el puerto 3001