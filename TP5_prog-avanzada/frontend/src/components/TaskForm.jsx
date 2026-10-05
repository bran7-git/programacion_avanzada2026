import React, { useState, useEffect } from 'react';

const initialState = {
  nombre_proyecto: '',
  tipo_actividad: 'Feature',
  estado: 'Pendiente',
  resumen: '',
  descripcion: '',
  prioridad: 'Media',
  informador: '',
  persona_asignada: '',
  precondicion: '',
  fecha_creacion: new Date().toISOString().split('T')[0],
  fecha_cierre: '',
  sprint: '',
};

export default function TaskForm({ onSubmit, taskToEdit, cancelEdit }) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        ...taskToEdit,
        fecha_creacion: taskToEdit.fecha_creacion ? taskToEdit.fecha_creacion.split('T')[0] : '',
        fecha_cierre: taskToEdit.fecha_cierre ? taskToEdit.fecha_cierre.split('T')[0] : '',
      });
    } else {
      setFormData(initialState);
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <div style={styles.card}>
      <h2>{taskToEdit ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.grid}>
          <div>
            <label>Nombre del Proyecto *</label>
            <input
              type="text"
              name="nombre_proyecto"
              value={formData.nombre_proyecto}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Tipo de Actividad *</label>
            <select name="tipo_actividad" value={formData.tipo_actividad} onChange={handleChange}>
              <option value="Feature">Feature</option>
              <option value="Bug">Bug</option>
              <option value="Mejora">Mejora</option>
              <option value="Documentación">Documentación</option>
            </select>
          </div>

          <div>
            <label>Estado *</label>
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Finalizada">Finalizada</option>
            </select>
          </div>

          <div>
            <label>Prioridad *</label>
            <select name="prioridad" value={formData.prioridad} onChange={handleChange}>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>

          <div>
            <label>Informador *</label>
            <input
              type="text"
              name="informador"
              value={formData.informador}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Persona Asignada *</label>
            <input
              type="text"
              name="persona_asignada"
              value={formData.persona_asignada}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Sprint *</label>
            <input
              type="text"
              name="sprint"
              value={formData.sprint}
              onChange={handleChange}
              placeholder="Ej: Sprint 1"
              required
            />
          </div>

          <div>
            <label>Fecha de Creación *</label>
            <input
              type="date"
              name="fecha_creacion"
              value={formData.fecha_creacion}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Fecha de Cierre</label>
            <input
              type="date"
              name="fecha_cierre"
              value={formData.fecha_cierre || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label>Resumen *</label>
          <input
            type="text"
            name="resumen"
            value={formData.resumen}
            onChange={handleChange}
            placeholder="Breve resumen de la tarea"
            required
          />
        </div>

        <div>
          <label>Precondición</label>
          <input
            type="text"
            name="precondicion"
            value={formData.precondicion}
            onChange={handleChange}
            placeholder="Condiciones previas necesarias"
          />
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            name="descripcion"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Detalles completos de la tarea..."
          ></textarea>
        </div>

        <div style={styles.actions}>
          <button type="submit" style={styles.btnPrimary}>
            {taskToEdit ? 'Guardar Cambios' : 'Crear Tarea'}
          </button>
          {taskToEdit && (
            <button type="button" onClick={cancelEdit} style={styles.btnSecondary}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  btnPrimary: {
    background: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  btnSecondary: {
    background: '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};