// Importamos las dependencias
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const membersRoutes = require('./routes/members.js');

const app = express();
const PORT = process.env.PORT;

app.use(cors()); // Para que el front se pueda comunicar con el servidor
app.use(express.json()); // Para lectura de datos en formato JSON

// Para servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../public')));

// Rutas API
app.use('/', membersRoutes);

// Ruta para manejar cualquier solicitud
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

