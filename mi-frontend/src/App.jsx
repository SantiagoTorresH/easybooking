import { useState, useEffect } from "react";
import "./App.css";

// Cambiar por la URL real de tu backend en Render
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const URL_API = `${BASE_URL}/api/turnos`;

function App() {
  const [form, setForm] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    servicio: "",
  });
  const [listaTurnos, setListaTurnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar turnos al iniciar la página
  useEffect(() => {
    obtenerTurnos();
  }, []);

  const obtenerTurnos = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(URL_API);
      if (!response.ok) throw new Error("Error al obtener turnos");
      const data = await response.json();
      setListaTurnos(data || []);
    } catch (err) {
      setError("Error cargando turnos: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.fecha || !form.hora || !form.servicio) {
      setError("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Error al agendar turno");

      alert("✅ Turno agendado exitosamente");
      setForm({ nombre: "", fecha: "", hora: "", servicio: "" });
      setError("");
      obtenerTurnos();
    } catch (err) {
      setError("Error: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 1. Crea la función dentro de la función App
  const eliminarTurno = async (id) => {
    if (window.confirm("¿Estás seguro de cancelar este turno?")) {
      try {
        const response = await fetch(`${URL_API}/${id}`, { method: "DELETE" });
        if (response.ok) {
          obtenerTurnos(); // Recargamos la lista
        }
      } catch (err) {
        console.error("Error al eliminar:", err);
      }
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>📅 easyBooking</h1>
        <p>Sistema de Reserva de Turnos</p>
      </header>

      <main className="main-content">
        {/* FORMULARIO */}
        <section className="form-section">
          <h2>Reservar Turno</h2>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre completo"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Fecha</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Hora</label>
              <input
                type="time"
                name="hora"
                value={form.hora}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Servicio</label>
              <select
                name="servicio"
                value={form.servicio}
                onChange={handleChange}
                required
              >
                <option value="">-- Selecciona un servicio --</option>
                <option value="Barbería">✂️ Barbería</option>
                <option value="Psicología">🧠 Psicología</option>
              </select>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Cargando..." : "Agendar Turno"}
            </button>
          </form>
        </section>

        {/* LISTADO DE TURNOS */}
        <section className="turnos-section">
          <h2>📋 Turnos Agendados</h2>

          {loading && <p className="loading">Cargando...</p>}

          {!loading && listaTurnos.length === 0 && (
            <p className="no-turnos">No hay turnos agendados aún</p>
          )}

          {!loading && listaTurnos.length > 0 && (
            <div className="turnos-grid">
              {listaTurnos.map((turno) => (
                <div key={turno._id} className="turno-card">
                  <div className="turno-header">
                    <h3>{turno.nombre}</h3>
                    <span className="badge">{turno.servicio}</span>
                  </div>
                  <div className="turno-details">
                    <p>
                      📅 <strong>{turno.fecha}</strong>
                    </p>
                    <p>
                      ⏰ <strong>{turno.hora}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() => eliminarTurno(turno._id)}
                    style={{
                      marginTop: "10px",
                      color: "red",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Cancelar Turno
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2026 easyBooking - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default App;

