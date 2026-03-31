// Importamos las dependencias
require('dotenv').config(); //carga las variables del archivo .env
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");
const membersRoutes = require('./routes/membersRoutes.js');
const authRoutes = require('./routes/authRoutes.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Para que el front se pueda comunicar con el servidor
app.use(express.json()); // Para lectura de datos en formato JSON

// Para servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../public')));

// Rutas API
app.use('/api/members', membersRoutes); //Para el CRUD de socios del club
app.use('/users', authRoutes); //Para el registro y login de usuarios del sistema


// Ruta para manejar cualquier solicitud
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

