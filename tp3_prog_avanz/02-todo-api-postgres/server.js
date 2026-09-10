/**
 * 02 - TODO API con Postgres
 * Nivel: Intermedio
 *
 * Objetivo:
 * - Reemplazar el array en memoria de la practica 01 por persistencia real en Postgres
 * - Levantar Node + Postgres juntos con Docker Compose (dos contenedores, una red)
 * - Usar el driver "pg" con queries parametrizadas (evitar SQL injection)
 * - Comprobar que los datos sobreviven a un restart del contenedor de la API
 *   (mientras no se borre el volumen de Postgres)
 *
 * Requisitos previos: Docker y Docker Compose instalados.
 * Como correr esta practica: ver README.md
 */

import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tododb',
});

// RF-01 & RF-06: GET /tasks (Con filtrado por estado y paginación)
app.get('/tasks', async (req, res) => {
  try {
    const { status, limit, offset } = req.query;
    let query = 'SELECT * FROM tasks';
    const params = [];

    if (status) {
      params.push(status);
      query += ` WHERE status = $${params.length}`;
    }

    query += ' ORDER BY id ASC';

    if (limit) {
      params.push(parseInt(limit, 10));
      query += ` LIMIT $${params.length}`;
    }
    if (offset) {
      params.push(parseInt(offset, 10));
      query += ` OFFSET $${params.length}`;
    }

    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RF-02: GET /tasks/:id
app.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RF-03: POST /tasks
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    if (!title) return res.status(400).json({ error: 'El título es obligatorio' });

    if (status && !['pending', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'El estado debe ser pending o completed' });
    }

    const query = `
      INSERT INTO tasks (title, description, status, due_date)
      VALUES ($1, $2, COALESCE($3, 'pending'), $4)
      RETURNING *;
    `;
    const values = [title, description || '', status || 'pending', dueDate || null];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10.2 Ejercicio 1 — PUT /tasks/:id (RF-04)
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    if (status && !['pending', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'El estado debe ser pending o completed' });
    }

    const query = `
      UPDATE tasks
      SET title = COALESCE($1, title),
          description = COALESCE($2, description),
          status = COALESCE($3, status),
          due_date = COALESCE($4, due_date),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *;
    `;
    const values = [title ?? null, description ?? null, status ?? null, dueDate ?? null, id];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10.3 Ejercicio 2 — DELETE /tasks/:id (RF-05)
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`);
});