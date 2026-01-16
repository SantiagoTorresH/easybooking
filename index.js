const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors'); 
require('dotenv').config(); // lee el archivo .env 

const app = express();
const PORT = process.env.PORT || 3000;

const Turno = require('./models/Turno');


//Middleware 
app.use(cors()); // permitir que cualquier aplicaion use este servidor, esta api 
app.use(express.json());

// conexion a la base de datos
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas 🌐 exitosamente'))
    .catch(err => console.error('Error al conectar:', err ));

app.get('/', (req, res) => {
  res.send('¡Hola! Mi servidor está vivo y funcionando en la nube 🚀');
});

// RUTA PARA CREAR UN TURNO
app.post('/api/turnos', async (req, res) => {
    try {
        const nuevoTurno = new Turno(req.body); // Recibimos los datos del frontend
        await nuevoTurno.save(); // Guardamos en MongoDB
        res.status(201).json({ mensaje: 'Turno guardado con éxito', turno: nuevoTurno });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar el turno', error });
    }
});

// RUTA PARA VER TODOS LOS TURNOS (Opcional, para el administrador)
app.get('/api/turnos', async (req, res) => {
    const turnos = await Turno.find();
    res.json(turnos);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});