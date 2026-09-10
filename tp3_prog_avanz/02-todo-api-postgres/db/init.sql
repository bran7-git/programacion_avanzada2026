-- Se ejecuta automaticamente UNA SOLA VEZ, cuando Postgres crea el volumen por primera vez
-- (carpeta especial docker-entrypoint-initdb.d). Si ya existe el volumen, este script
-- no se vuelve a correr aunque reinicies los contenedores.

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT DEFAULT '',
  status VARCHAR(50) DEFAULT 'pending',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status) VALUES
  ('Aprender Docker Compose', 'Crear un archivo docker-compose.yml con API y Postgres', 'completed'),
  ('Migrar TODO API a Postgres', 'Reemplazar el arreglo en memoria por consultas SQL', 'pending');