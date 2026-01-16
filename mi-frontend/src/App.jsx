import { useState } from 'react'

function App() {
  const [form, setForm] = useState({ nombre: '', fecha: '', hora: '', servicio: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // CAMBIA ESTA URL POR LA TUYA DE RENDER
    const response = await fetch('https://easybooking-6vqp.onrender.com/api/turnos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    alert(data.mensaje);
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
    </div>
  )
}

export default App

// 'https://easybooking-6vqp.onrender.com/' 