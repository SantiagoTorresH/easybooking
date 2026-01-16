const mongoose = require('mongoose');

const TurnoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    servicio: { type: String, required: true },
    creadoEn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Turno', TurnoSchema);