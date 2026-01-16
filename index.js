const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors'); 
require('dotenv').config(); // lee el archivo .env 

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});