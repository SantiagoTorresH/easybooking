const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // permitir que cualquier aplicaion use este servidor, esta api 

app.get('/', (req, res) => {
  res.send('¡Hola! Mi servidor está vivo y funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});