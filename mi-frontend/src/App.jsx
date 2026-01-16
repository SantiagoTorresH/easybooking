

import { useState, useEffect } from 'react'

function App() {
  const [form, setForm] = useState({ nombre: '', fecha: '', hora: '', servicio: '' });
  const [listaTurnos, setListaTurnos] = useState([]); // Estado para la lista

  const URL_API = 'https://tu-url-de-render.onrender.com/api/turnos';

  // 1. Función para obtener los turnos
  const obtenerTurnos = async () => {
    try {
      const response = await fetch(URL_API);
      const data = await response.json();
      setListaTurnos(data);
    } catch (error) {
      console.error("Error cargando turnos:", error);
    }
  };

  // 2. Cargar turnos al iniciar la página
  useEffect(() => {
    obtenerTurnos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(URL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    
    if(response.ok) {
      alert("Turno agendado");
      obtenerTurnos(); // 3. Recargar la lista automáticamente tras guardar
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Reservar Turno - easyBooking</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input type="text" placeholder="Tu Nombre" onChange={e => setForm({...form, nombre: e.target.value})} />
        <input type="date" onChange={e => setForm({...form, fecha: e.target.value})} />
        <input type="time" onChange={e => setForm({...form, hora: e.target.value})} />
        <select onChange={e => setForm({...form, servicio: e.target.value})}>
          <option value="">Selecciona un servicio</option>
          <option value="Barbería">Barbería</option>
          <option value="Psicología">Psicología</option>
        </select>
        <button type="submit" style={{ background: 'blue', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>
          Agendar Turno
        </button>
      </form>

      <hr /> 
{/* LISTADO DE TURNOS */}
      <h2>Turnos Agendados</h2>
      <div style={{ display: 'grid', gap: '10px' }}>
        {listaTurnos.length === 0 ? <p>No hay turnos aún.</p> : 
          listaTurnos.map((t) => (
            <div key={t._id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              <strong>{t.nombre}</strong> - {t.servicio} <br />
              <small>📅 {t.fecha} a las ⏰ {t.hora}</small>
            </div>
          ))
        }
      </div>



    </div>
  )
}

export default App

// 'https://easybooking-6vqp.onrender.com/' 