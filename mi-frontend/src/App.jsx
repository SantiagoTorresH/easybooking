import { useEffect, useState } from 'react'

function App() {
  const [mensaje, setMensaje] = useState('Cargando...')

  useEffect(() => {
    // REEMPLAZA ESTA URL con la que te dio Render
    fetch('https://easybooking-6vqp.onrender.com/')
      .then(res => res.text())
      .then(data => setMensaje(data))
      .catch(err => setMensaje('Error al conectar con el servidor'))
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Mi App Fullstack</h1>
      <p>Respuesta del servidor: <strong>{mensaje}</strong></p>
    </div>
  )
}

export default App