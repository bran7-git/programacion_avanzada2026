import React from 'react';

export default function TaskList({ tasks, onEdit, onDelete, onFinalize }) {
  if (tasks.length === 0) {
    return <p style={{ textAlign: 'center', margin: '20px 0' }}>No hay tareas registradas aún.</p>;
  }

  return (
    <div style={styles.card}>
      <h2>Listado de Tareas</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Proyecto</th>
              <th>Sprint</th>
              <th>Tipo</th>
              <th>Resumen</th>
              <th>Estado</th>
              <th>Prioridad</th>
              <th>Asignado</th>
              <th>F. Creación</th>
              <th>F. Cierre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.nombre_proyecto}</td>
                <td>{task.sprint}</td>
                <td>{task.tipo_actividad}</td>
                <td>{task.resumen}</td>
                <td>
                  <span style={getBadgeStyle(task.estado)}>{task.estado}</span>
                </td>
                <td>{task.prioridad}</td>
                <td>{task.persona_asignada}</td>
                <td>{task.fecha_creacion ? task.fecha_creacion.split('T')[0] : '-'}</td>
                <td>{task.fecha_cierre ? task.fecha_cierre.split('T')[0] : '-'}</td>
                <td>
                  <div style={styles.actionBtns}>
                    {task.estado !== 'Finalizada' && (
                      <button
                        onClick={() => onFinalize(task.id)}
                        style={styles.btnSuccess}
                        title="Finalizar tarea"
                      >
                        Finalizar
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(task)}
                      style={styles.btnWarning}
                      title="Editar tarea"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      style={styles.btnDanger}
                      title="Eliminar tarea"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const getBadgeStyle = (estado) => {
  let bg = '#6c757d';
  if (estado === 'En Proceso') bg = '#17a2b8';
  if (estado === 'Finalizada') bg = '#28a745';
  if (estado === 'Pendiente') bg = '#ffc107';

  return {
    backgroundColor: bg,
    color: estado === 'Pendiente' ? '#000' : '#fff',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  };
};

const styles = {
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  actionBtns: {
    display: 'flex',
    gap: '6px',
  },
  btnSuccess: {
    background: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  btnWarning: {
    background: '#ffc107',
    color: '#000',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  btnDanger: {
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};