import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('Todas');
  const [editingId, setEditingId] = useState(null); // Estado para saber si estamos editando
  const [formData, setFormData] = useState({
    nombre_proyecto: '',
    tipo_actividad: 'Tarea',
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
  });

  const API_URL = 'http://localhost:5000/api/tasks';

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      nombre_proyecto: '',
      tipo_actividad: 'Tarea',
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
    });
  };

  // Crear o Editar Tarea
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resumen.trim()) {
      alert('El resumen es obligatorio');
      return;
    }

    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        resetForm();
        fetchTasks();
      }
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
    }
  };

  // Cargar datos en el formulario para editar
  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setFormData({
      nombre_proyecto: task.nombre_proyecto || '',
      tipo_actividad: task.tipo_actividad || 'Tarea',
      estado: task.estado || 'Pendiente',
      resumen: task.resumen || '',
      descripcion: task.descripcion || '',
      prioridad: task.prioridad || 'Media',
      informador: task.informador || '',
      persona_asignada: task.persona_asignada || '',
      precondicion: task.precondicion || '',
      fecha_creacion: task.fecha_creacion ? task.fecha_creacion.split('T')[0] : new Date().toISOString().split('T')[0],
      fecha_cierre: task.fecha_cierre ? task.fecha_cierre.split('T')[0] : '',
      sprint: task.sprint || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube suavemente al formulario
  };

  const handleFinalize = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/finalize`, {
        method: 'PATCH',
      });
      if (res.ok) fetchTasks();
    } catch (error) {
      console.error('Error al finalizar tarea:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta tarea?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) fetchTasks();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Pendientes') return task.estado === 'Pendiente';
    if (filter === 'Finalizadas') return task.estado === 'Finalizada';
    return true;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('es-AR');
  };

  return (
    <div style={{ maxWidth: '850px', margin: '2rem auto', fontFamily: 'Arial, sans-serif', padding: '0 1rem', color: '#333', textAlign: 'left' }}>
      <h1 style={{ textAlign: 'center', color: '#ffffff' }}>Gestor de Tareas (TP5)</h1>

      {/* Formulario de creación / edición */}
      <form onSubmit={handleSubmit} style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e9ecef', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, color: '#111' }}>
            {editingId ? 'Editar Tarea' : 'Crear Nueva Tarea'}
          </h3>
          {editingId && (
            <button type="button" onClick={resetForm} style={{ padding: '0.3rem 0.8rem', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancelar Edición
            </button>
          )}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Proyecto:</label>
            <input
              type="text"
              name="nombre_proyecto"
              value={formData.nombre_proyecto}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Tipo de Actividad:</label>
            <select
              name="tipo_actividad"
              value={formData.tipo_actividad}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
            >
              <option value="Tarea">Tarea</option>
              <option value="Bug">Bug</option>
              <option value="Mejora">Mejora</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Estado:</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
            >
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Finalizada">Finalizada</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Prioridad:</label>
            <select
              name="prioridad"
              value={formData.prioridad}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Sprint:</label>
            <input
              type="text"
              name="sprint"
              value={formData.sprint}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Informador:</label>
            <input
              type="text"
              name="informador"
              value={formData.informador}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Persona Asignada:</label>
            <input
              type="text"
              name="persona_asignada"
              value={formData.persona_asignada}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Fecha de Creación:</label>
            <input
              type="date"
              name="fecha_creacion"
              value={formData.fecha_creacion}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Fecha de Cierre:</label>
            <input
              type="date"
              name="fecha_cierre"
              value={formData.fecha_cierre}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Precondición:</label>
          <input
            type="text"
            name="precondicion"
            value={formData.precondicion}
            onChange={handleChange}
            placeholder="Ej: Servidor de prueba configurado"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Resumen / Título (*):</label>
          <input
            type="text"
            name="resumen"
            value={formData.resumen}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.2rem', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem', padding: '0.7rem 1.5rem', background: editingId ? '#ffc107' : '#007bff', color: editingId ? '#000' : 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {editingId ? 'Actualizar Tarea' : 'Guardar Tarea'}
        </button>
      </form>

      {/* Control de Filtros */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0, color: '#fff' }}>Listado de Tareas</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['Todas', 'Pendientes', 'Finalizadas'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '4px',
                border: '1px solid #007bff',
                background: filter === status ? '#007bff' : 'transparent',
                color: filter === status ? '#fff' : '#007bff',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de tareas */}
      {filteredTasks.length === 0 ? (
        <p style={{ color: '#ccc' }}>No hay tareas registradas para mostrar.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredTasks.map((task) => (
            <div key={task.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1.2rem', background: '#ffffff', textAlign: 'left', color: '#222' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, color: '#111', fontSize: '1.2rem', fontWeight: 'bold' }}>{task.resumen}</h3>
                <span style={{ padding: '0.3rem 0.8rem', borderRadius: '4px', background: task.estado === 'Finalizada' ? '#28a745' : '#ffc107', color: task.estado === 'Finalizada' ? '#fff' : '#000', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  {task.estado}
                </span>
              </div>

              {task.descripcion && (
                <p style={{ margin: '0.8rem 0', color: '#444', fontSize: '0.95rem', textAlign: 'left', whiteSpace: 'pre-wrap' }}>
                  {task.descripcion}
                </p>
              )}

              {task.precondicion && (
                <p style={{ margin: '0.4rem 0', color: '#555', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  <strong>Precondición:</strong> {task.precondicion}
                </p>
              )}
              
              <div style={{ fontSize: '0.85rem', color: '#333', display: 'flex', gap: '1.2rem', flexWrap: 'wrap', margin: '0.8rem 0' }}>
                <span><strong>Proyecto:</strong> {task.nombre_proyecto || 'N/A'}</span>
                <span><strong>Tipo:</strong> {task.tipo_actividad}</span>
                <span><strong>Prioridad:</strong> {task.prioridad}</span>
                <span><strong>Sprint:</strong> {task.sprint || 'N/A'}</span>
                <span><strong>Informador:</strong> {task.informador || 'N/A'}</span>
                <span><strong>Asignado:</strong> {task.persona_asignada || 'N/A'}</span>
                <span><strong>Fecha Creación:</strong> {formatDate(task.fecha_creacion)}</span>
                <span><strong>Fecha Cierre:</strong> {formatDate(task.fecha_cierre)}</span>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleStartEdit(task)} style={{ padding: '0.4rem 0.8rem', background: '#17a2b8', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Editar
                </button>
                {task.estado !== 'Finalizada' && (
                  <button onClick={() => handleFinalize(task.id)} style={{ padding: '0.4rem 0.8rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Marcar Finalizada
                  </button>
                )}
                <button onClick={() => handleDelete(task.id)} style={{ padding: '0.4rem 0.8rem', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;