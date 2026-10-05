const { Pool } = require('pg');

// Usamos el nombre del servicio 'db' (o el asignado en docker-compose.yml) como HOST
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.POSTGRES_DB || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  port: 5432,
});

module.exports = pool;