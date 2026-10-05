const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tasks_db',
  port: process.env.DB_PORT || 5432,
});

// Inicialización de la tabla con los 12 campos
const initDb = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      nombre_proyecto VARCHAR(100),
      tipo_actividad VARCHAR(50) DEFAULT 'Tarea',
      estado VARCHAR(50) DEFAULT 'Pendiente',
      resumen VARCHAR(255) NOT NULL,
      descripcion TEXT,
      prioridad VARCHAR(50) DEFAULT 'Media',
      informador VARCHAR(100),
      persona_asignada VARCHAR(100),
      precondicion TEXT,
      fecha_creacion DATE DEFAULT CURRENT_DATE,
      fecha_cierre DATE,
      sprint VARCHAR(50)
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('Tabla "tasks" verificada/creada correctamente.');
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err);
  }
};

initDb();

app.get('/', (req, res) => {
  res.send('Servidor Backend corriendo correctamente');
});

// GET: Obtener tareas
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Crear tarea incluyendo estado, precondicion, fecha_creacion y fecha_cierre
app.post('/api/tasks', async (req, res) => {
  const {
    nombre_proyecto,
    tipo_actividad,
    estado,
    resumen,
    descripcion,
    prioridad,
    informador,
    persona_asignada,
    precondicion,
    fecha_creacion,
    fecha_cierre,
    sprint,
  } = req.body;

  try {
    const query = `
      INSERT INTO tasks (
        nombre_proyecto, tipo_actividad, estado, resumen, descripcion,
        prioridad, informador, persona_asignada, precondicion,
        fecha_creacion, fecha_cierre, sprint
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;
    const values = [
      nombre_proyecto || null,
      tipo_actividad || 'Tarea',
      estado || 'Pendiente',
      resumen,
      descripcion || null,
      prioridad || 'Media',
      informador || null,
      persona_asignada || null,
      precondicion || null,
      fecha_creacion || new Date().toISOString().split('T')[0],
      fecha_cierre || null,
      sprint || null,
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al guardar la tarea:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// PATCH: Finalizar tarea
app.patch('/api/tasks/:id/finalize', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE tasks SET estado = 'Finalizada', fecha_cierre = CURRENT_DATE WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Eliminar tarea
app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: 'Tarea eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en el puerto ${PORT}`);
});